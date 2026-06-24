import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeClasses from "rehype-class-names";
import rehypeSanitize from "rehype-sanitize";
import rehypeFormat from "rehype-format";
import rehypeReact from "rehype-react";
import rehypeUrls from "rehype-urls";
import type { Root } from "mdast";
import matter from "gray-matter";
import production from "react/jsx-runtime";
import { findAfter } from "unist-util-find-after";
import { visitParents } from "unist-util-visit-parents";
import replaceAllBetween from "unist-util-replace-all-between";

type BlogData = {
  file: string;
  title: string;
  date: string;
  blurb: string;
  image: string;
  description: string;
};

interface JsonData {
  contents: BlogData[];
}

export type BlogPostData = {
  id: string;
  title: string;
  date: Date;
  preview: string;
  image: string;
  imageDescription: string;
};

const urlRoot =
  "https://raw.githubusercontent.com/zwill22/blogs/refs/heads/main";

export async function fetchBlogPosts(): Promise<BlogPostData[]> {
  try {
    const fetchedData = await fetch(`${urlRoot}/meta.json`);
    const jsonData = fetchedData.json();

    const contents = await jsonData.then((data: JsonData) => data.contents);

    return contents
      .map((blog: BlogData) => {
        const imageSrc = `${urlRoot}/${blog.image}`;
        const id = `${blog.file.split(".")[0]}_${blog.title.replaceAll(" ", "_").replaceAll("+", "p").toLowerCase().slice(0, 40)}`;

        return {
          id: id,
          title: blog.title,
          date: new Date(blog.date),
          preview: blog.blurb,
          image: imageSrc,
          imageDescription: blog.description,
        };
      })
      .sort((blog1, blog2) => blog2.date.getTime() - blog1.date.getTime());
  } catch (error) {
    throw new Error("Failed to fetch Blog Posts");
  }
}

export type Post = {
  rootUrl: string;
  content: string;
};

export async function getPost(name: string): Promise<Post> {
  try {
    const filename = `${name.split("_")[0]}.md`;
    const fileRoot = `${urlRoot}/blogs`;
    const fileUrl = `${fileRoot}/${filename}`;

    const fetchedData = await fetch(fileUrl);

    const stream = fetchedData.body;

    const text = await new Response(stream).text();

    return {
      rootUrl: fileRoot,
      content: text,
    };
  } catch (error) {
    throw new Error(`Failed to fetch Blog Post: ${name}`);
  }
}

function remarkImages() {
  return (tree: Root) => {
    visitParents(tree, "image", function (node, parents) {
      const parent = parents[parents.length - 1];

      const altNode = findAfter(parent, node, "emphasis");

      if (!altNode) {
        return;
      }

      node.title = node.alt;

      let alt = "";
      altNode.children.values().forEach((child: any) => {
        alt += child.value;
      });

      node.alt = alt;

      // Replace all nodes between `node` and `altNode` (inclusive) with `node`
      replaceAllBetween(parent, node, altNode, () => [node]);
    });
  };
}

export async function getPostHTML(name: string): Promise<any> {
  const post = await getPost(name);

  function fixUrls(url: any) {
    return `${post.rootUrl}/${url.path}`;
  }

  try {
    const matterResult = matter(post.content);

    const processor = await unified()
      .use(remarkParse, { fragment: true })
      .use(remarkImages)
      .use(remarkRehype)
      .use(rehypeUrls, fixUrls)
      .use(rehypeFormat)
      .use(rehypeSanitize)
      // .use(rehypePicture)
      .use(rehypeClasses, {
        h1: "text-5xl md:text-6xl font-heading py-4 md:py-8",
        h2: "text-2xl md:text-3xl font-heading py-3 md:py-6",
        p: "text-justify md:text-lg py-2",
        pre: "p-2 md:p-4 bg-foreground/10",
        code: "text-left font-mono text-wrap",
        "p code": "px-1 mx-1 bg-foreground/10 not-italic",
        "li code": "px-1 mx-1 bg-foreground/10 not-italic",
        ul: "text-left p-4",
      })
      .use(rehypeReact, production);

    const file = await processor.process(matterResult.content);

    return file.result;
  } catch (error) {
    throw new Error(`Failed to process Blog Post: ${name}`);
  }
}

import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypePicture from "rehype-picture";
import rehypeHighlight from "rehype-highlight";
import rehypeProbeImageSize from "rehype-probe-image-size";
import rehypeUnwrapImages from "rehype-unwrap-images";
import rehypeSanitize from "rehype-sanitize";
import rehypeFormat from "rehype-format";
import rehypeReact from "rehype-react";
import rehypeUrls from "rehype-urls";
import type { Root as MdRoot } from "mdast";
import matter from "gray-matter";
import prod from "react/jsx-runtime";
import { findAfter } from "unist-util-find-after";
import { visitParents } from "unist-util-visit-parents";
import replaceAllBetween from "unist-util-replace-all-between";
import { SectionTitle } from "@/components/section";
import { Link } from "@heroui/react";
import { CodeBlock } from "@/components/code-block";
import { BlogImage, Paragraph, Subheading, Code } from "@/components/blog-post";

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
  return (tree: MdRoot) => {
    visitParents(tree, "image", (node, parents) => {
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

export async function getPostHTML(name: string): Promise<React.JSX.Element> {
  const post = await getPost(name);

  function fixUrls(url: any) {
    return `${post.rootUrl}/${url.path}`;
  }

  const production = {
    Fragment: prod.Fragment,
    jsx: prod.jsx,
    jsxs: prod.jsxs,
    components: {
      h1: SectionTitle,
      h2: Subheading,
      p: Paragraph,
      a: Link,
      pre: CodeBlock,
      code: Code,
      img: BlogImage,
    },
  };

  try {
    const matterResult = matter(post.content);

    const processor = await unified()
      .use(remarkParse, { fragment: true })
      .use(remarkImages)
      .use(remarkRehype)
      .use(rehypeUrls, fixUrls)
      .use(rehypeFormat)
      .use(rehypeSanitize)
      .use(rehypeHighlight)
      .use(rehypeUnwrapImages)
      .use(rehypeProbeImageSize)
      .use(rehypePicture)
      .use(rehypeReact, production);

    const file = await processor.process(matterResult.content);

    return file.result;
  } catch (error) {
    throw new Error(`Failed to process Blog Post: ${name}`);
  }
}

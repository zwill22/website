import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypePicture from "rehype-picture";
import rehypeHighlight from "rehype-highlight";
import rehypeClasses from "rehype-class-names";
import rehypeSanitize from "rehype-sanitize";
import rehypeFormat from "rehype-format";
import rehypeReact from "rehype-react";
import rehypeUrls from "rehype-urls";
import type { Root as MdRoot } from "mdast";
import type { Root as HastRoot } from "hast";
import matter from "gray-matter";
import production from "react/jsx-runtime";
import { findAfter } from "unist-util-find-after";
import { visitParents } from "unist-util-visit-parents";
import replaceAllBetween from "unist-util-replace-all-between";
import { h } from "hastscript";
import clsx from "clsx";

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

function rehypeCopyButton() {
  return (tree: HastRoot) => {
    visitParents(tree, "element", (node, parents) => {
      if (node.tagName !== "code") {
        return;
      }

      const parent = parents[parents.length - 1];
      if (parent.type !== "element" || parent.tagName !== "pre") {
        return;
      }

      const icon = h("i", { class: "bi bi-clipboard" });
      const div = h("div", {}, icon);

      const copy = (e: Event) => {
        if (!e.target) {
          return;
        }

        console.log(e.target);
      };

      let button = h("button", { class: "copy-btn", type: "button" }, div);

      parent.children.push(button);
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
      .use(rehypeHighlight)
      .use(rehypeCopyButton)
      .use(rehypeClasses, {
        h1: "grow text-4xl md:text-6xl font-heading py-4 md:py-8 text-wrap",
        h2: "grow text-2xl md:text-3xl font-heading py-3 md:py-6 text-wrap",
        p: "grow text-justify md:text-lg py-2 text-wrap",
        pre: "relative grow my-0.5 mx-0 overflow-x-auto z-0 hljs rounded-lg pr-10 shadow shadow-foreground/50",
        code: "font-mono rounded-lg z-1",
        "pre code": "flex grow sm:text-sm",
        "p code": "hljs p-0 not-italic",
        "li code": "hljs p-0 not-italic",
        ul: "text-left p-4 md:text-lg",
        "pre button": clsx(
          "absolute bg-white-/10 shadow shadow-white/50 cursor-pointer top-0 right-0 px-2 py-1 mr-4 my-2.5 z-2",
          "rounded-lg hover:bg-white/20 hover:shadow-white hover:text-bold",
        ),
        i: "text-white",
        img: "mx-auto",
      })
      .use(rehypePicture)
      .use(rehypeReact, production);

    const file = await processor.process(matterResult.content);

    return file.result;
  } catch (error) {
    throw new Error(`Failed to process Blog Post: ${name}`);
  }
}

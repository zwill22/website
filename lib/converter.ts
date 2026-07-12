import prod from "react/jsx-runtime";
import { CodeBlock } from "@/components/markdown/code-block";
import {
  Link,
  Paragraph,
  Subheading,
  Code,
  Heading,
  MinorHeading,
  List,
  ListItem,
  Img,
} from "@/components/typesetting/format";
import { unified } from "unified";
import rehypeParse from "rehype-parse";
import rehypeReact from "rehype-react";
import markdownToHtml from "markdown-to-html";
import latexToHtml from "latex-to-html";
import type { Root as HastRoot, Element } from "hast";
import rehypePicture from "rehype-picture";
import rehypeHighlight from "rehype-highlight";
import rehypeRemoveEmptyAttribute from "rehype-remove-empty-attribute";
import rehypeUnwrapImages from "rehype-unwrap-images";
import rehypeStringify from "rehype-stringify";
import { visitParents } from "unist-util-visit-parents";
import { visit } from "unist-util-visit";
import { remove } from "unist-util-remove";
import { getErrorMessage } from "@/lib/errors";
import { fetchImageSize } from "@/lib/image";

function checkListDepth() {
  return (tree: HastRoot) => {
    visitParents(tree, "element", (node, parents) => {
      if (node.tagName !== "li") {
        return;
      }

      let depth = 0;
      for (let i = 0; i < parents.length; i++) {
        const parent = parents[i];
        if (parent.type === "element" && parent.tagName === "ul") {
          depth += 1;
        }
      }

      node.properties.depth = depth;
    });
  };
}

function inlineCodeBlocks() {
  return (tree: HastRoot) => {
    visitParents(tree, "element", (node, parents) => {
      if (node.tagName !== "code") {
        return;
      }

      node.properties.inline = true;
      for (let i = 0; i < parents.length; i++) {
        const parent = parents[i];
        if (parent.type === "element" && parent.tagName === "pre") {
          node.properties.inline = false;
          return;
        }
      }
    });
  };
}

function inlineLinks() {
  return (tree: HastRoot) => {
    visit(tree, "element", (node) => {
      if (node.tagName !== "a") {
        return;
      }

      node.properties.inline = "true";
    });

    visitParents(tree, "element", (node, parents) => {
      if (node.tagName !== "img") {
        return;
      }

      for (let i = 0; i < parents.length; i++) {
        const parent = parents[i];
        if (parent.type === "element" && parent.tagName === "a") {
          parent.properties.inline = "false";
          return;
        }
      }
    });
  };
}

function cleanEmptyTags() {
  return (tree: HastRoot) => {
    remove(tree, (node) => {
      if (node.type !== "element") {
        return false;
      }

      const element = node as Element;

      if (element.children.length > 0) {
        return false;
      }

      const elements = ["span", "p", "div"];

      return elements.includes(element.tagName);
    });
  };
}

function fixHtml(inputUrl: string, rootUrl: string) {
  try {
    const url = new URL(inputUrl);

    return url.href;
  } catch (error) {
    const message = getErrorMessage(error);
    if (message !== "Invalid URL") {
      throw error;
    }
  }

  const url = new URL(`${rootUrl}/${inputUrl}`);

  return url.href;
}

function fixUrls(rootUrl: string) {
  return (tree: HastRoot) => {
    visit(tree, "element", (node) => {
      if (node.tagName !== "a" && node.tagName !== "img") {
        return;
      }

      if (node.tagName === "a") {
        const html = fixHtml(`${node.properties.href}`, rootUrl);

        node.properties.href = html;
      }

      if (node.tagName === "img") {
        const html = fixHtml(`${node.properties.src}`, rootUrl);

        node.properties.src = html;
      }
    });
  };
}

async function probeImageSizes() {
  return async (tree: HastRoot) => {
    // Collect relevent nodes
    const matches: Element[] = [];

    // Visit all nodes and add relevent ones to matches
    visit(tree, "element", (node) => {
      if (node.tagName !== "img") {
        return;
      }

      const src = node.properties.src;

      if (typeof src === "string") {
        matches.push(node);
      }
    });

    const promises = matches.map(async (match: Element) => {
      const src = match.properties.src;

      const imageSize = await fetchImageSize(`${src}`);

      match.properties.width = imageSize.width;
      match.properties.height = imageSize.height;
    });

    Promise.all(promises);

    return tree;
  };
}

async function processHTML(html: string, rootUrl: string): Promise<string> {
  try {
    const processor = await unified()
      .use(rehypeParse, { fragment: true })
      .use(fixUrls, rootUrl)
      .use(rehypeHighlight)
      .use(rehypeUnwrapImages)
      .use(probeImageSizes)
      .use(rehypePicture)
      .use(checkListDepth)
      .use(inlineCodeBlocks)
      .use(inlineLinks)
      .use(rehypeRemoveEmptyAttribute)
      .use(cleanEmptyTags)
      .use(rehypeStringify);

    const file = await processor.process(html);

    return file.value;
  } catch (error: unknown) {
    const message = getErrorMessage(error);
    throw new Error(`Failed to process HTML: ${message}`);
  }
}

async function convertHtmlIntoReact(html: string): Promise<React.JSX.Element> {
  const production = {
    Fragment: prod.Fragment,
    jsx: prod.jsx,
    jsxs: prod.jsxs,
    components: {
      h1: Heading,
      h2: Subheading,
      h3: MinorHeading,
      p: Paragraph,
      a: Link,
      pre: CodeBlock,
      code: Code,
      img: Img,
      ul: List,
      li: ListItem,
    },
  };

  try {
    const processor = await unified()
      .use(rehypeParse, { fragment: true })
      .use(rehypeReact, production);

    const file = await processor.process(html);

    return file.result;
  } catch (error) {
    const message = getErrorMessage(error);

    throw new Error(`Failed to convert HTML to React: ${message}`);
  }
}

export async function markdownToReact(
  input: string,
  rootUrl: string,
): Promise<React.JSX.Element> {
  const htmlString = await markdownToHtml(input);

  const processedHTML = await processHTML(htmlString, rootUrl);

  return convertHtmlIntoReact(processedHTML);
}

export async function latexToReact(latex: string): Promise<React.JSX.Element> {
  const htmlString = await latexToHtml(latex);

  const processedHTML = await processHTML(htmlString, "");

  return convertHtmlIntoReact(processedHTML);
}

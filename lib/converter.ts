import prod from "react/jsx-runtime";
import { CodeBlock } from "@/components/markdown/code-block";
import {
  Image,
  Link,
  Paragraph,
  Subheading,
  Code,
  Heading,
  MinorHeading,
  List,
  ListItem,
} from "@/components/typesetting/format";
import { unified } from "unified";
import rehypeParse from "rehype-parse";
import rehypeReact from "rehype-react";
import markdownToHtml from "markdown-to-html";
import latexToHtml from "latex-to-html";
import type { Root as HastRoot, Element } from "hast";
import rehypePicture from "rehype-picture";
import rehypeHighlight from "rehype-highlight";
import rehypeProbeImageSize from "rehype-probe-image-size";
import rehypeRemoveEmptyAttribute from "rehype-remove-empty-attribute";
import rehypeUnwrapImages from "rehype-unwrap-images";
import rehypeStringify from "rehype-stringify";
import rehypeUrls from "rehype-urls";
import { visitParents } from "unist-util-visit-parents";
import { visit } from "unist-util-visit";
import { remove } from "unist-util-remove";

function rehypeListDepth() {
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

function rehypeTagCodeBlocks() {
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

function rehypeLinks() {
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

function rehypeClean() {
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

async function processHTML(html: string, rootUrl: string): Promise<string> {
  function fixUrls(url: any) {
    if (url.protocol == null) {
      return `${rootUrl}/${url.path}`;
    }

    return url.href;
  }

  try {
    const processor = await unified()
      .use(rehypeParse, { fragment: true })
      .use(rehypeUrls, fixUrls)
      .use(rehypeHighlight)
      .use(rehypeUnwrapImages)
      .use(rehypeProbeImageSize)
      .use(rehypePicture)
      .use(rehypeListDepth)
      .use(rehypeTagCodeBlocks)
      .use(rehypeLinks)
      .use(rehypeRemoveEmptyAttribute)
      .use(rehypeClean)
      .use(rehypeStringify);

    const file = await processor.process(html);

    return file.value;
  } catch (error) {
    throw new Error(`Failed to process HTML: ${html}`);
  }
}

export async function htmlToReact(html: string): Promise<React.JSX.Element> {
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
      img: Image,
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
    throw new Error(`Failed to convert HTML to React: ${html}`);
  }
}

export async function markdownToReact(
  input: string,
  rootUrl: string,
): Promise<React.JSX.Element> {
  const htmlString = await markdownToHtml(input);

  const processedHTML = await processHTML(htmlString, rootUrl);

  return htmlToReact(processedHTML);
}

export async function latexToReact(latex: string): Promise<React.JSX.Element> {
  const htmlString = await latexToHtml(latex);

  const processedHTML = await processHTML(htmlString, "");

  return htmlToReact(processedHTML);
}

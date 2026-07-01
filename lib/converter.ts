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
import type { Root as HastRoot } from "hast";
import { visitParents } from "unist-util-visit-parents";

function rehypeLinks() {
  return (tree: HastRoot) => {
    visitParents(tree, "element", (node, parents) => {
      if (node.tagName !== "a") {
        return;
      }

      node.properties.inline = true;
    });

    visitParents(tree, "element", (node, parents) => {
      if (node.tagName !== "img") {
        return;
      }

      for (let i = 0; i < parents.length; i++) {
        const parent = parents[i];
        if (parent.type === "element" && parent.tagName === "a") {
          parent.properties.inline = false;
          return;
        }
      }
    });
  };
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
      .use(rehypeLinks)
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
  const htmlString = await markdownToHtml(input, rootUrl);

  return htmlToReact(htmlString);
}

export async function latexToReact(latex: string): Promise<React.JSX.Element> {
  const htmlString = await latexToHtml(latex);

  return htmlToReact(htmlString);
}

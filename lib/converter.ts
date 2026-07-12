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
import processHTML from "html-processor";
import { getErrorMessage } from "@/lib/errors";

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
  urlFunction: (url: string) => string,
): Promise<React.JSX.Element> {
  const htmlString = await markdownToHtml(input);

  const processedHTML = await processHTML(htmlString, urlFunction);

  return convertHtmlIntoReact(processedHTML);
}

export async function latexToReact(latex: string): Promise<React.JSX.Element> {
  const htmlString = await latexToHtml(latex);

  const processedHTML = await processHTML(htmlString, (url) => url);

  return convertHtmlIntoReact(processedHTML);
}

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
import markdownToHtml from "@/packages/markdown-to-html";

export async function processMd(
  input: string,
  rootUrl: string,
): Promise<React.JSX.Element> {
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

  const htmlString = await markdownToHtml(input, rootUrl);

  try {
    const processor = await unified()
      .use(rehypeParse)
      .use(rehypeReact, production);

    const file = await processor.process(htmlString);

    return file.result;
  } catch (error) {
    throw new Error(`Failed to process markdown: ${input}`);
  }
}

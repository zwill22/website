import prod from "react/jsx-runtime";
import { CodeBlock } from "@/components/code/code-block";
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
} from "@/components/react/format";
import { unified } from "unified";
import rehypeParse from "rehype-parse";
import rehypeReact from "rehype-react";
import { getErrorMessage } from "@/lib/errors";
import {
  Tbl,
  TblBody,
  TblCell,
  TblCol,
  TblHead,
  TblRow,
} from "@/components/react/table";

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
      img: Img,
      ul: List,
      li: ListItem,
      table: Tbl,
      thead: TblHead,
      tr: TblRow,
      th: TblCol,
      tbody: TblBody,
      td: TblCell,
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

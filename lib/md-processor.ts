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
import type { Root as HastRoot } from "hast";
import matter from "gray-matter";
import prod from "react/jsx-runtime";
import { findAfter } from "unist-util-find-after";
import { visitParents } from "unist-util-visit-parents";
import replaceAllBetween from "unist-util-replace-all-between";
import { Link } from "@heroui/react";
import { CodeBlock } from "@/components/blog/code-block";
import {
  BlogImage,
  Paragraph,
  Subheading,
  Code,
  Heading,
  MinorHeading,
  List,
  ListItem,
} from "@/components/markdown/format";

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

export async function processMd(
  input: string,
  rootUrl: string,
): Promise<React.JSX.Element> {
  function fixUrls(url: any) {
    if (url.protocol == null) {
      return `${rootUrl}/${url.path}`;
    }

    return url.href;
  }

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
      img: BlogImage,
      ul: List,
      li: ListItem,
    },
  };

  try {
    const matterResult = matter(input);

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
      .use(rehypeListDepth)
      .use(rehypeReact, production);

    const file = await processor.process(matterResult.content);

    return file.result;
  } catch (error) {
    throw new Error("Failed to process markdown");
  }
}

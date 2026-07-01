import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypePicture from "rehype-picture";
import rehypeHighlight from "rehype-highlight";
import rehypeProbeImageSize from "rehype-probe-image-size";
import rehypeUnwrapImages from "rehype-unwrap-images";
import rehypeSanitize from "rehype-sanitize";
import rehypeFormat from "rehype-format";
import rehypeUrls from "rehype-urls";
import rehypeStringify from "rehype-stringify";
import matter from "gray-matter";
import { findAfter } from "unist-util-find-after";
import { visitParents } from "unist-util-visit-parents";
import replaceAllBetween from "unist-util-replace-all-between";

function rehypeListDepth() {
  return (tree) => {
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
  return (tree) => {
    visitParents(tree, "image", (node, parents) => {
      const parent = parents[parents.length - 1];

      const altNode = findAfter(parent, node, "emphasis");

      if (!altNode) {
        return;
      }

      node.title = node.alt;

      let alt = "";
      altNode.children.values().forEach((child) => {
        alt += child.value;
      });

      node.alt = alt;

      // Replace all nodes between `node` and `altNode` (inclusive) with `node`
      replaceAllBetween(parent, node, altNode, () => [node]);
    });
  };
}

function rehypeTagCodeBlocks() {
  return (tree) => {
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

export default async function markdownToHtml(input, rootUrl) {
  function fixUrls(url) {
    if (url.protocol == null) {
      return `${rootUrl}/${url.path}`;
    }

    return url.href;
  }

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
      .use(rehypeTagCodeBlocks)
      .use(rehypeStringify);

    const file = await processor.process(matterResult.content);

    return file.value;
  } catch (error) {
    throw new Error(`Failed to process markdown: ${input}`);
  }
}

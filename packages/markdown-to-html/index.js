import { unified } from "unified";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeSanitize from "rehype-sanitize";
import rehypeFormat from "rehype-format";
import rehypeStringify from "rehype-stringify";
import rehypeRaw from "rehype-raw";
import matter from "gray-matter";
import { findAfter } from "unist-util-find-after";
import { visitParents } from "unist-util-visit-parents";
import replaceAllBetween from "unist-util-replace-all-between";

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

export default async function markdownToHtml(input, allowHtml) {
  try {
    const matterResult = matter(input);

    const processor = await unified()
      .use(remarkParse, { fragment: true })
      .use(remarkGfm)
      .use(remarkImages)
      .use(remarkRehype, { allowDangerousHtml: allowHtml })
      .use(rehypeRaw)
      .use(rehypeSanitize)
      .use(rehypeFormat)
      .use(rehypeStringify);

    const file = await processor.process(matterResult.content);

    return file.value;
  } catch {
    throw new Error(`Failed to process markdown: ${input}`);
  }
}

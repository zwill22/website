import { unified } from "unified";
import rehypeParse from "rehype-parse";
import rehypeHighlight from "rehype-highlight";
import rehypeRemoveEmptyAttribute from "rehype-remove-empty-attribute";
import rehypeUnwrapImages from "rehype-unwrap-images";
import rehypeStringify from "rehype-stringify";
import { visitParents } from "unist-util-visit-parents";
import { visit } from "unist-util-visit";
import { remove } from "unist-util-remove";

function checkListDepth() {
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

function inlineCodeBlocks() {
  return (tree) => {
    visitParents(tree, "element", (node, parents) => {
      if (node.tagName !== "code") {
        return;
      }

      node.properties.inline = "true";
      for (let i = 0; i < parents.length; i++) {
        const parent = parents[i];
        if (parent.type === "element" && parent.tagName === "pre") {
          node.properties.inline = "false";
          return;
        }
      }
    });
  };
}

function inlineLinks() {
  return (tree) => {
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
  return (tree) => {
    remove(tree, (node) => {
      if (node.type !== "element") {
        return false;
      }

      if (node.children.length > 0) {
        return false;
      }

      const elements = ["span", "p", "div"];

      return elements.includes(node.tagName);
    });
  };
}

function fixHtml(inputUrl, urlFunction) {
  try {
    const url = new URL(inputUrl);

    return [url.href, "true"];
  } catch (error) {
    if (error.message !== "Invalid URL") {
      throw error;
    }
  }

  const href = urlFunction(inputUrl);

  return [href, "false"];
}

function fixUrls(urlFunction) {
  return (tree) => {
    visit(tree, "element", (node) => {
      if (node.tagName !== "a" && node.tagName !== "img") {
        return;
      }

      if (node.tagName === "a") {
        const [html, external] = fixHtml(
          `${node.properties.href}`,
          urlFunction,
        );

        node.properties.href = html;
        node.properties.external = external;
      }

      if (node.tagName === "img") {
        const [html, external] = fixHtml(`${node.properties.src}`, urlFunction);

        node.properties.src = html;
        node.properties.external = external;
      }
    });
  };
}

function tableHeaders() {
  return (tree) => {
    visitParents(tree, "element", (node, parents) => {
      if (node.tagName !== "tr") {
        return;
      }

      const parent = parents[parents.length - 1];

      if (parent.tagName != "thead") {
        node.properties.header = "false"
      } else {
        node.properties.header = "true"
      }
    });
  };
}


export default async function processHTML(html, urlFunction) {
  try {
    const processor = unified()
      .use(rehypeParse, { fragment: true })
      .use(fixUrls, urlFunction)
      .use(rehypeHighlight)
      .use(rehypeUnwrapImages)
      .use(checkListDepth)
      .use(inlineCodeBlocks)
      .use(inlineLinks)
      .use(rehypeRemoveEmptyAttribute)
      .use(cleanEmptyTags)
      .use(tableHeaders)
      .use(rehypeStringify);

    const file = await processor.process(html);

    return file.value;
  } catch (error) {
    throw new Error(`Failed to process HTML: ${error.message}`);
  }
}

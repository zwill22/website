import { unified } from "unified";
import rehypeParse from "rehype-parse";
import rehypeHighlight from "rehype-highlight";
import rehypeRemoveEmptyAttribute from "rehype-remove-empty-attribute";
import rehypeUnwrapImages from "rehype-unwrap-images";
import rehypeStringify from "rehype-stringify";
import { visitParents } from "unist-util-visit-parents";
import { visit } from "unist-util-visit";
import { remove } from "unist-util-remove";
import imageSize from "@coderosh/image-size";

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

function fixHtml(inputUrl, rootUrl) {
  try {
    const url = new URL(inputUrl);

    return [url.href, "true"];
  } catch (error) {
    if (error.message !== "Invalid URL") {
      throw error;
    }
  }

  const url = new URL(`${rootUrl}/${inputUrl}`);

  return [url.href, "false"];
}

function fixUrls(rootUrl) {
  return (tree) => {
    visit(tree, "element", (node) => {
      if (node.tagName !== "a" && node.tagName !== "img") {
        return;
      }

      if (node.tagName === "a") {
        const [html, external] = fixHtml(`${node.properties.href}`, rootUrl);

        node.properties.href = html;
        node.properties.external = external;
      }

      if (node.tagName === "img") {
        const [html, external] = fixHtml(`${node.properties.src}`, rootUrl);

        node.properties.src = html;
        node.properties.external = external;
      }
    });
  };
}

async function probeImageSizes() {
  return async (tree) => {
    // Collect relevent nodes
    const matches = [];

    // Visit all nodes and add relevent ones to matches
    visit(tree, "element", (node) => {
      if (node.tagName !== "img") {
        return;
      }

      matches.push(node);
    });

    const promises = matches.map(async (match) => {
      const src = match.properties.src;

      const size = await imageSize(`${src}`);

      match.properties.width = size.width;
      match.properties.height = size.height;
    });

    Promise.all(promises);

    return tree;
  };
}

export default async function processHTML(html, rootUrl) {
  try {
    const processor = await unified()
      .use(rehypeParse, { fragment: true })
      .use(fixUrls, rootUrl)
      .use(rehypeHighlight)
      .use(rehypeUnwrapImages)
      .use(probeImageSizes)
      .use(checkListDepth)
      .use(inlineCodeBlocks)
      .use(inlineLinks)
      .use(rehypeRemoveEmptyAttribute)
      .use(cleanEmptyTags)
      .use(rehypeStringify);

    const file = await processor.process(html);

    return file.value;
  } catch (error) {
    throw new Error(`Failed to process HTML: ${error.message}`);
  }
}

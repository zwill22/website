import { unified } from "unified";
import { unifiedLatexFromString } from "@unified-latex/unified-latex-util-parse";
import { unifiedLatexToHast } from "@unified-latex/unified-latex-to-hast";
import rehypeSanitize from "rehype-sanitize";
import rehypeFormat from "rehype-format";
import rehypeStringify from "rehype-stringify";

export default async function latexToHtml(input) {
  const processor = unified()
    .use(unifiedLatexFromString)
    .use(unifiedLatexToHast)
    .use(rehypeFormat)
    .use(rehypeSanitize)
    .use(rehypeStringify);

  const out = await processor.process(input);

  return out.value;
}

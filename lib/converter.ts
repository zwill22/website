import processHTML from "@/packages/html-processor";
import latexToHtml from "@/packages/latex-to-html";
import markdownToHtml from "@/packages/markdown-to-html";

export async function convertMarkdown(
  input: string,
  urlFunction: (url: string) => string,
): Promise<string> {
  const htmlString = await markdownToHtml(input, true);

  return processHTML(htmlString, urlFunction);
}

export async function convertLatex(latex: string): Promise<string> {
  const htmlString = await latexToHtml(latex);

  return processHTML(htmlString, (url) => url);
}

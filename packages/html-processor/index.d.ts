export default async function processHTML(
  html: string,
  urlFunction: (url: string) => string,
): Promise<string>;

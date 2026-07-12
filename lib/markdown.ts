import { markdownToReact } from "@/lib/converter";
import { FileData } from "@/lib/filedata";
import { fetchContent } from "@/lib/github";

function getRootUrl(fileData: FileData) {
  const path = (() => {
    const components = fileData.path.split("/");
    if (components.length <= 1) {
      return "";
    }

    let root_path = "";

    for (let index = 0; index < components.length - 1; index++) {
      const element = components[index];

      root_path += `/${element}`;
    }

    return root_path;
  })();

  return `https://raw.githubusercontent.com/${fileData.owner}/${fileData.repo}/refs/heads/main${path}`;
}

async function fetchGitHubMarkdown(fileData: FileData) {
  const rootUrl = getRootUrl(fileData);

  const contentString = await fetchContent(
    fileData.owner,
    fileData.repo,
    fileData.path,
  );

  return markdownToReact(contentString, rootUrl);
}

export async function fetchMarkdownAsReact(fileData: FileData) {
  if (fileData.source === "github") {
    return fetchGitHubMarkdown(fileData);
  } else {
    throw new Error(`Unknown data source: ${fileData.source}`);
  }
}

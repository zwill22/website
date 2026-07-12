import { markdownToReact } from "@/lib/converter";
import { fetchContent } from "@/lib/github";

interface FileData {
  source: string;
  owner: string;
  repo: string;
  path: string;
  id: string;
}

function getFileData(project: string): FileData {
  const regex =
    /(\w.*?)_repo_(\w.*?)_(\w.*?)_path_(\w.*?)_([a-zA-Z\d]+)_(\d+)/gm;

  const m = regex.exec(project);
  if (!m) {
    throw new Error("Invalid project code");
  }

  const source = m[1];
  const owner = m[2];
  const repo = m[3];
  const path = `${m[4].replaceAll("_", "/")}.${m[5]}`;
  const id = m[6];

  const out = {
    source: source,
    owner: owner,
    repo: repo,
    path: path,
    id: id,
  };

  return out;
}

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

async function fetchMarkdownAsReact(fileData: FileData) {
  if (fileData.source === "github") {
    return fetchGitHubMarkdown(fileData);
  } else {
    throw new Error(`Unknown data source: ${fileData.source}`);
  }
}

export async function fetchReact(id: string) {
  const fileData = getFileData(id);

  return fetchMarkdownAsReact(fileData);
}

import { Octokit } from "octokit";

interface FileResponseData {
  content: string;
}

interface FileResponse {
  data: FileResponseData;
}

export async function fetchContent(
  kit: Octokit,
  owner: string,
  repo: string,
  path: string,
): Promise<string> {
  try {
    const response = await kit.request(
      "GET /repos/{owner}/{repo}/contents/{path}",

      {
        owner: owner,
        repo: repo,
        path: path,
        mediaType: {
          format: "file",
        },
      },
    );

    if (response.status != 200) {
      throw new Error(`Invalid response, code: ${response.status}`);
    }

    const data = (response as FileResponse).data;

    const base64Content = data.content;

    return Buffer.from(base64Content, "base64").toString("utf-8");
  } catch {
    throw new Error(`Failed to fetch file: ${path}`);
  }
}

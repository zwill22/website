import { getErrorMessage } from "@/lib/errors";
import { Octokit } from "octokit";

interface FileResponseData {
  content: string;
}

interface FileResponse {
  data: FileResponseData;
}

const username = "zwill22";
const githubApiVersion = "2026-03-10";

export async function fetchReposList(octokit: Octokit) {
  try {
    const response = await octokit.request("GET /users/{username}/repos", {
      username: username,
      per_page: 100, // I don't have that many repos
      direction: "desc",
      headers: {
        "X-GitHub-Api-Version": githubApiVersion,
      },
    });

    if (response.status !== 200) {
      throw new Error(
        `Failed to fetch project list, status code: ${response.status}`,
      );
    }

    return response.data;
  } catch (error) {
    const message = getErrorMessage(error);
    throw new Error(`Failed to fetch Repo List: ${message}`);
  }
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
        headers: {
          "X-GitHub-Api-Version": githubApiVersion,
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

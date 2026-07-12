import { getErrorMessage } from "@/lib/errors";
import { Octokit } from "octokit";

interface FileResponseData {
  content: string;
  encoding: string;
}

interface FileResponse {
  data: FileResponseData;
}

const username = "zwill22";
const githubApiVersion = "2026-03-10";

const authToken = (() => {
  const token = process.env.GITHUB_PUBLIC_ACCESS_TOKEN;

  if (!token) {
    throw new Error("No github authentication token found");
  }

  return token;
})();

const octokit = new Octokit({
  auth: authToken,
});

export async function fetchReposList() {
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

function base64ToString(content: string) {
  const output = Buffer.from(content, "base64").toString("utf-8");

  return output;
}

export async function fetchRawContent(
  owner: string,
  repo: string,
  path: string,
  auth?: Octokit,
) {
  const ok = auth ?? octokit;

  try {
    const response = await ok.request(
      "GET /repos/{owner}/{repo}/contents/{path}",

      {
        owner: owner,
        repo: repo,
        path: path,
        headers: {
          "X-GitHub-Api-Version": githubApiVersion,
        },
      },
    );

    if (response.status != 200) {
      throw new Error(`Invalid response, code: ${response.status}`);
    }

    return (response as FileResponse).data;
  } catch {
    throw new Error(`Failed to fetch file: ${path}`);
  }
}

export async function fetchContent(
  owner: string,
  repo: string,
  path: string,
  auth?: Octokit,
): Promise<string> {
  const data = await fetchRawContent(owner, repo, path, auth);

  if (data.encoding === "base64") {
    return base64ToString(data.content);
  } else {
    throw new Error(`Unsupported encoding for data: ${data.encoding}`);
  }
}

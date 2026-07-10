import fs from "fs/promises";
import { MenuItemData } from "@/lib/types";
import { markdownToReact } from "@/lib/converter";
import { getErrorMessage } from "@/lib/errors";
import { Octokit } from "octokit";
import { fetchContent, fetchReposList } from "@/lib/github";

type ProjectData = {
  name: string;
  blurb: string;
  imageSrc: string;
  imgAlt: string;
};

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

async function fetchProjectData() {
  try {
    const jsonString = await fs.readFile("./data/project-data.json", {
      encoding: "utf8",
    });

    return JSON.parse(jsonString).projects;
  } catch (error) {
    const message = getErrorMessage(error);
    throw new Error(`Failed to read project data: ${message}`);
  }
}

interface Repo {
  id: number;
  name: string;
  created_at?: string | null;
  owner: {
    login: string;
  };
}

function convertData(repo: Repo, jsonData: ProjectData[]) {
  const repoData = jsonData.find((data: ProjectData) => {
    return data.name == repo.name;
  });

  return {
    id: `github_repos_${repo.owner.login}_${repo.name}_path__${repo.id}`,
    title: repo.name,
    date: new Date(repo.created_at ?? ""),
    preview: repoData?.blurb ?? "Repo",
    image: repoData?.imageSrc ?? "logo.svg",
    imageDescription: repoData?.imgAlt ?? "Placeholder image",
  };
}

export async function fetchProjects(): Promise<MenuItemData[]> {
  const [jsonData, repoData] = await Promise.all([
    fetchProjectData(),
    fetchReposList(octokit),
  ]);

  const data = repoData.filter((repo) => {
    return jsonData.find((data: ProjectData) => {
      return data.name == repo.name;
    });
  });

  return data
    .map((repo) => convertData(repo, jsonData))
    .sort(
      (project1: MenuItemData, project2: MenuItemData) =>
        project2.date.getTime() - project1.date.getTime(),
    );
}

export interface RepoData {
  source: string;
  owner: string;
  repo: string;
  path?: string;
  id: string;
}

function getRootUrl(repoData: RepoData) {
  return `https://raw.githubusercontent.com/${repoData.owner}/${repoData.repo}/refs/heads/main`;
}

async function fetchGitHubReadme(repoData: RepoData) {
  const path = repoData.path ?? "";
  const filepath = `${path}README.md`;

  const rootUrl = getRootUrl(repoData);

  const contentString = await fetchContent(
    octokit,
    repoData.owner,
    repoData.repo,
    filepath,
  );

  return markdownToReact(contentString, rootUrl);
}

export async function fetchReadme(repoData: RepoData) {
  if (repoData.source === "github") {
    return fetchGitHubReadme(repoData);
  } else {
    throw new Error(`Unknown data source: ${repoData.source}`);
  }
}

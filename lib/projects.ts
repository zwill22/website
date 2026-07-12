import fs from "fs/promises";
import { MenuItemData } from "@/lib/types";
import { getErrorMessage } from "@/lib/errors";
import { fetchReposList } from "@/lib/github";

type ProjectData = {
  name: string;
  blurb: string;
  imageSrc: string;
  imgAlt: string;
};

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
    id: `github_repo_${repo.owner.login}_${repo.name}_path_README_md_${repo.id}`,
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
    fetchReposList(),
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

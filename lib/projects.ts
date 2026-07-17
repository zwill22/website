import { MenuItemData } from "@/lib/types";
import { getErrorMessage } from "@/lib/errors";
import { fetchContent, fetchReposList, imageUrlRoot } from "@/lib/github";

const owner = "zwill22";
const projects_repo = "projects";

type ProjectData = {
  name: string;
  description: string;
  thumbnail: string;
  alt: string;
};

async function fetchProjectData(): Promise<ProjectData[]> {
  try {
    const fetchedData = await fetchContent(
      owner,
      projects_repo,
      "projects.json",
    );

    const projects = JSON.parse(fetchedData).projects;

    return projects;
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

  const image = (() => {
    const urlRoot = imageUrlRoot(owner, projects_repo);
    const image = repoData?.thumbnail ?? "";
    if (image.length > 0) {
      return `${urlRoot}/thumbnails/${image}`;
    }

    return "logo.svg";
  })();

  return {
    id: `github_repo_${repo.owner.login}_${repo.name}_path_README_md_${repo.id}`,
    title: repo.name,
    date: new Date(repo.created_at ?? ""),
    preview: repoData?.description ?? "Repo",
    image: image,
    imageDescription: repoData?.alt ?? "Placeholder image",
  };
}

export async function fetchProjects(): Promise<MenuItemData[]> {
  const [jsonData, repoData] = await Promise.all([
    fetchProjectData(),
    fetchReposList(),
  ]);

  const data = repoData.filter((repo: Repo) => {
    return jsonData.find((data: ProjectData) => {
      return data.name == repo.name;
    });
  });

  return data
    .map((repo: Repo) => convertData(repo, jsonData))
    .sort(
      (project1: MenuItemData, project2: MenuItemData) =>
        project2.date.getTime() - project1.date.getTime(),
    );
}

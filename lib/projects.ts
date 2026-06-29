import fs from "fs/promises";
import { MenuItemData } from "@/lib/types";
import { processMd } from "@/lib/md-processor";

type ProjectData = {
  id: string;
  title: string;
  date: string;
  url: string;
  blurb: string;
  imageSrc: string;
  imgAlt: string;
};

export async function fetchProjects(): Promise<MenuItemData[]> {
  try {
    const jsonString = await fs.readFile("./data/project-data.json", {
      encoding: "utf8",
    });

    const jsonData = JSON.parse(jsonString);

    return jsonData.projects
      .map((project: ProjectData): MenuItemData => {
        return {
          id: project.id,
          title: project.title,
          date: new Date(project.date),
          preview: project.blurb,
          image: project.imageSrc,
          imageDescription: project.imgAlt,
        };
      })
      .sort(
        (project1: MenuItemData, project2: MenuItemData) =>
          project2.date.getTime() - project1.date.getTime(),
      );
  } catch (error) {
    throw new Error("Failed to fetch Blog Posts");
  }
}

const projectUrl = (projectTitle: string) => {
  return `https://raw.githubusercontent.com/zwill22/${projectTitle}/refs/heads/main`;
};

interface Project {
  rootUrl: string;
  content: string;
}

async function fetchProjectReadme(name: string): Promise<Project> {
  const projectTitle = name.split("_")[0];
  const url = projectUrl(projectTitle);
  const readme = url + "/" + "README.md";

  try {
    const fetchedData = await fetch(readme);

    const stream = fetchedData.body;

    const text = await new Response(stream).text();

    return {
      rootUrl: url,
      content: text,
    };
  } catch (error) {
    throw new Error(`Unable to fetch project readme from ${readme}`);
  }
}

export async function fetchProjectHTML(name: string) {
  const project = await fetchProjectReadme(name);

  return processMd(project.content, project.rootUrl);
}

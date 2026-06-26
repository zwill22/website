import fs from "fs/promises";
import { MenuItemData } from "@/lib/types";

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

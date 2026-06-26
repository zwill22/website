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
    console.log("Attempting to ..");
    const jsonString = await fs.readFile("./data/project-data.json", {
      encoding: "utf8",
    });

    console.log("Fetched json data");

    const jsonData = JSON.parse(jsonString);
    console.log(jsonData);

    return jsonData.projects.map((project: ProjectData) => {
      return {
        id: project.id,
        title: project.title,
        date: new Date(project.date),
        preview: project.blurb,
        image: project.imageSrc,
        imageDescription: project.imgAlt,
      };
    });
  } catch (error) {
    throw new Error("Failed to fetch Blog Posts");
  }
}

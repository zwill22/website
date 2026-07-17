import "mocha";
import "dotenv/config"
import { z } from "zod";
import { assert } from "chai";
import { fetchProjects } from "@/lib/projects";

const projectSchema = z.object({
  id: z.string(),
  title: z.string(),
  date: z.date(),
  preview: z.string(),
  image: z.url(),
  imageDescription: z.string()
});

describe("fetchProjects Tests", () => {
  it("should fetch project list", async () => {
    const projects = await fetchProjects();

    for (let i = 0; i < projects.length; i++) {
      const project = projects[i];

      projectSchema.safeParse(project);
    }

    
    assert.equal(projects, projects);
  });
});

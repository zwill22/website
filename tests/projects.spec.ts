import "mocha";
import "dotenv/config"
import { z } from "zod";
import { assert } from "chai";
import { fetchProjects } from "@/lib/projects";
import { fetchContent } from "@/lib/github";
import imageSize from "@coderosh/image-size";

const projectSchema = z.object({
  id: z.string(),
  title: z.string(),
  date: z.date(),
  preview: z.string(),
  image: z.url(),
  imageDescription: z.string()
});

describe("fetchProjects Tests", () => {
  it("Validate project list", async () => {
    const projects = await fetchProjects();

    projects.forEach(async (project) => {
      const p = projectSchema.safeParse(project);

      assert.isTrue(p.success);

      // Check readme exists
      const readme = await fetchContent("zwill22", project.title, "README.md");
      assert.isString(readme);

      // Indirectly check image is valid
      const {height, width} = await imageSize(project.image);
      assert.isAbove(height, 0);
      assert.isAbove(width, 0);
    });
});
});

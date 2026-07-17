import "mocha";
import "dotenv/config"
import { z } from "zod";
import { assert } from "chai";
import { fetchBlogPosts } from "@/lib/blogs";
import { fetchContent } from "@/lib/github";
import imageSize from "@coderosh/image-size";

const blogSchema = z.object({
  id: z.string(),
  title: z.string(),
  date: z.date(),
  preview: z.string(),
  image: z.url(),
  imageDescription: z.string()
});

describe("fetchBlogPosts", () => {
  it("Validate blog list", async () => {
    const blogs = await fetchBlogPosts();

    blogs.forEach(async (blog) => {
      const post = blogSchema.safeParse(blog);

      assert.isTrue(post.success);

      // Check blog exists
      const readme = await fetchContent("zwill22", "blogs", `blogs/${blog.title}`);
      assert.isString(readme);

      // Indirectly check image is valid
      const {height, width} = await imageSize(blog.image);
      assert.isAbove(height, 0);
      assert.isAbove(width, 0);
    });
});
});

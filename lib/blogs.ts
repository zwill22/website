import { getErrorMessage } from "@/lib/errors";
import { fetchContent } from "@/lib/github";
import { MenuItemData } from "@/lib/types";

type BlogData = {
  file: string;
  title: string;
  date: string;
  blurb: string;
  image: string;
  description: string;
};

const urlRoot =
  "https://raw.githubusercontent.com/zwill22/blogs/refs/heads/main";

export async function fetchBlogPosts(): Promise<MenuItemData[]> {
  try {
    const owner = "zwill22";
    const repo = "blogs";

    const fetchedData = await fetchContent(owner, repo, "meta.json");
    const contents = JSON.parse(fetchedData).contents;

    return contents
      .map((blog: BlogData) => {
        const imageSrc = `${urlRoot}/${blog.image}`;
        const numId = Math.floor(Math.random() * 1e8);

        const pathComponents = blog.file.split(".");
        if (pathComponents.length !== 2) {
          throw new Error(`Invalid file name: ${blog.file}`);
        }
        const filename = pathComponents[0];
        const ext = pathComponents[1];

        const id = `github_repo_${owner}_${repo}_path_blogs_${filename}_${ext}_${numId}`;

        return {
          id: id,
          title: blog.title,
          date: new Date(blog.date),
          preview: blog.blurb,
          image: imageSrc,
          imageDescription: blog.description,
        };
      })
      .sort(
        (blog1: MenuItemData, blog2: MenuItemData) =>
          blog2.date.getTime() - blog1.date.getTime(),
      );
  } catch (error) {
    const message = getErrorMessage(error);
    throw new Error(`Failed to fetch Blog Posts: ${message}`);
  }
}

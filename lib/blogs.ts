import { markdownToReact } from "@/lib/converter";
import { MenuItemData } from "@/lib/types";

type BlogData = {
  file: string;
  title: string;
  date: string;
  blurb: string;
  image: string;
  description: string;
};

interface JsonData {
  contents: BlogData[];
}
export type Post = {
  rootUrl: string;
  content: string;
};

const urlRoot =
  "https://raw.githubusercontent.com/zwill22/blogs/refs/heads/main";

export async function fetchBlogPosts(): Promise<MenuItemData[]> {
  try {
    const fetchedData = await fetch(`${urlRoot}/meta.json`);
    const jsonData = fetchedData.json();

    const contents = await jsonData.then((data: JsonData) => data.contents);

    return contents
      .map((blog: BlogData) => {
        const imageSrc = `${urlRoot}/${blog.image}`;
        const id = `${blog.file.split(".")[0]}_${blog.title.replaceAll(" ", "_").replaceAll("+", "p").toLowerCase().slice(0, 40)}`;

        return {
          id: id,
          title: blog.title,
          date: new Date(blog.date),
          preview: blog.blurb,
          image: imageSrc,
          imageDescription: blog.description,
        };
      })
      .sort((blog1, blog2) => blog2.date.getTime() - blog1.date.getTime());
  } catch (error) {
    throw new Error("Failed to fetch Blog Posts");
  }
}

async function fetchPost(name: string): Promise<Post> {
  try {
    const filename = `${name.split("_")[0]}.md`;
    const fileRoot = `${urlRoot}/blogs`;
    const fileUrl = `${fileRoot}/${filename}`;

    const fetchedData = await fetch(fileUrl);

    const stream = fetchedData.body;

    const text = await new Response(stream).text();

    return {
      rootUrl: fileRoot,
      content: text,
    };
  } catch (error) {
    throw new Error(`Failed to fetch Blog Post: ${name}`);
  }
}

export async function fetchPostHTML(name: string): Promise<React.JSX.Element> {
  const post = await fetchPost(name);

  return markdownToReact(post.content, post.rootUrl);
}

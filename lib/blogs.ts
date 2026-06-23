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

export type BlogPostData = {
  id: string;
  title: string;
  date: Date;
  preview: string;
  image: string;
  imageDescription: string;
};

export async function fetchBlogPosts(): Promise<BlogPostData[]> {
  try {
    const fetchedData = await fetch(
      "https://raw.githubusercontent.com/zwill22/blogs/refs/heads/main/meta.json",
    );
    const jsonData = fetchedData.json();

    const contents = await jsonData.then((data: JsonData) => data.contents);

    return contents
      .map((blog: BlogData) => {
        const imageSrc = `https://raw.githubusercontent.com/zwill22/blogs/refs/heads/main/${blog.image}`;
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

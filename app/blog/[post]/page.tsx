import { PageBreadcrumbs } from "@/components/ui/breadcrumbs";
import { Section } from "@/components/ui/section";
import { fetchBlogPosts } from "@/lib/blogs";
import { getFileData } from "@/lib/filedata";
import { fetchMarkdownAsReact } from "@/lib/markdown";

export async function generateStaticParams() {
  const posts = await fetchBlogPosts();

  return posts.map((p) => {
    return { post: p.id };
  });
}

export default async function BlogPage(props: {
  params: Promise<{ post: string }>;
}) {
  const params = await props.params;
  const filedata = getFileData(params.post);

  const post = await fetchMarkdownAsReact(filedata);

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <Section>
      <PageBreadcrumbs
        crumbs={breadcrumbs}
        back="/blog"
        current="Current Post"
      />

      <div className="w-full text-left">{post}</div>
    </Section>
  );
}

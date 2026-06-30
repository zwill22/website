import { PageBreadcrumbs } from "@/components/ui/breadcrumbs";
import { Section } from "@/components/ui/section";
import { fetchPostHTML } from "@/lib/blogs";

export default async function BlogPage(props: {
  params: Promise<{ post: string }>;
}) {
  const params = await props.params;
  const postHTML = await fetchPostHTML(params.post);

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

      <div className="w-full text-left">{postHTML}</div>
    </Section>
  );
}

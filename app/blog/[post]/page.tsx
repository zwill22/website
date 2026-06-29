import { PostSkeleton } from "@/components/markdown/skeletons";
import { PageBreadcrumbs } from "@/components/ui/breadcrumbs";
import { Section } from "@/components/ui/section";
import { fetchPostHTML } from "@/lib/blogs";
import { Suspense } from "react";

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

      <Suspense fallback={<PostSkeleton />}>
        <div className="max-w-4xl w-full text-left">{postHTML}</div>
      </Suspense>
    </Section>
  );
}

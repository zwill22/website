import { PostSkeleton } from "@/components/markdown/skeletons";
import { PageBreadcrumbs } from "@/components/ui/breadcrumbs";
import { Section } from "@/components/ui/section";
import { fetchProjectHTML } from "@/lib/projects";
import { Suspense } from "react";

export default async function ProjectPage(props: {
  params: Promise<{ project: string }>;
}) {
  const params = await props.params;
  const postHTML = await fetchProjectHTML(params.project);

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
  ];

  return (
    <Section>
      <PageBreadcrumbs
        crumbs={breadcrumbs}
        back="/projects"
        current="Current Project"
      />

      <Suspense fallback={<PostSkeleton />}>
        <div className="max-w-4xl w-full text-left">{postHTML}</div>
      </Suspense>
    </Section>
  );
}

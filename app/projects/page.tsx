import { ListMenu } from "@/components/menu/menu-list";
import { ListSkeleton } from "@/components/menu/skeletons";
import { PageBreadcrumbs } from "@/components/ui/breadcrumbs";
import { Section, SectionTitle } from "@/components/ui/section";
import { fetchProjects } from "@/lib/projects";
import { Paragraph } from "@heroui/react/typography";
import { Suspense } from "react";

async function ProjectList() {
  const projects = await fetchProjects();

  return <ListMenu items={projects} href="/projects" />;
}

export default function Projects() {
  const crumbs = [{ name: "Home", href: "/" }];

  return (
    <Section>
      <PageBreadcrumbs crumbs={crumbs} back="/" current="Projects" />
      <SectionTitle>My Projects</SectionTitle>

      <Paragraph className="w-full px-2 md:px-4">
        The following are projects that I have worked on in my free time. All
        are open-source and available on my GitHub. If you have any questions or
        suggestions about these, I am always willing to help.
      </Paragraph>

      <div className="w-full">
        <Suspense fallback={<ListSkeleton length={4} />}>
          <ProjectList />
        </Suspense>
      </div>
    </Section>
  );
}

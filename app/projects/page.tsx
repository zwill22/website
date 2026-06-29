import { ListMenu } from "@/components/menu/menu-list";
import { PageBreadcrumbs } from "@/components/ui/breadcrumbs";
import { Section, SectionTitle } from "@/components/ui/section";
import { fetchProjects } from "@/lib/projects";

export default async function Projects() {
  const projects = await fetchProjects();

  const crumbs = [{ name: "Home", href: "/" }];

  return (
    <Section>
      <PageBreadcrumbs crumbs={crumbs} back="/" current="Projects" />
      <SectionTitle>My Projects</SectionTitle>

      <div className="w-full">
        <ListMenu items={projects} href="/projects" />
      </div>
    </Section>
  );
}

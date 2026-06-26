import { ListMenu } from "@/components/menu/menu-list";
import { Section, SectionTitle } from "@/components/ui/section";
import { fetchProjects } from "@/lib/projects";

export default async function Projects() {
  const projects = await fetchProjects();

  return (
    <Section>
      <SectionTitle>My Projects</SectionTitle>

      <div className="w-full">
        <ListMenu items={projects} href="/projects" />
      </div>
    </Section>
  );
}

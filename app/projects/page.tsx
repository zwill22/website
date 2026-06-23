import { Project } from "@/components/project";
import { Section, SectionTitle } from "@/components/section";

async function getProjects() {
  return [
    {
      id: "some unique id",
      title: "Project title"
    },
  ];
}

export default async function Projects() {
  const projects = await getProjects();

  return (
    <Section>
      <SectionTitle>My Projects</SectionTitle>

      <ul>
        {projects.map((project) => (
          <Project key={project.id} project={project} />
        ))}
      </ul>
    </Section>
  );
}

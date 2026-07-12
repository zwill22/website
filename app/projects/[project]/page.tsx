import { PageBreadcrumbs } from "@/components/ui/breadcrumbs";
import { Section } from "@/components/ui/section";
import { fetchProjects } from "@/lib/projects";
import { GitHubLink } from "@/components/links";
import { fetchReact } from "@/lib/markdown";

export async function generateStaticParams() {
  const projects = await fetchProjects();

  return projects.map((p) => {
    return { project: p.id };
  });
}

function GitHubPageLink(props: { project: string }) {
  const projectName = props.project.split("_")[0];
  const fullLink = `https://github.com/zwill22/${projectName}`;

  return (
    <GitHubLink
      href={fullLink}
      label="View on GitHub"
      aria-label="View page on GitHub"
    />
  );
}

export default async function ProjectPage(props: {
  params: Promise<{ project: string }>;
}) {
  const params = await props.params;

  const project = fetchReact(params.project);

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
  ];

  return (
    <Section>
      <div className="flex w-full">
        <PageBreadcrumbs
          crumbs={breadcrumbs}
          back="/projects"
          current="Current Project"
        />

        <GitHubPageLink project={params.project} />
      </div>

      <div className="w-full text-left">{project}</div>
    </Section>
  );
}

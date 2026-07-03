import { PageBreadcrumbs } from "@/components/ui/breadcrumbs";
import { Section } from "@/components/ui/section";
import { fetchProjectHTML } from "@/lib/projects";
import { GitHubLink } from "@/components/links";

function GitHubPageLink(props: { project: string }) {
  const projectName = props.project.split("_")[0];
  const fullLink = `https://github.com/zwill22/${projectName}`;

  return <GitHubLink href={fullLink} label="View on GitHub" />;
}

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
      <div className="flex w-full">
        <PageBreadcrumbs
          crumbs={breadcrumbs}
          back="/projects"
          current="Current Project"
        />

        <GitHubPageLink project={params.project} />
      </div>

      <div className="w-full text-left">{postHTML}</div>
    </Section>
  );
}

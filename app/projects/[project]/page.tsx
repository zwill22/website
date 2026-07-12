import { PageBreadcrumbs } from "@/components/ui/breadcrumbs";
import { Section } from "@/components/ui/section";
import { fetchProjects } from "@/lib/projects";
import { GitHubLink } from "@/components/links";
import { fetchMarkdownAsReact } from "@/lib/markdown";
import { FileData, getFileData } from "@/lib/filedata";

export async function generateStaticParams() {
  const projects = await fetchProjects();

  return projects.map((p) => {
    return { project: p.id };
  });
}

function GitHubPageLink(props: { filedata: FileData }) {
  const repoOwner = props.filedata.owner;
  const repoName = props.filedata.repo;
  const fullLink = `https://github.com/${repoOwner}/${repoName}`;

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

  const filedata = getFileData(params.project);

  const project = fetchMarkdownAsReact(filedata);

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

        <GitHubPageLink filedata={filedata} />
      </div>

      <div className="w-full text-left">{project}</div>
    </Section>
  );
}

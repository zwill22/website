import { PageBreadcrumbs } from "@/components/ui/breadcrumbs";
import { Section } from "@/components/ui/section";
import { fetchProjects, fetchReadme, RepoData } from "@/lib/projects";
import { GitHubLink } from "@/components/links";

export async function generateStaticParams() {
  const projects = await fetchProjects();

  return projects.map((p) => {
    return { project: p.id };
  });
}

function getRepoData(project: string): RepoData {
  const regex = /(\w.*?)_repos_(\w.*?)_(\w.*?)_path_(\w.*?)?_(\d+)/gm;

  const m = regex.exec(project);
  if (!m) {
    throw new Error("Invalid project code");
  }

  return {
    source: m[1],
    owner: m[2],
    repo: m[3],
    path: m[4],
    id: m[5],
  };
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

  const repoData = getRepoData(params.project);
  const postHTML = await fetchReadme(repoData);

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

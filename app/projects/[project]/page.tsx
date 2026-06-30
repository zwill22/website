import { PageBreadcrumbs } from "@/components/ui/breadcrumbs";
import { Section } from "@/components/ui/section";
import { fetchProjectHTML } from "@/lib/projects";
import { Link } from "@heroui/react";
import clsx from "clsx";

function GitHubLink(props: { project: string }) {
  const projectName = props.project.split("_")[0];
  const fullLink = `https://github.com/zwill22/${projectName}`;

  return (
    <div className="flex flex-col justify-center">
      <Link
        className={clsx(
          "flex py-1 px-2 rounded-md gap-2 bg-(--github-black)",
          "shadow shadow-foreground/50 hover:ring hover:ring-foreground",
          "hover:ring-offset-1 hover:ring-offset-background",
        )}
        href={fullLink}
        rel="noopener noreferrer"
        target="_blank"
      >
        <p
          className={clsx(
            "font-github text-white font-bold text-nowrap text-sm",
          )}
        >
          View on GitHub
        </p>
        <div className="text-white text-lg">
          <i className="bi bi-github" />
        </div>
      </Link>
    </div>
  );
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

        <GitHubLink project={params.project} />
      </div>

      <div className="w-full text-left">{postHTML}</div>
    </Section>
  );
}

import { PostSkeleton } from "@/components/code/skeletons";
import { PageBreadcrumbs } from "@/components/ui/breadcrumbs";
import { Section } from "@/components/ui/section";
import clsx from "clsx";

function GitHubLinkSkeleton() {
  return (
    <div className="flex flex-col justify-center">
      <div
        className={clsx(
          "flex gap-2 rounded-md bg-(--github-black) px-2 py-1",
          "shadow-foreground/20 shadow",
        )}
      >
        <p
          className={clsx(
            "font-github my-auto text-sm font-bold text-nowrap text-white",
          )}
        >
          View on GitHub
        </p>
        <div className="text-lg text-white">
          <i className="bi bi-github" />
        </div>
      </div>
    </div>
  );
}

export default function ProjectsLoadingPage() {
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

        <GitHubLinkSkeleton />
      </div>

      <PostSkeleton />
    </Section>
  );
}

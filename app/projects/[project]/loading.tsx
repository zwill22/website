import { PostSkeleton } from "@/components/markdown/skeletons";
import { PageBreadcrumbs } from "@/components/ui/breadcrumbs";
import { Section } from "@/components/ui/section";
import clsx from "clsx";

function GitHubLinkSkeleton() {
  return (
    <div className="flex flex-col justify-center">
      <div
        className={clsx(
          "flex py-1 px-2 rounded-md gap-2 bg-(--github-black)",
          "shadow shadow-foreground/20",
        )}
      >
        <p
          className={clsx(
            "font-github text-white font-bold text-nowrap text-sm my-auto",
          )}
        >
          View on GitHub
        </p>
        <div className="text-white text-lg">
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
      <div className="flex w-full max-w-4xl">
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

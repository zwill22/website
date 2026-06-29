import { PageBreadcrumbs } from "@/components/ui/breadcrumbs";
import { Section } from "@/components/ui/section";
import { Skeleton } from "@heroui/react";
import clsx from "clsx";

export function FullImageSkeleton() {
  return (
    <Skeleton
      className={clsx(
        "w-full aspect-video border border-foreground/10 rounded-lg shadow shadow-foreground/20",
        "bg-foreground/20",
      )}
    />
  );
}

function ParagraphSkeleton(props: { className?: string; length: number }) {
  return (
    <div className={props.className}>
      {Array.from({ length: props.length }).map((_, index) => (
        <Skeleton
          key={index}
          className="bg-foreground/15 h-4 w-full rounded my-2 md:my-4"
        />
      ))}
      <Skeleton className="bg-foreground/15 h-4 w-3/4 rounded my-2 md:my-4" />
    </div>
  );
}

export function PostSkeleton() {
  return (
    <>
      <div className="flex flex-col w-full p-2">
        <Skeleton className="bg-foreground/20 h-8 w-full rounded p-2 my-2 md:my-4" />
        <Skeleton className="bg-foreground/20 h-8 w-3/4 rounded p-2 my-2 md:my-4" />

        <Skeleton className="bg-foreground/10 h-4 w-1/3 rounded my-2 md:my-4" />
        <ParagraphSkeleton length={12} />
        <ParagraphSkeleton className="hidden md:inline" length={6} />
      </div>
    </>
  );
}

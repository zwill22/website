import { Skeleton } from "@heroui/react";
import clsx from "clsx";

export function PreviewImageSkeleton() {
  return (
    <Skeleton
      className={clsx(
        "h-full w-full border border-foreground/10 rounded-lg shadow shadow-foreground/20",
        "bg-background justify-center",
      )}
    />
  );
}

export function MenuItemSkeleton(props: { key: number }) {
  return (
    <div
      key={props.key}
      className={clsx(
        "flex max-w-200 items-center gap md:gap-4 border border-foreground/10 rounded-xl shadow-foreground/20",
        "bg-background px-2 lg:px-4 my-2 transition-colors mx-auto max-h-28 md:max-h-52",
      )}
    >
      <PreviewImageSkeleton />

      <div className="flex flex-col w-3/4 md:p-4 gap-2">
        <div>
          <Skeleton className="bg-foreground/20 h-3 w-full rounded p-2 my-2 md:my-4" />
          <Skeleton className="bg-foreground/20 h-3 w-1/2 rounded p-2 my-2 md:my-4" />
        </div>
        <Skeleton className="bg-foreground/10 h-2 w-1/3 rounded my-2" />
        <div className="hidden md:inline">
          <Skeleton className="bg-foreground/15 h-2 w-full rounded my-2" />
          <Skeleton className="bg-foreground/15 h-2 w-full rounded my-2" />
          <Skeleton className="bg-foreground/15 h-2 w-full rounded my-2" />
        </div>
      </div>
    </div>
  );
}

export function ListSkeleton(props: { length: number }) {
  return (
    <div>
      {Array.from({ length: props.length }).map((_, index) => (
        <MenuItemSkeleton key={index} />
      ))}
    </div>
  );
}

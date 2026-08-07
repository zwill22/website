import { Skeleton } from "@heroui/react";
import clsx from "clsx";

export function PreviewImageSkeleton() {
  return (
    <Skeleton
      className={clsx(
        "border-foreground/10 shadow-foreground/20 h-24 w-1/4 rounded-lg border shadow md:h-44",
        "bg-background justify-center px-2",
      )}
    />
  );
}

export function MenuItemSkeleton(props: { id: number }) {
  return (
    <div
      key={props.id}
      className={clsx(
        "border-foreground/10 shadow-foreground/20 rounded-xl border shadow",
        "bg-foreground/5 hover:shadow-foreground/30 w-full transition-colors",
      )}
    >
      <div className="flex h-28 w-full gap-2 p-2 md:h-52 md:gap-4 md:p-4">
        <PreviewImageSkeleton />

        <div className="flex w-3/4 flex-col gap-2">
          <div className="h-10 md:h-18">
            <Skeleton className="bg-foreground/20 my-2 h-3 w-full rounded p-2 md:my-4" />
            <Skeleton className="bg-foreground/20 my-2 h-3 w-1/2 rounded p-2 md:my-4" />
          </div>
          <div className="my-auto h-8">
            <Skeleton className="bg-foreground/10 my-3 h-2 w-1/3 rounded" />
          </div>
          <div className="my-auto hidden h-18 md:inline">
            <Skeleton className="bg-foreground/15 my-2 h-2 w-full rounded" />
            <Skeleton className="bg-foreground/15 my-2 h-2 w-full rounded" />
            <Skeleton className="bg-foreground/15 my-2 h-2 w-full rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ListSkeleton(props: { length: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 p-2 md:p-4">
      {Array.from({ length: props.length }).map((_, index) => (
        <MenuItemSkeleton key={index} id={index} />
      ))}
    </div>
  );
}

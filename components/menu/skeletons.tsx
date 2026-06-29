import { Skeleton } from "@heroui/react";
import clsx from "clsx";

export function PreviewImageSkeleton() {
  return (
    <Skeleton
      className={clsx(
        "h-24 md:h-44 w-1/4 border border-foreground/10 rounded-lg shadow shadow-foreground/20",
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
        "border border-foreground/10 rounded-xl shadow shadow-foreground/20",
        "bg-foreground/5 transition-colors hover:shadow-foreground/30 w-full",
      )}
    >
      <div className="flex gap-2 md:gap-4 p-2 md:p-4 h-28 md:h-52 w-full">
        <PreviewImageSkeleton />

        <div className="flex flex-col w-3/4 gap-2">
          <div className="h-10 md:h-18">
            <Skeleton className="bg-foreground/20 h-3 w-full rounded p-2 my-2 md:my-4" />
            <Skeleton className="bg-foreground/20 h-3 w-1/2 rounded p-2 my-2 md:my-4" />
          </div>
          <div className="h-8 my-auto">
            <Skeleton className="bg-foreground/10 h-2 w-1/3 rounded my-3" />
          </div>
          <div className="hidden md:inline h-18 my-auto">
            <Skeleton className="bg-foreground/15 h-2 w-full rounded my-2" />
            <Skeleton className="bg-foreground/15 h-2 w-full rounded my-2" />
            <Skeleton className="bg-foreground/15 h-2 w-full rounded my-2" />
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

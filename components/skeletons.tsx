import { Card, ScrollShadow, Skeleton } from "@heroui/react";
import clsx from "clsx";

export function PreviewMenuItemSkeleton(props: {
  key: string;
  imageClass: string;
  titleLength: number;
}) {
  return (
    <div
      className={clsx(
        "flex min-w-60 flex-col md:min-w-5/12",
        props.titleLength == 1
          ? "h-76 w-90 md:h-91 lg:h-111"
          : "h-88 md:h-102 lg:h-122",
      )}
    >
      <div
        className={clsx(
          "border-foreground/10 shadow-foreground/20 rounded-xl border shadow",
          "bg-foreground/5 h-full transition-colors",
        )}
      >
        <div className="flex h-full flex-col gap-2 p-2 md:p-4">
          <div className={props.imageClass}>
            <div className="relative flex h-full w-full flex-col justify-center p-4">
              <Skeleton
                className={clsx(
                  "border-foreground/10 shadow-foreground/20 h-full w-full rounded-lg border shadow",
                  "bg-background justify-center",
                )}
              />
            </div>
          </div>

          <div className="my-2 flex flex-col">
            <div className="flex flex-col gap-2 py-2">
              {Array.from({ length: props.titleLength - 1 }).map((_, idx) => (
                <Skeleton
                  className="h-2 w-full md:h-4"
                  key={`preview-menu-item-${idx}`}
                />
              ))}
              <Skeleton className="h-2 w-3/4 md:h-4" />
            </div>
            <Skeleton className="my-2 h-2 w-1/2" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function PreviewMenuSkeleton(props: { length: number }) {
  return (
    <div className="flex h-fit w-full flex-col">
      <Card className="light:bg-purple-50/90 shadow-foreground/50 h-full p-2 shadow dark:bg-(--purple-black)/90">
        <ScrollShadow className="flex-1 p-4" orientation="horizontal">
          <div className="flex h-full flex-row gap-4">
            {Array.from({ length: 4 }).map((_, idx) => (
              <PreviewMenuItemSkeleton
                key={`${idx}`}
                imageClass={clsx(
                  "w-full",
                  props.length == 1 ? "h-8/10" : "h-7/10",
                )}
                titleLength={props.length}
              />
            ))}
          </div>
        </ScrollShadow>
      </Card>
    </div>
  );
}

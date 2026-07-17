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
        "flex flex-col min-w-60 md:min-w-5/12",
        props.titleLength == 1
          ? "w-90 h-76 md:h-91 lg:h-111"
          : "h-88 md:h-102 lg:h-122",
      )}
    >
      <div
        className={clsx(
          "border border-foreground/10 rounded-xl shadow shadow-foreground/20",
          "bg-foreground/5 transition-colors h-full",
        )}
      >
        <div className="flex flex-col gap-2 p-2 md:p-4 h-full">
          <div className={props.imageClass}>
            <div className="flex flex-col h-full w-full relative justify-center p-4">
              <Skeleton
                className={clsx(
                  "h-full w-full border border-foreground/10 rounded-lg shadow shadow-foreground/20",
                  "bg-background justify-center",
                )}
              />
            </div>
          </div>

          <div className="flex flex-col my-2">
            <div className="flex flex-col gap-2 py-2">
              {Array.from({ length: props.titleLength - 1 }).map((_, idx) => (
                <Skeleton className="h-2 md:h-4 w-full"  key={`preview-menu-item-${idx}`}/>
              ))}
              <Skeleton className="h-2 md:h-4 w-3/4" />
            </div>
            <Skeleton className="h-2 my-2 w-1/2" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function PreviewMenuSkeleton(props: { length: number }) {
  return (
    <div className="w-full flex flex-col h-fit">
      <Card className="h-full p-2 light:bg-purple-50/90 dark:bg-(--purple-black)/90 shadow shadow-foreground/50">
        <ScrollShadow className="p-4 flex-1" orientation="horizontal">
          <div className="flex flex-row h-full gap-4">
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

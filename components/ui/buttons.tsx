import { Bars4Icon } from "@heroicons/react/24/solid";
import { Button } from "@heroui/react";
import clsx from "clsx";

export function MenuButton() {
  return (
    <Button
      className={clsx(
        "bg-background border-foreground/10 text-foreground mx-auto rounded-md border px-2",
        "hover:bg-foreground/10 hover:shadow-foreground/10 transition-colors hover:shadow",
        "focus-visible:ring-foreground focus-visible:ring-offset-background",
      )}
    >
      <div className="m-0 flex size-6 flex-col justify-center gap-0 p-0">
        <Bars4Icon />
      </div>
    </Button>
  );
}

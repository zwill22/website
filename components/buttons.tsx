import { Bars4Icon } from "@heroicons/react/24/solid";
import { Button } from "@heroui/react";
import clsx from "clsx";

export function MenuButton() {
  return (
    <Button className={clsx(
        "rounded-md bg-background border border-foreground/10 text-foreground px-2 mx-auto",
        "hover:bg-foreground/10 hover:shadow hover:shadow-foreground/10"
        )}>
      <div className="flex flex-col justify-center size-6 p-0 m-0 gap-0">
        <Bars4Icon />
      </div>
    </Button>
  );
}

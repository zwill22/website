import { useTheme } from "next-themes";
import clsx from "clsx";

import { SunFilledIcon, MoonFilledIcon } from "@/components/icons";
import { Button } from "@heroui/react";

export function ThemeSwitch(props: { className?: string }) {
  const { setTheme, resolvedTheme } = useTheme();

  const isLight = resolvedTheme === "light";

  const handleToggle = () => {
    setTheme(isLight ? "dark" : "light");
  };

  return (
    <Button
      aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
      className={clsx(
        "px-1 transition-opacity hover:opacity-60 cursor-pointer",
        "inline-flex items-center justify-center",
        "w-auto h-auto bg-transparent rounded-lg text-foreground",
        "focus-visible:ring-foreground focus-visible:ring-offset-background",
        props.className,
      )}
      onClick={handleToggle}
    >
      {isLight ? (
        <SunFilledIcon className="text-xl" />
      ) : (
        <MoonFilledIcon className="text-xl" />
      )}
    </Button>
  );
}

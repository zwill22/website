"use client";

import { useTheme } from "next-themes";
import clsx from "clsx";

import { SunFilledIcon, MoonFilledIcon } from "@/components/ui/icons";
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
        "cursor-pointer px-1 transition-opacity hover:opacity-60",
        "inline-flex items-center justify-center",
        "text-foreground h-auto w-auto rounded-lg bg-transparent",
        "focus-visible:ring-foreground focus-visible:ring-offset-background",
        props.className,
      )}
      onPress={handleToggle}
    >
      {isLight ? (
        <SunFilledIcon className="text-xl" />
      ) : (
        <MoonFilledIcon className="text-xl" />
      )}
    </Button>
  );
}

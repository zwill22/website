"use client";

import { Button } from "@heroui/react";
import clsx from "clsx";
import { ReactNode } from "react";

export function CodeBlock(props: { children: ReactNode }) {
  return (
    <pre
      className={clsx(
        "relative flex grow w-full p-2 overflow-x-scroll z-0 hljs rounded-lg",
        "pr-10 shadow shadow-foreground/50 my-2 md:my-4",
      )}
    >
      {props.children}
      <Button
        className={clsx(
          "absolute bg-white/10 shadow shadow-white/50 cursor-pointer top-0 right-0",
          "px-3 py-0 mr-4 my-2.5 z-2 rounded-lg hover:bg-white/20 hover:shadow-white",
          "hover:text-bold",
        )}
        onClick={() => {}} // TODO Add copy function
      >
        <div>
          <i className="bi bi-clipboard" />
        </div>
      </Button>
    </pre>
  );
}

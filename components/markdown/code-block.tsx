"use client";

import { Button } from "@heroui/react";
import clsx from "clsx";
import { ReactNode, useState } from "react";
import { renderToString } from "react-dom/server";
import { htmlToText } from "html-to-text";

function CopyButton(props: { children: ReactNode }) {
  const [isCopied, setIsCopied] = useState(false);
  const [isOk, setIsOk] = useState(true);

  const copyToClipboard = async (children: ReactNode) => {
    const stream = renderToString(children); // TODO change function

    const formattedText = await new Response(stream).text();

    const plainText = htmlToText(formattedText);

    try {
      await navigator.clipboard.writeText(plainText);
      setIsCopied(true);
    } catch (error) {
      setIsOk(false);
    }

    setTimeout(() => {
      setIsCopied(false);
      setIsOk(true);
    }, 1500);
  };

  return (
    <Button
      className={clsx(
        "absolute bg-white/90 dark:bg-white/10 shadow shadow-white/50 cursor-pointer top-0 right-0",
        "px-3 py-0 mr-4 my-2.5 z-2 rounded-lg hover:bg-white/80 dark:hover:bg-white/20 hover:shadow-white",
        "hover:text-bold border border-white/90 dark:border-white/10 hover:border-white/10",
      )}
      onPress={() => copyToClipboard(props.children)}
    >
      <div>
        {isOk ? (
          isCopied ? (
            <i className="bi bi-check-circle text-black dark:text-white" />
          ) : (
            <i className="bi bi-clipboard text-black dark:text-white" />
          )
        ) : (
          <i className="bi bi-x-circle text-black dark:text-white" />
        )}
      </div>
    </Button>
  );
}

export function CodeBlock(props: { children: ReactNode }) {
  return (
    <pre
      className={clsx(
        "relative flex grow w-full p-2 overflow-x-scroll z-0 hljs rounded-lg",
        "pr-10 shadow shadow-foreground my-2 md:my-4",
      )}
    >
      {props.children}
      <CopyButton {...props} />
    </pre>
  );
}

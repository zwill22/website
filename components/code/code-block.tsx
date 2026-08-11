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
    } catch {
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
        "light:bg-white/90 absolute top-0 right-0 cursor-pointer shadow shadow-white/50 dark:bg-white/10",
        "z-2 my-2.5 mr-4 rounded-lg px-3 py-0 hover:bg-white/80 hover:shadow-white dark:hover:bg-white/20",
        "hover:text-bold light:border-white/90 border hover:border-white/10 dark:border-white/10",
      )}
      onPress={() => copyToClipboard(props.children)}
    >
      <div>
        {isOk ? (
          isCopied ? (
            <i className="bi bi-check-circle light:text-black dark:text-white" />
          ) : (
            <i className="bi bi-clipboard light:text-black dark:text-white" />
          )
        ) : (
          <i className="bi bi-x-circle light:text-black dark:text-white" />
        )}
      </div>
    </Button>
  );
}

export function CodeBlock(props: { children: ReactNode }) {
  return (
    <pre
      className={clsx(
        "hljs relative z-0 flex w-full grow overflow-x-scroll rounded-lg p-2",
        "shadow-foreground my-2 pr-10 shadow md:my-4",
      )}
    >
      {props.children}
      <CopyButton {...props} />
    </pre>
  );
}

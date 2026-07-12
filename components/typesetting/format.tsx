import {
  ArrowRightCircleIcon,
  ArrowRightIcon,
  ChevronDoubleRightIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { Typography, TypographyProps } from "@heroui/react";
import clsx from "clsx";
import { ReactNode } from "react";
import { Link as HeroLink } from "@heroui/react";
import Image, { ImageProps } from "next/image";
import { isBadge } from "is-badge";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export function Heading(props: TypographyProps) {
  return (
    <Typography
      type="h1"
      align={props.align ?? "start"}
      weight={props.weight ?? "normal"}
      className="font-heading flex w-full grow py-4 text-5xl text-pretty md:py-8 md:text-6xl"
    >
      {props.children}
    </Typography>
  );
}

export function Subheading(props: TypographyProps) {
  return (
    <Typography
      type="h2"
      align={props.align ?? "start"}
      weight={props.weight ?? "normal"}
      className="font-heading w-full grow py-3 text-2xl text-pretty md:py-6 md:text-3xl"
    >
      {props.children}
    </Typography>
  );
}

export function MinorHeading(props: TypographyProps) {
  return (
    <Typography
      type="h3"
      align={props.align ?? "start"}
      weight={props.weight ?? "normal"}
      className="font-heading w-full grow py-2 text-xl text-pretty md:py-4 md:text-2xl"
    >
      {props.children}
    </Typography>
  );
}

export function Paragraph(props: TypographyProps) {
  return (
    <Typography
      className={clsx(
        "w-full grow py-2 text-pretty md:text-lg",
        props.className,
      )}
      type="body"
      align={props.align ?? "justify"}
      weight={props.weight ?? "normal"}
    >
      {props.children}
    </Typography>
  );
}

export function Code(props: {
  children?: ReactNode;
  className?: string;
  inline: string;
}) {
  const inline = props.inline == "true";

  return (
    <Typography
      className={clsx(
        "hljs shrink font-mono not-italic",
        inline ? "shadow-foreground/50 rounded-lg shadow" : "p-0 text-pretty",
        props.className,
      )}
      type="code"
      align="start"
      weight="normal"
    >
      {props.children}
    </Typography>
  );
}

function checkBadge(src: string | StaticImport) {
  if (typeof src !== "string") {
    return false;
  }

  return (
    isBadge(src) ||
    src.startsWith("https://custom-icon-badges.demolab.com/badge/") ||
    src.match(
      /https:\/\/readthedocs\.org\/projects\/\w+\/badge\/\?version=\w+/,
    ) !== null ||
    src.match(
      /https:\/\/github\.com\/\w+\/\w+\/actions\/workflows\/[\w-\.]+\/badge\.svg/,
    ) !== null
  );
}

export function Img(props: ImageProps) {
  const badge = checkBadge(props.src);

  return (
    <div className="max-w-full shrink py-2">
      {
        // eslint-disable-next-line jsx-a11y/alt-text
        <Image
          className="shadow-foreground mx-auto shadow"
          loading="lazy"
          unoptimized={badge}
          {...props}
        />
      }
    </div>
  );
}

export function List(props: { children: ReactNode }) {
  return <div className="flex flex-col gap-4 p-4">{props.children}</div>;
}

export function ListItem(props: { children: ReactNode; depth: number }) {
  return (
    <div className="flex gap-2">
      <div className="flex size-6 h-12 flex-none justify-center py-2">
        {props.depth === 1 ? (
          <ArrowRightCircleIcon />
        ) : props.depth === 2 ? (
          <ChevronRightIcon />
        ) : props.depth == 3 ? (
          <ChevronDoubleRightIcon />
        ) : (
          <ArrowRightIcon />
        )}
      </div>
      <div className="leading-12">{props.children}</div>
    </div>
  );
}

export function Link(props: {
  children: ReactNode;
  href: string;
  inline: string;
  external: string;
}) {
  const inline = props.inline === "true";
  const external = props.external === "true";

  const rel = external ? "noopener noreferrer" : undefined;
  const target = external ? "_blank" : undefined;

  return (
    <HeroLink
      className={clsx(
        "text-purple-800 underline dark:text-purple-300",
        "hover:text-purple-600 dark:hover:text-purple-500",
        "hover:shadow-background hover:shadow",
      )}
      href={props.href}
      rel={rel}
      target={target}
    >
      {inline ? <span>{props.children}</span> : props.children}
    </HeroLink>
  );
}

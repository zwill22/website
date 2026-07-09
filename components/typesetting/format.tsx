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

export function Heading(props: TypographyProps) {
  return (
    <Typography
      type="h1"
      align={props.align ?? "start"}
      weight={props.weight ?? "normal"}
      className="flex grow w-full text-5xl md:text-6xl font-heading py-4 md:py-8 text-pretty"
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
      className="grow w-full text-2xl md:text-3xl font-heading py-3 md:py-6 text-pretty"
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
      className="grow w-full text-xl md:text-2xl font-heading py-2 md:py-4 text-pretty"
    >
      {props.children}
    </Typography>
  );
}

export function Paragraph(props: TypographyProps) {
  return (
    <Typography
      className={clsx(
        "grow md:text-lg py-2 w-full text-pretty",
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
  inline: boolean;
}) {
  return (
    <Typography
      className={clsx(
        "shrink font-mono hljs not-italic",
        props.inline
          ? "rounded-lg shadow shadow-foreground/50"
          : "p-0 text-pretty",
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

export function Img(props: ImageProps) {
  return (
      <div className="max-w-full shrink py-2">
        <Image
          className="mx-auto shadow shadow-foreground"
          alt={props.alt}
          title={props.title}
          src={props.src}
          width={props.width}
          height={props.height}
          loading="lazy"
        />
      </div>
  );
}

export function List(props: { children: ReactNode }) {
  return <div className="flex flex-col gap-4 p-4">{props.children}</div>;
}

export function ListItem(props: { children: ReactNode; depth: number }) {
  return (
    <div className="flex gap-2">
      <div className="flex-none size-6 py-2 h-12 flex justify-center">
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
  inline: boolean;
}) {
  return (
    <HeroLink
      className={clsx(
        "text-purple-800 dark:text-purple-300 underline",
        "hover:text-purple-600 dark:hover:text-purple-500",
        "hover:shadow hover:shadow-background",
      )}
      href={props.href}
    >
      {props.inline ? <span>{props.children}</span> : props.children}
    </HeroLink>
  );
}

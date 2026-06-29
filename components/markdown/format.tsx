import {
  ArrowRightCircleIcon,
  ChevronDoubleRightIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { Skeleton, Typography } from "@heroui/react";
import clsx from "clsx";
import { ReactNode, Suspense } from "react";
import { Link as HeroLink } from "@heroui/react";

export function Heading(props: {
  children?: ReactNode;
  align?: any;
  weight?: any;
}) {
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

export function Subheading(props: {
  children?: ReactNode;
  align?: any;
  weight?: any;
}) {
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

export function MinorHeading(props: {
  children?: ReactNode;
  align?: any;
  weight?: any;
}) {
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

export function Paragraph(props: {
  children?: ReactNode;
  align?: any;
  weight?: any;
}) {
  return (
    <Typography
      className="grow md:text-lg py-2 w-full text-pretty"
      type="body"
      align={props.align ?? "justify"}
      weight={props.weight ?? "normal"}
    >
      {props.children}
    </Typography>
  );
}

export function Code(props: { children?: ReactNode; className?: string }) {
  return (
    <Typography
      className={clsx(
        "shrink font-mono hljs p-0 not-italic text-pretty",
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

interface ImageProps {
  alt: string;
  title: string;
  width: number;
  height: number;
  src: string;
}

function ImageSkeleton(props: ImageProps) {
  return (
    <div className="flex w-full">
      <Skeleton
        className="rounded max-h-100"
        aria-label={props.alt}
        title={props.title}
      />
    </div>
  );
}

export function Image(props: ImageProps) {
  return (
    <Suspense fallback={<ImageSkeleton {...props} />}>
      <div className="max-w-full shrink py-2">
        <img
          className="mx-auto shadow shadow-foreground"
          alt={props.alt}
          title={props.title}
          src={props.src}
          width={props.width}
          height={props.height}
          loading="lazy"
        />
      </div>
    </Suspense>
  );
}

export function List(props: { children: ReactNode }) {
  return <div className="flex flex-col gap-4 p-4">{props.children}</div>;
}

export function ListItem(props: { children: ReactNode; depth: number }) {
  return (
    <div className="flex gap-2 align-top">
      <div className="flex flex-col size-5 justify-center h-8">
        {props.depth === 1 ? (
          <ArrowRightCircleIcon />
        ) : props.depth === 2 ? (
          <ChevronRightIcon />
        ) : (
          <ChevronDoubleRightIcon />
        )}
      </div>
      <p className="md:text-lg justify-start leading-8">{props.children}</p>
    </div>
  );
}

export function Link(props: { children: ReactNode; href: string }) {
  return (
    <HeroLink
      className={clsx(
        "text-purple-800 dark:text-purple-300 underline",
        "hover:text-purple-600 dark:hover:text-purple-500",
        "hover:shadow hover:shadow-background",
      )}
      href={props.href}
    >
      {props.children}
    </HeroLink>
  );
}

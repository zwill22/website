import { Skeleton, Typography } from "@heroui/react";
import clsx from "clsx";
import { ReactNode, Suspense } from "react";

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
      className="flex grow w-full text-5xl md:text-6xl font-heading p-2 text-pretty"
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

function BlogImageSkeleton(props: ImageProps) {
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

export function BlogImage(props: ImageProps) {
  return (
    <Suspense fallback={<BlogImageSkeleton {...props} />}>
      <div className="w-full shrink">
        <img
          className="mx-auto"
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

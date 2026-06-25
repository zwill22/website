import { Typography } from "@heroui/react";
import { ReactNode } from "react";

export function Section(props: { children?: ReactNode }) {
  return (
    <section className="flex justify-center mx-auto py-8 md:py-10">
      <div className="flex flex-col w-full max-w-4xl gap-2 items-center">
        {props.children}
      </div>
    </section>
  );
}

export function SectionTitle(props: {
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

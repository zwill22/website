import { ReactNode } from "react";

export function Section(props: { children?: ReactNode }) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      {props.children}
    </section>
  );
}

export function SectionTitle(props: { children?: ReactNode }) {
  return <h1 className="text-5xl md:text-6xl font-heading p-2">{props.children}</h1>;
}

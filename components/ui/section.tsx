import { ReactNode } from "react";

export function Section(props: { children?: ReactNode }) {
  return (
    <section className="mx-auto flex justify-center">
      <div className="flex w-full max-w-4xl flex-col items-center gap-2">
        {props.children}
      </div>
    </section>
  );
}

export function SectionTitle(props: { children?: ReactNode }) {
  return (
    <h1 className="font-heading p-2 text-5xl md:text-6xl">{props.children}</h1>
  );
}

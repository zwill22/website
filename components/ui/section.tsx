import { ReactNode } from "react";

export function Section(props: { children?: ReactNode }) {
  return (
    <section className="flex justify-center mx-auto">
      <div className="flex flex-col w-full max-w-4xl gap-2 items-center">
        {props.children}
      </div>
    </section>
  );
}

export function SectionTitle(props: { children?: ReactNode }) {
  return (
    <h1 className="text-5xl md:text-6xl font-heading p-2">{props.children}</h1>
  );
}

"use client";

import { Section, SectionTitle } from "@/components/ui/section";
import { useEffect } from "react";

export default function ErrorPage({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <Section>
      <SectionTitle>Something went wrong!</SectionTitle>
      <p className="text-xl">{error.message}</p>
    </Section>
  );
}

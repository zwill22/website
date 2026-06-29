import { PageBreadcrumbs } from "@/components/ui/breadcrumbs";
import { Section, SectionTitle } from "@/components/ui/section";

export default function About() {
  const crumbs = [{ name: "Home", href: "/" }];

  return (
    <Section>
      <PageBreadcrumbs crumbs={crumbs} back="/" current="About" />
      <SectionTitle>About Me</SectionTitle>

      <p>Information about me, myself, and I</p>
    </Section>
  );
}

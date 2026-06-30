import { PageBreadcrumbs } from "@/components/ui/breadcrumbs";
import { Section, SectionTitle } from "@/components/ui/section";

export default function CV() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
  ];

  return (
    <Section>
      <PageBreadcrumbs crumbs={crumbs} back="/about" current="CV" />
      <SectionTitle>CV</SectionTitle>

      <p>My CV</p>
    </Section>
  );
}

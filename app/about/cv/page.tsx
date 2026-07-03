import { Heading } from "@/components/typesetting/format";
import { PageBreadcrumbs } from "@/components/ui/breadcrumbs";
import { Section } from "@/components/ui/section";
import { fetchCV } from "@/lib/cv";
import { ContactLinks, CVPdfLink } from "@/components/links";

function CVHeader() {
  return (
    <>
      <Heading>Zack M Williams PhD</Heading>
      <ContactLinks />
    </>
  );
}

export default async function CV() {
  const cvComponent = await fetchCV();

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
  ];

  return (
    <Section>
      <div className="flex w-full">
        <PageBreadcrumbs crumbs={crumbs} back="/about" current="CV" />
        <CVPdfLink />
      </div>

      <CVHeader />

      <div className="w-full text-left">{cvComponent}</div>
    </Section>
  );
}

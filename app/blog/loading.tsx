import { ListSkeleton } from "@/components/menu/skeletons";
import { PageBreadcrumbs } from "@/components/ui/breadcrumbs";
import { Section, SectionTitle } from "@/components/ui/section";

export default async function Projects() {

  const breadcrumbs = [{ name: "Home", href: "/" }];

  return (
    <Section>
      <PageBreadcrumbs crumbs={breadcrumbs} back="/" current="Blog" />
      <SectionTitle>Blog Posts</SectionTitle>

      <div className="w-full">
        <ListSkeleton length={4} />
      </div>
    </Section>
  );
}

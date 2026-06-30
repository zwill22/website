import { ListSkeleton } from "@/components/menu/skeletons";
import { PageBreadcrumbs } from "@/components/ui/breadcrumbs";
import { Section, SectionTitle } from "@/components/ui/section";

export default function ProjectsLoadingPage() {

  const breadcrumbs = [{ name: "Home", href: "/" }];

  return (
    <Section>
      <PageBreadcrumbs crumbs={breadcrumbs} back="/" current="Projects" />
      <SectionTitle>My Projects</SectionTitle>

      <div className="w-full">
        <ListSkeleton length={4} />
      </div>
    </Section>
  );
}

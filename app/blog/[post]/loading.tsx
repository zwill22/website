import { PostSkeleton } from "@/components/code/skeletons";
import { PageBreadcrumbs } from "@/components/ui/breadcrumbs";
import { Section } from "@/components/ui/section";

export default function BlogLoadingPage() {
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <Section>
      <PageBreadcrumbs
        crumbs={breadcrumbs}
        back="/blog"
        current="Current Post"
      />

      <PostSkeleton />
    </Section>
  );
}

import { Section, SectionTitle } from "@/components/ui/section";
import { fetchBlogPosts } from "@/lib/blogs";
import { ListMenu } from "@/components/menu/menu-list";
import { PageBreadcrumbs } from "@/components/ui/breadcrumbs";
import { Paragraph } from "@/components/react/format";
import { Suspense } from "react";
import { ListSkeleton } from "@/components/menu/skeletons";

async function BlogList() {
  const posts = await fetchBlogPosts();

  return <ListMenu items={posts} href="/blog" />;
}

export default function BlogMenu() {
  const crumbs = [{ name: "Home", href: "/" }];

  return (
    <Section>
      <PageBreadcrumbs crumbs={crumbs} back="/" current="Blog" />
      <SectionTitle>Blog Posts</SectionTitle>

      <Paragraph className="w-full px-2 md:px-4">
        One of the primary reasons for setting up this site was for their to be
        somewhere where I could write articles about any topic. Though I do this
        infrequently, having somewhere to put these would give me more reason to
        write.
      </Paragraph>

      <div className="w-full">
        <Suspense fallback={<ListSkeleton length={4} />}>
          <BlogList />
        </Suspense>
      </div>
    </Section>
  );
}

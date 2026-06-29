import { Section, SectionTitle } from "@/components/ui/section";
import { fetchBlogPosts } from "@/lib/blogs";
import { ListMenu } from "@/components/menu/menu-list";
import { PageBreadcrumbs } from "@/components/ui/breadcrumbs";

export default async function BlogMenu() {
  const posts = await fetchBlogPosts();
  const crumbs = [{ name: "Home", href: "/" }];

  return (
    <Section>
      <PageBreadcrumbs crumbs={crumbs} back="/" current="Blog" />
      <SectionTitle>Blog Posts</SectionTitle>
      <div className="w-full">
        <ListMenu items={posts} href="/blog" />
      </div>
    </Section>
  );
}

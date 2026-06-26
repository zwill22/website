import { Section, SectionTitle } from "@/components/ui/section";
import { fetchBlogPosts } from "@/lib/blogs";
import { ListMenu } from "@/components/menu/menu-list";

export default async function BlogMenu() {
  const posts = await fetchBlogPosts();

  return (
    <Section>
      <SectionTitle>Blog Posts</SectionTitle>
      <div className="w-full">
        <ListMenu items={posts} href="/blog" />
      </div>
    </Section>
  );
}

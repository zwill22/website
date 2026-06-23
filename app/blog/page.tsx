import { BlogPost } from "@/components/blog";
import { Section, SectionTitle } from "@/components/section";
import { fetchBlogPosts } from "@/lib/blogs";
import { ScrollShadow } from "@heroui/react";
import { BlogPostSkeleton, ListSkeleton } from "@/components/skeletons";
import { Suspense } from "react";

export default async function Blog() {
  const posts = await fetchBlogPosts();

  return (
    <Section>
      <SectionTitle>Blog Posts</SectionTitle>

      <Suspense fallback={<ListSkeleton />}>
        <ScrollShadow>
          <div className="w-full p-2">
            {posts.map((post) => (
              <BlogPost key={post.id} post={post} />
            ))}
            {Array.from({length: 3}).map((_, index) => (
                <BlogPostSkeleton key={index} />
            ))}
          </div>
        </ScrollShadow>
      </Suspense>
    </Section>
  );
}

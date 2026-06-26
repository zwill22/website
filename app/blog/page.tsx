import { BlogPost } from "@/components/blog-menu";
import { Section, SectionTitle } from "@/components/section";
import { fetchBlogPosts } from "@/lib/blogs";
import { ListSkeleton } from "@/components/skeletons";
import { Suspense } from "react";

export default async function BlogMenu() {
  const posts = await fetchBlogPosts();

  return (
    <Section>
      <SectionTitle>Blog Posts</SectionTitle>
      <div className="w-full">
        <Suspense fallback={<ListSkeleton length={4}/>}>
          <div className="grid grid-cols-1 gap-4 p-2 md:p-4">
            {posts.map((post) => (
              <BlogPost key={post.id} post={post} />
            ))}
          </div>
        </Suspense>
      </div>
    </Section>
  );
}

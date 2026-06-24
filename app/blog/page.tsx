import { BlogPost } from "@/components/blog";
import { Section, SectionTitle } from "@/components/section";
import { fetchBlogPosts } from "@/lib/blogs";
import { ListSkeleton } from "@/components/skeletons";
import { Suspense } from "react";

export default async function Blog() {
  const posts = await fetchBlogPosts();

  return (
    <Section>
      <SectionTitle>Blog Posts</SectionTitle>
      <div className="w-full">
        <Suspense fallback={<ListSkeleton length={4}/>}>
          <div>
            {posts.map((post) => (
              <BlogPost key={post.id} post={post} />
            ))}
          </div>
        </Suspense>
      </div>
    </Section>
  );
}

import { Section } from "@/components/ui/section";
import { fetchPostHTML } from "@/lib/blogs";

export default async function BlogPage(props: {
  params: Promise<{ post: string }>;
}) {
  const params = await props.params;
  const postHTML = await getPostHTML(params.post);

  return (
    <Section>
      <div className="max-w-4xl w-full text-left">{postHTML}</div>
    </Section>
  );
}

import { Section, SectionTitle } from "@/components/section";

async function getPost(postName: string) {
  return {
    title: "Post title",
    content: "Post content",
  };
}

export default async function Post(props: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await props.params;
  const post = await getPost(name);

  return (
    <Section>
      <SectionTitle>{post.title}</SectionTitle>

      <p>{post.content}</p>
    </Section>
  );
}

import { Section } from "@/components/ui/section";
import { fetchProjectHTML } from "@/lib/projects";

export default async function ProjectPage(props: {
  params: Promise<{ project: string }>;
}) {
  const params = await props.params;
  const postHTML = await fetchProjectHTML(params.project);

  return (
    <Section>
      <div className="max-w-4xl w-full text-left">{postHTML}</div>
    </Section>
  );
}

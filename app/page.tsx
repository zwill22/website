import { Section, SectionTitle } from "@/components/ui/section";
import { PageBreadcrumbs } from "@/components/ui/breadcrumbs";
import { Paragraph } from "@/components/typesetting/format";
import { ContactLinks } from "@/components/links";

export default function Home() {
  const time = new Date().getHours();
  const titleText =
    time >= 17
      ? "Good Evening"
      : time >= 12
        ? "Good Afternoon"
        : time >= 6
          ? "Good Morning"
          : "Late night?";

  return (
    <Section>
      <PageBreadcrumbs current="Home" />

      <SectionTitle>{titleText}</SectionTitle>

      <Paragraph>
        Welcome to my site. I created this place where I can showcase my work,
        who I am, and some of my writings. If you wish to contact me, I am
        available through the links below.
      </Paragraph>

      <ContactLinks />
    </Section>
  );
}

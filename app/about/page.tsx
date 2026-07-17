import { ContactMe } from "@/components/about/contact";
import { CV } from "@/components/about/cv";
import { ContactMeSkeleton } from "@/components/about/skeletons";
import { SocialMedia } from "@/components/about/socials";
import { Paragraph } from "@/components/react/format";
import { PageBreadcrumbs } from "@/components/ui/breadcrumbs";
import { Section, SectionTitle } from "@/components/ui/section";
import { MainSeparator as AboutSeparator } from "@/components/ui/separator";
import { Suspense } from "react";

function Intro() {
  return (
    <>
      <Paragraph>
        My name is Zack, I am a independent software developer and scientist
        based in Cymru. Currently, most of my work involves evaluating output
        produced by LLMs. Particularly, software and scientific writing.
      </Paragraph>
      <Paragraph>
        I am a trained research scientist having completed a PhD in theoretical
        and computational chemistry. My work focused on alternative theories of
        electron correlation which depend only on occupied molecular orbitals.
        These methods were developed as a way to include self-consistent hybrid
        correlation in density functionals.
      </Paragraph>
      <Paragraph>
        Much of my work throughout my post-graduate education involved
        developing new code to run and analyse these new methods. This included
        collaborating on a large electronic-structure codebase.
      </Paragraph>
      <Paragraph>
        Outside of work, I enjoy working on my own projects - several of which
        are highlighted here. I am an avid follower of my local football team -
        Wrexham AFC. I enjoy cooking, baking, and sci-fi television series.
      </Paragraph>
    </>
  );
}


export default function About() {
  const crumbs = [{ name: "Home", href: "/" }];

  return (
    <Section>
      <PageBreadcrumbs crumbs={crumbs} back="/" current="About" />
      <SectionTitle>About Me</SectionTitle>

      <div className="max-w-2xl">
        <AboutSeparator />
        <Intro />
        <AboutSeparator />
        <Suspense fallback={<ContactMeSkeleton />}>
          <ContactMe />
        </Suspense>
        <AboutSeparator />
        <SocialMedia />
        <AboutSeparator />
        <CV />
        <AboutSeparator />
      </div>
    </Section>
  );
}

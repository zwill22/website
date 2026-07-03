import { Heading } from "@/components/typesetting/format";
import { PageBreadcrumbs } from "@/components/ui/breadcrumbs";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/config/site";
import { fetchCV } from "@/lib/cv";
import { Link } from "@/components/about/button";
import clsx from "clsx";
import { ReactNode } from "react";

function CVLink(props: {
  href: string;
  external: boolean;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col justify-center">
      <Link className="flex py-1 px-2 rounded-md gap-2" href={props.href}>
        {props.children}
      </Link>
    </div>
  );
}

function PdfLink() {
  const hrefPdf = `https://www.icloud.com/iclouddrive/0bc2fZznjWFeMF2oswPpiupoA#Zack_Williams_PhD_-_Curriculum_Vitae`;

  return (
    <CVLink href={hrefPdf} external={true}>
      <p className={clsx("font-bold text-nowrap text-sm")}>PDF Version</p>
      <div className="text-lg my-auto">
        <i className="bi bi-filetype-pdf" />
      </div>
    </CVLink>
  );
}

function Email() {
  return (
    <CVLink href="/about?showCompose=true#contactme" external={false}>
      <div className="text-lg my-auto">
        <i className="bi bi-envelope" />
      </div>
      <p className={clsx("font-bold font-plain text-nowrap text-sm")}>
        Send Message
      </p>
    </CVLink>
  );
}

function LinkedIn() {
  return (
    <CVLink href={siteConfig.links.linkedin} external={true}>
      <div className="text-lg my-auto">
        <i className="bi bi-linkedin" />
      </div>
      <p
        className={clsx(
          "font-bold font-plain text-nowrap text-sm text-right w-18",
        )}
      >
        LinkedIn
      </p>
    </CVLink>
  );
}

function GitHub() {
  return (
    <CVLink href={siteConfig.links.github} external={true}>
      <div className="text-lg my-auto">
        <i className="bi bi-github" />
      </div>
      <p
        className={clsx(
          "font-bold font-plain text-nowrap text-sm text-right w-16",
        )}
      >
        GitHub
      </p>
    </CVLink>
  );
}

function Phone() {
  return <></>;
}

function CVHeader() {
  return (
    <>
      <Heading>Zack M Williams PhD</Heading>
      <div className="flex w-full gap-4">
        <Email />
        <LinkedIn />
        <GitHub />
        <Phone />
      </div>
    </>
  );
}

export default async function CV() {
  const cvComponent = await fetchCV();

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
  ];

  return (
    <Section>
      <div className="flex w-full">
        <PageBreadcrumbs crumbs={crumbs} back="/about" current="CV" />
        <PdfLink />
      </div>

      <CVHeader />

      <div className="w-full text-left">{cvComponent}</div>
    </Section>
  );
}

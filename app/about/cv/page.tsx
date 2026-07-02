import { PageBreadcrumbs } from "@/components/ui/breadcrumbs";
import { Section } from "@/components/ui/section";
import { fetchCV } from "@/lib/cv";
import { Link } from "@heroui/react";
import clsx from "clsx";

function PdfLink() {
  const href = `https://www.icloud.com/iclouddrive/0bc2fZznjWFeMF2oswPpiupoA#Zack_Williams_PhD_-_Curriculum_Vitae`;

  return (
    <div className="flex flex-col justify-center">
      <Link
        className={clsx(
          "flex py-1 px-2 rounded-md gap-2 bg-foreground/20 text-foreground",
          "shadow shadow-foreground/50 hover:ring hover:ring-foreground/50 hover:bg-foreground/20",
          "hover:ring-offset-1 hover:ring-offset-background",
        )}
        href={href}
        rel="noopener noreferrer"
        target="_blank"
      >
        <p className={clsx("font-bold text-nowrap text-sm")}>PDF Version</p>
        <div className="text-lg my-auto">
          <i className="bi bi-filetype-pdf" />
        </div>
      </Link>
    </div>
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

      <div className="w-full text-left">{cvComponent}</div>
    </Section>
  );
}

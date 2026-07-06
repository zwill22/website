import { Section, SectionTitle } from "@/components/ui/section";
import { PageBreadcrumbs } from "@/components/ui/breadcrumbs";
import { MinorHeading, Paragraph } from "@/components/typesetting/format";
import { ContactLinks, Link } from "@/components/links";
import { MainSeparator } from "@/components/ui/separator";

import { Card, ScrollShadow } from "@heroui/react";
import { fetchBlogPosts } from "@/lib/blogs";
import { ReactNode, Suspense } from "react";
import { PreviewImageSkeleton } from "@/components/menu/skeletons";
import { PreviewImage } from "@/components/menu/preview-image";
import { getDateString } from "@/lib/date";
import { MenuItemData } from "@/lib/types";
import clsx from "clsx";
import { fetchProjects } from "@/lib/projects";

export function MenuItem(props: {
  key: string;
  itemData: MenuItemData;
  hrefRoot: string;
  imageClass: string;
  titleClass: string;
}) {
  const menuItem = props.itemData;
  const hrefRoot = props.hrefRoot;

  const dateString = getDateString(menuItem.date);

  return (
    <div className="flex flex-col min-w-60 md:min-w-5/12 w-90">
      <Link
        href={`${hrefRoot}/${menuItem.id}`}
        className={clsx(
          "border border-foreground/10 rounded-xl shadow shadow-foreground/20",
          "bg-foreground/5 hover:bg-foreground/10 transition-colors hover:shadow",
          "hover:shadow-foreground/30 h-full",
        )}
        aria-label={menuItem.id}
      >
        <div className="flex flex-col gap-2 md:gap-4 p-2 md:p-4 h-full">
          <div className={props.imageClass}>
            <PreviewImage
              src={menuItem.image}
              description={menuItem.imageDescription}
            />
          </div>

          <div className="flex flex-col">
            <h2
              className={clsx(
                "font-heading md:text-lg overflow-hidden",
                props.titleClass,
              )}
            >
              {menuItem.title}
            </h2>
            <p className="leading-6 h-6">{dateString}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

function PostSkeleton() {
  return (
    <div className="flex flex-row gap-4">
      {Array.from({ length: 10 }).map((_, idx) => (
        <Card
          key={`scroll-shadow-lorem-cards-${idx}`}
          className="flex min-w-full flex-row gap-3 p-1"
        >
          <PreviewImageSkeleton />
          <div className="flex flex-1 flex-col justify-center gap-1">
            <Card.Title className="text-sm">Bridging the Future</Card.Title>
            <Card.Description className="text-xs">
              Today, 6:30 PM
            </Card.Description>
          </div>
        </Card>
      ))}
    </div>
  );
}

async function Projects() {
  const projects = await fetchProjects();

  return (
    <div className="flex flex-row gap-4">
      {projects.map((post, idx) => (
        <MenuItem
          key={`scroll-shadow-blog-cards-${idx}`}
          itemData={post}
          hrefRoot="/projects"
          imageClass="max-w-full h-8/10"
          titleClass="line-clamp-1 leading-5 md:leading-6 h-6 md:h-8"
        />
      ))}
    </div>
  );
}

async function BlogPosts() {
  const posts = await fetchBlogPosts();

  return (
    <div className="flex flex-row gap-4">
      {posts.map((post, idx) => (
        <MenuItem
          key={`scroll-shadow-blog-cards-${idx}`}
          itemData={post}
          hrefRoot="/blog"
          imageClass="max-w-full h-7/10"
          titleClass="line-clamp-3 leading-5 md:leading-6 h-16 md:h-18"
        />
      ))}
    </div>
  );
}

function PreviewMenu(props: { children: ReactNode }) {
  return (
    <div className="w-full">
      <Card className="w-full p-2 bg-purple-50/90 dark:bg-(--purple-black)/90 shadow shadow-foreground/50">
        <ScrollShadow className="p-4" orientation="horizontal">
          <Suspense fallback={<PostSkeleton />}>{props.children}</Suspense>
        </ScrollShadow>
      </Card>
    </div>
  );
}

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
        Welcome to my site. I created this place, so that I can showcase my
        work, who I am, and some of my writings. If you wish to contact me, I am
        available through the links below.
      </Paragraph>

      <MainSeparator />
      <div className="w-full">
        <div className="flex gap-4 pb-4 md:pb-6">
          <div className="flex my-auto text-4xl ">
            <i className="bi bi-link-45deg" />
          </div>
          <MinorHeading>Contact Links</MinorHeading>
        </div>
        <div className="text-right w-fit shrink ml-auto">
          <ContactLinks />
        </div>
      </div>
      <MainSeparator />
      <div className="w-full">
        <div className="flex gap-4 pb-4 md:pb-6">
          <div className="flex my-auto text-4xl ">
            <i className="bi bi-file-earmark-text" />
          </div>
          <MinorHeading>Projects</MinorHeading>
        </div>
        <PreviewMenu>
          <Projects />
        </PreviewMenu>
      </div>
      <MainSeparator />
      <div className="w-full">
        <div className="flex gap-4 pb-4 md:pb-6">
          <div className="flex my-auto text-4xl ">
            <i className="bi bi-file-earmark-text" />
          </div>
          <MinorHeading>Blog Posts</MinorHeading>
        </div>
        <PreviewMenu>
          <BlogPosts />
        </PreviewMenu>
      </div>
      <MainSeparator />
    </Section>
  );
}

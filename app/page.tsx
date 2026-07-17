import { Section, SectionTitle } from "@/components/ui/section";
import { PageBreadcrumbs } from "@/components/ui/breadcrumbs";
import { MinorHeading, Paragraph } from "@/components/react/format";
import { ContactLinks, Link } from "@/components/links";
import { MainSeparator } from "@/components/ui/separator";

import { Card, ScrollShadow } from "@heroui/react";
import { fetchBlogPosts } from "@/lib/blogs";
import { ReactNode, Suspense } from "react";
import { PreviewImage } from "@/components/menu/preview-image";
import { getDateString } from "@/lib/date";
import { MenuItemData } from "@/lib/types";
import clsx from "clsx";
import { fetchProjects } from "@/lib/projects";
import { PreviewMenuSkeleton } from "@/components/skeletons";
import { HomeTitle } from "@/components/home/title";

function MenuItem(props: {
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
    <div className="flex w-90 min-w-60 flex-col md:min-w-5/12">
      <Link
        href={`${hrefRoot}/${menuItem.id}`}
        className={clsx(
          "border-foreground/10 shadow-foreground/20 rounded-xl border shadow",
          "bg-foreground/5 hover:bg-foreground/10 transition-colors hover:shadow",
          "hover:shadow-foreground/30 h-full",
        )}
        aria-label={menuItem.id}
      >
        <div className="flex h-full flex-col gap-2 p-2 md:gap-4 md:p-4">
          <div className={props.imageClass}>
            <PreviewImage
              src={menuItem.image}
              description={menuItem.imageDescription}
            />
          </div>

          <div className="flex flex-col">
            <h2
              className={clsx(
                "font-heading overflow-hidden md:text-lg",
                props.titleClass,
              )}
            >
              {menuItem.title}
            </h2>
            <p className="h-6 leading-6">{dateString}</p>
          </div>
        </div>
      </Link>
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

function PreviewMenu(props: { children: ReactNode; length: number }) {
  return (
    <Suspense fallback={<PreviewMenuSkeleton length={props.length} />}>
      <div className="w-full">
        <Card className="shadow-foreground/50 light:bg-purple-50/90 w-full p-2 shadow dark:bg-(--purple-black)/90">
          <ScrollShadow className="p-4" orientation="horizontal">
            {props.children}
          </ScrollShadow>
        </Card>
      </div>
    </Suspense>
  );
}

export default function Home() {
  return (
    <Section>
      <PageBreadcrumbs current="Home" />

      <Suspense fallback={<SectionTitle>Hello There</SectionTitle>}>
        <HomeTitle />
      </Suspense>

      <Paragraph>
        Welcome to my site. I created this place so that I can showcase my work,
        who I am, and some of my writings. If you wish to contact me, I am
        available through the links below.
      </Paragraph>

      <MainSeparator />
      <div className="w-full">
        <div className="flex gap-4 pb-4 md:pb-6">
          <div className="my-auto flex text-4xl">
            <i className="bi bi-link-45deg" />
          </div>
          <MinorHeading>Contact Links</MinorHeading>
        </div>
        <div className="ml-auto w-fit shrink text-right">
          <ContactLinks />
        </div>
      </div>
      <MainSeparator />
      <div className="w-full">
        <div className="flex gap-4 pb-4 md:pb-6">
          <div className="my-auto flex text-4xl">
            <i className="bi bi-file-earmark-text" />
          </div>
          <MinorHeading>Projects</MinorHeading>
        </div>
        <PreviewMenu length={1}>
          <Projects />
        </PreviewMenu>
      </div>
      <MainSeparator />
      <div className="w-full">
        <div className="flex gap-4 pb-4 md:pb-6">
          <div className="my-auto flex text-4xl">
            <i className="bi bi-file-earmark-text" />
          </div>
          <MinorHeading>Blog Posts</MinorHeading>
        </div>
        <PreviewMenu length={3}>
          <BlogPosts />
        </PreviewMenu>
      </div>
      <MainSeparator />
    </Section>
  );
}

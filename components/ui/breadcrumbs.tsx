import { ArrowUturnLeftIcon, HomeIcon } from "@heroicons/react/24/solid";
import { Link } from "@/components/links";
import { Breadcrumbs } from "@heroui/react";
import clsx from "clsx";

interface Crumb {
  name: string;
  href: string;
}

export function PageBreadcrumbs(props: {
  crumbs?: Crumb[];
  back?: string;
  current: string;
}) {
  const breadcrumbs = props.crumbs ?? [];
  const iconLink = props.back ?? "/";

  return (
    <div className="flex gap-2 w-full">
      <Link className="py-2" href={iconLink} aria-label="Back to previous page">
        <div
          className={clsx(
            "flex flex-col size-5 text-foreground hover:text-foreground/80",
            props.back ? "hover:ring hover:ring-foreground" : "",
            "rounded-full m-1",
          )}
        >
          {props.back ? <ArrowUturnLeftIcon /> : <HomeIcon />}
        </div>
      </Link>
      <div className="flex flex-col w-full text-left justify-center">
        <Breadcrumbs>
          {breadcrumbs.map((crumb) => (
            <Breadcrumbs.Item
              key={crumb.href}
              href={crumb.href}
              aria-label={crumb.name}
            >
              {crumb.name}
            </Breadcrumbs.Item>
          ))}
          <Breadcrumbs.Item key="current_page">
            {props.current}
          </Breadcrumbs.Item>
        </Breadcrumbs>
      </div>
    </div>
  );
}

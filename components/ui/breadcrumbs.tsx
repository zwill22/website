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
    <div className="flex w-full gap-2">
      <Link className="py-2" href={iconLink} aria-label="Back to previous page">
        <div
          className={clsx(
            "text-foreground hover:text-foreground/80 flex size-5 flex-col",
            props.back ? "hover:ring-foreground hover:ring" : "",
            "m-1 rounded-full",
          )}
        >
          {props.back ? <ArrowUturnLeftIcon /> : <HomeIcon />}
        </div>
      </Link>
      <div className="flex w-full flex-col justify-center text-left">
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

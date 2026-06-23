import { Link } from "@heroui/react";

export function Project(props: {
  key: string;
  project: {
    id: string;
    title: string;
  };
}) {
  return <Link href={`/blog/${props.project.id}`}>{props.project.title}</Link>;
}

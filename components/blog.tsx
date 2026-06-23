import { Link } from "@heroui/react";
import Image from "next/image";
import clsx from "clsx";
import { BlogPostData } from "@/lib/blogs";
import { fetchImageSize } from "@/lib/image";
import { Suspense } from "react";
import { ImageSkeleton } from "@/components/skeletons";

function getMonth(n: number) {
  switch (n) {
    case 1:
      return "January";
    case 2:
      return "February";
    case 3:
      return "March";
    case 4:
      return "April";
    case 5:
      return "May";
    case 6:
      return "June";
    case 7:
      return "July";
    case 8:
      return "August";
    case 9:
      return "September";
    case 10:
      return "October";
    case 11:
      return "November";
    case 12:
      return "December";
    default:
      throw new Error("Invalid month");
  }
}

function getDateString(date: Date) {
  const day = date.getDay();
  const month = date.getMonth();
  const year = date.getFullYear();

  const fullMonth = getMonth(month);

  return `${day} ${fullMonth} ${year}`;
}

async function PreviewImage(props: { src: string; description: string }) {
  const imageSize = await fetchImageSize(props.src);

  return (
    <div className="flex flex-col justify-center max-w-1/4 gap-2 m-2 lg:m-4">
      <Image
        src={props.src}
        width={imageSize.width}
        height={imageSize.height}
        alt={props.description}
      />
    </div>
  );
}

export function BlogPost(props: { key: string; post: BlogPostData }) {
  const dateString = getDateString(props.post.date);

  return (
    <Link
      href={`/blog/${props.post.id}`}
      className={clsx(
        "flex max-w-200 gap md:gap-4 border border-foreground/10 rounded-xl shadow-foreground/20",
        "bg-background px-2 lg:px-4 my-2 hover:bg-foreground/5 transition-colors hover:shadow",
        "hover:shadow-foreground/30",
      )}
    >
      <PreviewImage
        src={props.post.image}
        description={props.post.imageDescription}
      />

      <div className="flex w-3/4 flex-col md:p-4 gap-2">
        <h2
          className={clsx(
            "font-heading text-lg overflow-hidden line-clamp-2",
            "md:text-2xl min-h-16 leading-8",
          )}
        >
          {props.post.title}
        </h2>
        <p>{dateString}</p>
        <p className="hidden md:flex text-left max-h-18 text-foreground/70 italic line-clamp-3">
          {props.post.preview}
        </p>
      </div>
    </Link>
  );
}

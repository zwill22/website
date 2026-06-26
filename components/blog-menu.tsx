import { Link } from "@heroui/react";
import Image from "next/image";
import clsx from "clsx";
import { BlogPostData } from "@/lib/blogs";
import { fetchImageSize } from "@/lib/image";
import { Suspense } from "react";
import { PreviewImageSkeleton } from "@/components/skeletons";

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

  console.log(imageSize);

  return (
    <div className="flex flex-col h-full w-full relative justify-center">
      <Image
        src={props.src}
        alt={props.description}
        width={imageSize.width}
        height={imageSize.height}
        className="object-contain max-h-full"
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
        "border border-foreground/10 rounded-xl shadow shadow-foreground/20",
        "bg-foreground/5 hover:bg-foreground/10 transition-colors hover:shadow",
        "hover:shadow-foreground/30",
      )}
    >
      <div className="flex gap-2 md:gap-4 p-2 md:p-4 max-h-28 md:max-h-52">
        <div className="max-h-full md:max-h-full w-1/4">
          <Suspense fallback={<PreviewImageSkeleton />}>
            <PreviewImage
              src={props.post.image}
              description={props.post.imageDescription}
            />
          </Suspense>
        </div>

        <div className="flex flex-col w-3/4">
          <h2
            className={clsx(
              "font-heading text-lg overflow-hidden line-clamp-2",
              "md:text-2xl md:min-h-16 md:leading-8",
            )}
          >
            {props.post.title}
          </h2>
          <p>{dateString}</p>
          <p
            className={clsx(
              "hidden md:flex text-left max-h-18 text-foreground/70 italic line-clamp-3",
            )}
          >
            {props.post.preview}
          </p>
        </div>
      </div>
    </Link>
  );
}

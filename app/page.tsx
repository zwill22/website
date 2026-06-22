import { siteConfig } from "@/config/site";
import { GithubIcon, LinkedInIcon } from "@/components/icons";
import { Link } from "@heroui/react";

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
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <h1 className="text-5xl md:text-6xl font-heading p-2">{titleText}</h1>

      <p>Welcome to my site</p>

      <div className="flex gap-3">
        <Link
          className="button button--tertiary button--md rounded-full font-plain"
          href={siteConfig.links.github}
          rel="noopener noreferrer"
          target="_blank"
        >
          <GithubIcon className="text-xl pr-2" />
          GitHub
        </Link>
        <Link
          className="button button--tertiary button--md rounded-full font-plain"
          href={siteConfig.links.linkedin}
          rel="noopener noreferrer"
          target="_blank"
        >
          <LinkedInIcon className="text-xl pr-2" />
          LinkedIn
        </Link>
      </div>

      <div className="mt-8">
        <div className="flex items-center gap-2 rounded-xl bg-surface shadow-surface px-4 py-2">
          <pre className="text-sm font-medium font-plain">Home page</pre>
        </div>
      </div>
    </section>
  );
}

import { siteConfig } from "@/config/site";
import { GithubIcon, LinkedInIcon } from "@/components/icons";
import { Link } from "@heroui/react";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <h1>My page</h1>
      </div>

      <div className="flex gap-3">
        <Link
          className="button button--tertiary button--md rounded-full"
          href={siteConfig.links.github}
          rel="noopener noreferrer"
          target="_blank"
        >
          <GithubIcon className="text-xl pr-2"/>
          GitHub
        </Link>
        <Link
          className="button button--tertiary button--md rounded-full"
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
          <pre className="text-sm  font-mediumfont-mono">
            Home page
          </pre>
        </div>
      </div>
    </section>
  );
}

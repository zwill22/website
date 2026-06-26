import clsx from "clsx";
import Image from "next/image";

export function Logo(props: { size: number; className?: string }) {
  return (
    <div className="flex justify-center">
      <Image
        src="/logo.svg"
        width={props.size}
        height={props.size}
        alt="Logo"
        className={clsx("focus-visible:outline-0", props.className)}
        unoptimized
      />
    </div>
  );
}
export function GithubIcon(props: { className?: string }) {
  return <i className={clsx("bi bi-github", props.className)} />;
}

export function LinkedInIcon(props: { className?: string }) {
  return <i className={clsx("bi bi-linkedin", props.className)} />;
}

export function SunFilledIcon(props: { className?: string }) {
  return <i className={clsx("bi bi-sun-fill", props.className)} />;
}

export function MoonFilledIcon(props: { className?: string }) {
  return <i className={clsx("bi bi-moon-fill", props.className)} />;
}

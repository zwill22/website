import { ButtonContent, ButtonLabel, Link } from "@/components/about/button";
import { MinorHeading } from "@/components/typesetting/format";
import { GithubIcon, LinkedInIcon } from "@/components/ui/icons";
import { siteConfig } from "@/config/site";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import { ButtonGroup } from "@heroui/react";

function SocialLabel() {
  return (
    <>
      <div className="flex gap-4 justify-center">
        <ChatBubbleLeftRightIcon className="size-12 my-auto" />
        <div className="flex flex-col justify-center">
          <MinorHeading>Social Media</MinorHeading>
        </div>
      </div>
    </>
  );
}

function GitHubButton() {
  return (
    <Link className="rounded-l-md" href={siteConfig.links.github}>
      <ButtonContent>
        <GithubIcon className="my-auto" />
        <ButtonLabel>GitHub</ButtonLabel>
      </ButtonContent>
    </Link>
  );
}

function LinkedInButton() {
  return (
    <Link className="rounded-r-md" href={siteConfig.links.linkedin}>
      <ButtonGroup.Separator />
      <ButtonContent>
        <LinkedInIcon className="my-auto" />
        <ButtonLabel>LinkedIn</ButtonLabel>
      </ButtonContent>
    </Link>
  );
}

export function SocialMedia() {
  return (
    <div className="flex w-full gap-4 justify-between">
      <SocialLabel />
      <div className="h-full flex flex-col gap-2 my-auto">
        <ButtonGroup className="font-plain">
          <GitHubButton />
          <LinkedInButton />
        </ButtonGroup>
      </div>
    </div>
  );
}

import { ButtonLink } from "@/components/links";
import { ButtonContent, ButtonLabel } from "@/components/about/button";
import { MinorHeading } from "@/components/typesetting/format";
import { ButtonGroup } from "@heroui/react";

function CVLabel() {
  return (
    <>
      <div className="flex gap-4 justify-center">
        <div className="flex flex-col justify-center text-5xl">
          <i className="bi bi-file-person" />
        </div>
        <div className="flex flex-col justify-center">
          <MinorHeading>CV</MinorHeading>
        </div>
      </div>
    </>
  );
}

function CVButton() {
  return (
    <ButtonLink
      className="rounded-md"
      href="/about/cv"
      aria-label="Link to my CV"
    >
      <ButtonGroup.Separator />
      <ButtonContent>
        <i className="bi bi-file-earmark-person"></i>
        <ButtonLabel>View</ButtonLabel>
      </ButtonContent>
    </ButtonLink>
  );
}

export function CV() {
  return (
    <div className="flex w-full gap-4 justify-between">
      <CVLabel />
      <div className="h-full flex flex-col my-auto font-plain">
        <CVButton />
      </div>
    </div>
  );
}

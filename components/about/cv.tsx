import { ButtonLink } from "@/components/links";
import { ButtonContent, ButtonLabel } from "@/components/about/button";
import { MinorHeading } from "@/components/react/format";
import { ButtonGroup } from "@heroui/react";

function CVLabel() {
  return (
    <>
      <div className="flex justify-center gap-4">
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
    <div className="flex w-full justify-between gap-4">
      <CVLabel />
      <div className="font-plain my-auto flex h-full flex-col">
        <CVButton />
      </div>
    </div>
  );
}

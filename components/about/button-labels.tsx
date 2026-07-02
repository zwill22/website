import { ButtonContent, ButtonLabel } from "@/components/about/button";
import { MinorHeading } from "@/components/typesetting/format";
import {
  CheckCircleIcon,
  DocumentDuplicateIcon,
  EnvelopeIcon,
  PaperAirplaneIcon,
  PencilSquareIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

export function ContactLabel() {
  return (
    <>
      <div className="flex gap-4 justify-center">
        <EnvelopeIcon className="size-12 my-auto" />
        <div className="flex flex-col justify-center">
          <MinorHeading>Contact Me</MinorHeading>
        </div>
      </div>
    </>
  );
}

export function Compose() {
  return (
    <ButtonContent>
      <PencilSquareIcon className="my-auto" />
      <ButtonLabel>Compose</ButtonLabel>
    </ButtonContent>
  );
}

export function Copy(props: { copied: boolean; error: boolean }) {
  if (props.copied) {
    return (
      <ButtonContent>
        <CheckCircleIcon className="my-auto" />
        <ButtonLabel>Copied</ButtonLabel>
      </ButtonContent>
    );
  }

  if (props.error) {
    return (
      <ButtonContent>
        <XCircleIcon className="my-auto" />
        <ButtonLabel>Error</ButtonLabel>
      </ButtonContent>
    );
  }

  return (
    <ButtonContent>
      <DocumentDuplicateIcon className="my-auto" />
      <ButtonLabel>Copy</ButtonLabel>
    </ButtonContent>
  );
}

export function Reset() {
  return (
    <div className="flex gap-4 justify-center">
      <div>
        <i className="bi bi-arrow-counterclockwise" />
      </div>
      <p className="hidden md:inline">Reset</p>
    </div>
  );
}

export function Submit() {
  return (
    <div className="flex gap-4 justify-center">
      <PaperAirplaneIcon className="my-auto" />
      <p className="hidden md:inline">Send</p>
    </div>
  );
}

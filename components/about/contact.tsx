"use client";

import { Button } from "@/components/about/button";
import {
  Compose,
  ContactLabel,
  Copy,
  Reset,
  Submit,
} from "@/components/about/button-labels";
import { sendEmail, State } from "@/lib/email";
import { XCircleIcon } from "@heroicons/react/24/solid";
import {
  ButtonGroup,
  Form,
  Input,
  TextField,
  Label,
  FieldError,
  TextArea,
  Description,
  Spinner,
} from "@heroui/react";
import clsx from "clsx";
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useActionState, useState } from "react";

function SubjectField(props: { currentState: State }) {
  const allErrors = props.currentState.errors ?? {};

  const errors = allErrors.subject?.errors ?? [];

  const isInvalid = errors.length > 0;

  return (
    <TextField isRequired name="subject" type="text" isInvalid={isInvalid}>
      <Label>Subject</Label>
      <Input placeholder="Help!" />
      {isInvalid ? (
        errors.map((e, idx) => (
          <FieldError key={`subject-field-error-${idx}`}>{e}</FieldError>
        ))
      ) : (
        <FieldError />
      )}
    </TextField>
  );
}

function EmailField(props: { currentState: State }) {
  const allErrors = props.currentState.errors ?? {};

  const errors = allErrors.email?.errors ?? [];

  const isInvalid = errors.length > 0;

  return (
    <TextField isRequired name="email" type="email" isInvalid={isInvalid}>
      <Label>Contact Email</Label>
      <Input placeholder="person@internet.com" />
      {isInvalid ? (
        errors.map((e, idx) => (
          <FieldError key={`email-field-error-${idx}`}>{e}</FieldError>
        ))
      ) : (
        <FieldError />
      )}
    </TextField>
  );
}

function MessageBox(props: { currentState: State }) {
  const allErrors = props.currentState.errors ?? {};

  const errors = allErrors.message?.errors ?? [];

  const isInvalid = errors.length > 0;

  return (
    <TextField isRequired name="message" type="text" isInvalid={isInvalid}>
      <Label>Message</Label>
      <TextArea
        placeholder="Help, I need somebody's help. Not just anybody's help. I need someone..."
        rows={8}
      />
      <Description className="py-2">
        Please enter a detailed description of how I can help. Supports
        markdown.
      </Description>
      {isInvalid ? (
        errors.map((e, idx) => (
          <FieldError key={`message-box-error-${idx}`}>{e}</FieldError>
        ))
      ) : (
        <FieldError />
      )}
    </TextField>
  );
}

function ComposeBox() {
  const initialState: State = {
    message: null,
    errors: {},
  };

  const [state, formAction, isPending] = useActionState(
    sendEmail,
    initialState,
  );

  return (
    <div className="font-plain shadow-foreground/50 relative mx-auto flex w-full rounded-xl p-4 shadow md:text-lg">
      <Form className="flex w-full flex-col gap-4 md:gap-6" action={formAction}>
        <SubjectField currentState={state} />
        <EmailField currentState={state} />
        <MessageBox currentState={state} />

        <div className="flex w-full justify-between">
          <Button type="reset" variant="secondary" className="rounded-md">
            <Reset />
          </Button>

          <Button type="submit" className="rounded-md" isPending={isPending}>
            <Submit />
          </Button>
        </div>
      </Form>
      <div
        className={clsx(
          isPending
            ? "text-foreground/50 absolute top-0 left-0 z-2 flex h-full w-full flex-col rounded-xl p-4 backdrop-blur-xs"
            : "hidden",
        )}
      >
        <div className="bg-foreground/10 shadow-foreground/20 m-auto flex flex-col rounded-xl p-4 shadow backdrop-blur-xs">
          <Spinner className="text-success m-auto" size="xl" />
          <p className="font-plain min-w-16 px-2 pt-4">Sending...</p>
        </div>
      </div>
    </div>
  );
}

const emailAddress = (() => {
  const email = process.env.NEXT_PUBLIC_EMAIL_ADDRESS;

  if (!email) {
    throw new Error(
      "Cannot find environment variable: NEXT_PUBLIC_EMAIL_ADDRESS",
    );
  }

  return email;
})();

function getSearchBool(searchParameters: ReadonlyURLSearchParams, key: string) {
  const value = searchParameters.get(key)?.toString();

  return value ? value == "true" : false;
}

export function ContactMe() {
  const searchParameters = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleComposeClick = (term: boolean) => {
    const parameters = new URLSearchParams(searchParameters);

    parameters.set("showCompose", term ? "true" : "false");

    replace(`${pathname}?${parameters.toString()}`);
  };

  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopied(true);
    } catch {
      setError(true);
    }

    setTimeout(() => {
      setCopied(false);
      setError(false);
    }, 3000);
  };

  const showCompose = getSearchBool(searchParameters, "showCompose");
  const submitted = getSearchBool(searchParameters, "submitted");

  return (
    <div id="contactme" className="flex flex-col gap-4">
      <div className="flex w-full justify-between gap-4">
        <ContactLabel />
        <div className="my-auto flex h-full flex-col gap-2">
          <ButtonGroup className="font-plain">
            <Button
              className="rounded-l-md"
              onPress={() => {
                handleComposeClick(!showCompose);
              }}
              isDisabled={submitted}
            >
              <Compose />
            </Button>

            <Button
              className="rounded-r-md"
              onPress={() => handleCopy()}
              isDisabled={copied}
            >
              <ButtonGroup.Separator />
              <Copy copied={copied} error={error} />
            </Button>
          </ButtonGroup>
        </div>
      </div>

      {showCompose ? <ComposeBox /> : <></>}
    </div>
  );
}

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
import {
  ButtonGroup,
  Form,
  Input,
  TextField,
  Label,
  FieldError,
  TextArea,
  Description,
} from "@heroui/react";
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
      <Input placeholder="Help needed!" />
      {isInvalid ? (
        errors.map((e, idx) => <FieldError key={`subject-field-error-${idx}`}>{e}</FieldError>)
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
      <Input placeholder="c.kent@dailyplanet.com" />
      {isInvalid ? (
        errors.map((e, idx) => <FieldError key={`email-field-error-${idx}`}>{e}</FieldError>)
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
      <TextArea placeholder="I need some code urgently..." rows={8} />
      <Description className="py-2">
        Please enter a detailed description of how I can help. Supports
        markdown.
      </Description>
      {isInvalid ? (
        errors.map((e, idx) => <FieldError key={`message-box-error-${idx}`}>{e}</FieldError>)
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

  const [state, formAction] = useActionState(sendEmail, initialState);

  return (
    <div className="flex w-full font-plain md:text-lg rounded-xl p-4 mx-auto shadow shadow-foreground/50">
      <Form className="flex flex-col w-full gap-4 md:gap-6" action={formAction}>
        <SubjectField currentState={state} />
        <EmailField currentState={state} />
        <MessageBox currentState={state} />

        <div className="w-full flex justify-between">
          <Button type="reset" variant="secondary" className="rounded-md">
            <Reset />
          </Button>

          <Button type="submit" className="rounded-md">
            <Submit />
          </Button>
        </div>
      </Form>
    </div>
  );
}

const emailAddress = (() => {
  const email = process.env.NEXT_PUBLIC_EMAIL_ADDRESS;

  if (!email) {
    throw new Error("Cannot find email address");
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
      <div className="flex w-full gap-4 justify-between">
        <ContactLabel />
        <div className="h-full flex flex-col gap-2 my-auto">
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

"use client";

import { Button, ButtonContent, ButtonLabel } from "@/components/about/button";
import { MinorHeading } from "@/components/typesetting/format";
import {
  CheckCircleIcon,
  DocumentDuplicateIcon,
  EnvelopeIcon,
  PaperAirplaneIcon,
  PencilSquareIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
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
import { SyntheticEvent, useState } from "react";

function ComposeBox() {
  const onSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    // Convert FormData to plain object
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    console.log(`Form submitted with: ${JSON.stringify(data, null, 2)}`);
  };

  return (
    <div className="flex w-full font-plain md:text-lg rounded-xl p-4 mx-auto shadow shadow-foreground/50">
      <Form className="flex flex-col w-full gap-4 md:gap-6" onSubmit={onSubmit}>
        <TextField isRequired name="subject" type="text" minLength={4}>
          <Label>Subject</Label>
          <Input placeholder="Help needed!" />
          <FieldError />
        </TextField>
        <TextField isRequired name="password" type="password" minLength={20}>
          <Label>Message</Label>
          <TextArea placeholder="I need some code urgently..." rows={8} />
          <Description className="py-2">
            Please enter a detailed description of how I can help.
          </Description>
          <FieldError />
        </TextField>

        <div className="w-full flex justify-between">
          <Button type="reset" variant="secondary" className="rounded-md">
            <div className="flex gap-4 justify-center">
              <div>
                <i className="bi bi-arrow-counterclockwise" />
              </div>
              <p className="hidden md:inline">Reset</p>
            </div>
          </Button>

          <Button type="submit" className="rounded-md">
            <div className="flex gap-4 justify-center">
              <PaperAirplaneIcon className="my-auto" />
              <p className="hidden md:inline">Send</p>
            </div>
          </Button>
        </div>
      </Form>
    </div>
  );
}

const emailAddress = "This is an email address";

function ContactLabel() {
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

function ComposeButton() {
  return (
    <ButtonContent>
      <PencilSquareIcon className="my-auto" />
      <ButtonLabel>Compose</ButtonLabel>
    </ButtonContent>
  );
}

function CopyButton(props: { copied: boolean; error: boolean }) {
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

export function ContactMe() {
  const [showCompose, setShowCompose] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopied(true);
    } catch (error) {
      setError(true);
    }

    setTimeout(() => {
      setCopied(false);
      setError(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-full gap-4 justify-between">
        <ContactLabel />
        <div className="h-full flex flex-col gap-2 my-auto">
          <ButtonGroup className="font-plain">
            <Button
              className="rounded-l-md"
              onPress={() => {
                setShowCompose(!showCompose);
              }}
              isDisabled={false}
            >
              <ComposeButton />
            </Button>

            <Button
              className="rounded-r-md"
              onPress={() => handleCopy()}
              isDisabled={copied}
            >
              <ButtonGroup.Separator />
              <CopyButton copied={copied} error={error} />
            </Button>
          </ButtonGroup>
        </div>
      </div>

      {showCompose ? <ComposeBox /> : <></>}
    </div>
  );
}

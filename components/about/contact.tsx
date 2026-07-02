"use client";

import { Button } from "@/components/about/button";
import {
  Compose,
  ContactLabel,
  Copy,
  Reset,
  Submit,
} from "@/components/about/button-labels";
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

const emailAddress = "This is an email address";

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
    } catch (error) {
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

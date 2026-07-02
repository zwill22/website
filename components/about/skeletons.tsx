import { Compose, ContactLabel, Copy } from "@/components/about/button-labels";
import { Button, ButtonGroup } from "@heroui/react";


export function ContactMeSkeleton() {
  return (
    <div id="contactme" className="flex flex-col gap-4">
      <div className="flex w-full gap-4 justify-between">
        <ContactLabel />
        <div className="h-full flex flex-col gap-2 my-auto">
          <ButtonGroup className="font-plain">
            <Button
              className="rounded-l-md"
              isDisabled={true}
            >
              <Compose />
            </Button>

            <Button
              className="rounded-r-md"
              isDisabled={true}
            >
              <ButtonGroup.Separator />
              <Copy copied={false} error={false} />
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
}

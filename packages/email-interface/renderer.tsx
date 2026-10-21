import { render } from "react-email";
import Email from "email";

export default async function renderMessage(
  subject: string,
  message: string,
  preview: string,
  phoneNumber: string,
  address: string,
) {
  if (address.length == 0) {
    throw new Error("Unable to send email, no forwarding address found");
  }

  const html = await render(
    <Email
      title={subject}
      content={message}
      phoneNumber={phoneNumber}
      previewText={preview}
    />,
  );

  return html;
}

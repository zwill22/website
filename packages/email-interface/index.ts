import renderMessage from "./renderer";

export default async function composeMessage(
  subject: string,
  message: string,
  preview: string,
  phoneNumber: string,
  address: string,
) {
  if (address.length == 0) {
    throw new Error("Unable to send email, no forwarding address found");
  }

  const html = await renderMessage(
    subject,
    message,
    preview,
    phoneNumber,
    address,
  );

  return {
    address: address,
    subject: subject,
    message: html,
  };
}

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import nodemailer from "nodemailer";
import markdownToHtml from "@/packages/markdown-to-html";

interface MessageDetails {
  address: string;
  subject: string;
  message: string;
}

function checkVariable(variable: string | undefined, name: string) {
  if (!variable) {
    throw new Error(`${name} not found`);
  }

  return variable;
}

const smtpHost = checkVariable(process.env.EMAIL_APP_SMTP_HOST, "SMTP Host");

const smtpPort = (() => {
  const port = checkVariable(process.env.EMAIL_APP_SMTP_PORT, "SMTP Port");

  return Number(port);
})();

const userName = checkVariable(
  process.env.EMAIL_APP_AUTH_ADDRESS,
  "SMTP Account address",
);

const password = checkVariable(
  process.env.EMAIL_APP_AUTH_PASSWORD,
  "Account password",
);

const sendAddress = checkVariable(
  process.env.EMAIL_APP_SMTP_ADDRESS,
  "Send address",
);
class MailService {
  async send(messageDetails: MessageDetails) {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      auth: {
        user: userName,
        pass: password,
      },
    });

    const mailOptions = {
      from: sendAddress,
      to: messageDetails.address,
      subject: messageDetails.subject,
      html: messageDetails.message,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (error: any) {
      throw new Error("Error sending email ", error.message);
    }
  }
}

function composeMeesageToMe(subject: string, email: string, message: string) {
  const myAddress = sendAddress;
  if (myAddress.length == 0) {
    throw new Error("Unable to send email, no forwarding address found");
  }

  const messageSubject = `New Message from Website: ${subject}`;

  const messageContent = `
  <h2>New message from website</h2>
  <p>Subject: ${subject}</p>
  <p>Contact email: ${email}</p>
  <br/>
  <p>Message:</p>
  ${message.replace("\n", "<br/>")}
  `;

  return {
    address: myAddress,
    subject: messageSubject,
    message: messageContent,
  };
}

function composeMeesageToThem(subject: string, email: string, message: string) {
  const messageSubject = `Thank you for your message: ${subject}`;

  const messageContent = `
  <p>Thank you for contacting me via my website.</p>
  <p>I am thrilled that you have decided to contact me.
  I will try to get back to you as soon as possible.</p>
  <p>Kind regards,</p>
  <p>Zack</p>
  <br/>
  <p>Message details:</p>
  <p>Subject: ${subject}</p>
  <br/>
  <p>Message:</p>
  ${message}
  `;

  return {
    address: email,
    subject: messageSubject,
    message: messageContent,
  };
}

const FormSchema = z.object({
  id: z.string(),
  subject: z.string({
    error: "Please enter a valid subject",
  }),
  email: z.email({
    error: "Please enter a vaid email address",
  }),
  message: z.string({
    error: "Please enter a valid message",
  }),
});

const SendMessage = FormSchema.omit({ id: true });

export type State = {
  errors?: {
    subject?: {
      errors: string[];
    };
    email?: {
      errors: string[];
    };
    message?: {
      errors: string[];
    };
  };
  message?: string | null;
};

export async function sendEmail(_: State, formData: FormData) {
  const validatedFields = SendMessage.safeParse({
    subject: formData.get("subject"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    const err = z.treeifyError(validatedFields.error);
    return {
      errors: err.properties,
      message: err.errors.join(),
    };
  }

  // Prepare data

  const { subject, email, message } = validatedFields.data;

  const htmlMessage = await markdownToHtml(message);

  const emailService = new MailService();
  try {
    const messageToMe = composeMeesageToMe(subject, email, htmlMessage);
    const messageToThem = composeMeesageToThem(subject, email, htmlMessage);

    await emailService.send(messageToMe);
    // Only send to them if first message is successful
    await emailService.send(messageToThem);
  } catch (error: any) {
    return { message: String(error.message) };
  }

  revalidatePath("/about");
  redirect("/about");
}

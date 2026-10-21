"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import nodemailer from "nodemailer";
import { getErrorMessage } from "@/lib/errors";
import composeMessage from "email-interface";

interface MessageDetails {
  address: string;
  subject: string;
  message: string;
}

function checkVariable(variable: string | undefined, name: string) {
  if (!variable) {
    throw new Error(`Cannot find environment variable: ${name}`);
  }

  return variable;
}

const smtpHost = checkVariable(
  process.env.EMAIL_APP_SMTP_HOST,
  "EMAIL_APP_SMTP_HOST",
);

const smtpPort = (() => {
  const port = checkVariable(
    process.env.EMAIL_APP_SMTP_PORT,
    "EMAIL_APP_SMTP_PORT",
  );

  return Number(port);
})();

const emailAddress = checkVariable(
  process.env.EMAIL_APP_AUTH_ADDRESS,
  "EMAIL_APP_AUTH_ADDRESS",
);

const password = checkVariable(
  process.env.EMAIL_APP_AUTH_PASSWORD,
  "EMAIL_APP_AUTH_PASSWORD",
);

const phoneNumber = checkVariable(process.env.PHONE_NUMBER, "PHONE_NUMBER");

class MailService {
  async send(messageDetails: MessageDetails) {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      auth: {
        user: emailAddress,
        pass: password,
      },
    });

    try {
      await transporter.verify();
    } catch (err) {
      console.error("Verification failed:", err);
      throw new Error(`Unable to connect to email server: ${err}`);
    }

    const mailOptions = {
      from: emailAddress,
      to: messageDetails.address,
      subject: messageDetails.subject,
      html: messageDetails.message,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error);
      throw new Error(`Error sending email: ${errorMessage}`);
    }
  }
}

async function composeMeesageToMe(
  subject: string,
  email: string,
  message: string,
) {
  const myAddress = emailAddress;

  const messageSubject = `New Message from Website: ${subject}`;

  const content = `
  *Message from website*
  
  Subject: _${subject}_

  Email: ${email}

  Message:

  ${message}
  `;

  const preview = message.slice(0, 80);

  return composeMessage(
    messageSubject,
    content,
    preview,
    phoneNumber,
    myAddress,
  );
}

function composeMeesageToThem(subject: string, email: string, message: string) {
  const messageSubject = `Thank you for your message: ${subject}`;

  const messageContent = `
  Thank you for contacting me via my website.
  I will try to get back to you as soon as possible.

  Best wishes

  Zack
  
  Message:
  
  # ${subject}
  
  ${message}
  `;

  const preview = "You message has been received. Thank you for contacting me.";

  return composeMessage(
    messageSubject,
    messageContent,
    preview,
    phoneNumber,
    email,
  );
}

const FormSchema = z.object({
  id: z.string(),
  subject: z
    .string({
      error: "Please enter a valid subject",
    })
    .min(4, {
      error: "Please enter a valid subject",
    }),
  email: z.email({
    error: "Please enter a valid email address",
  }),
  message: z
    .string({
      error: "Please enter a valid message",
    })
    .min(20, "Please provide more information"),
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

  const emailService = new MailService();
  try {
    const messageToMe = await composeMeesageToMe(subject, email, message);
    const messageToThem = await composeMeesageToThem(subject, email, message);

    await emailService.send(messageToMe);

    // Only send to them if first message is successful
    await emailService.send(messageToThem);
  } catch (error: unknown) {
    return { message: getErrorMessage(error) };
  }

  revalidatePath("/about");
  redirect("/about");
}

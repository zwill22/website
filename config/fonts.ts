import { Cookie, Sora, Amaranth, Lilita_One } from "next/font/google";

export const fontBody = Amaranth({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "700"],
});

export const fontPlain = Sora({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-plain",
});

export const fontHeading = Lilita_One({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: "400",
});

export const fontCookie = Cookie({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-cookie",
});

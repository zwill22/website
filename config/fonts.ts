import {
  Cookie,
  Fira_Code as FontMono,
  Inter as FontSans,
  Lilita_One as FontLilita,
} from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const fontLilita = FontLilita({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: "400",
});

export const fontCookie = Cookie({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-cookie",
});

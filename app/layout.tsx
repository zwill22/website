import "@/styles/globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import {
  fontBody,
  fontHeading,
  fontPlain,
  fontCookie,
  fontMono,
} from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { SponserWidget } from "@/components/coffee";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "text-foreground bg-background font-body antialiased",
          fontBody.variable,
          fontHeading.variable,
          fontMono.variable,
          fontPlain.variable,
          fontCookie.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col grow h-svh md:hidden">
            <Navbar />
            <div className="flex flex-col rounded-xl grow bg-foreground/5">
              <main className="container grow">{children}</main>
              <footer className="container flex justify-end p-5">
                <SponserWidget />
              </footer>
            </div>
          </div>

          <div className="hidden md:relative md:flex">
            <Sidebar />
            <div className="flex flex-col rounded-xl m-4 grow bg-foreground/5">
              <main className="container grow">{children}</main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}

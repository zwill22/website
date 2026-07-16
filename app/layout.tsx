import "@/styles/globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "highlight.js/styles/github-dark.css";

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
  fontGitHub,
} from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar/sidebar";
import { SponserWidget } from "@/components/ui/coffee";

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
          fontGitHub.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="bg-foreground/5 relative h-dvh md:flex">
            <div className="hidden md:flex">
              <Sidebar />
            </div>
            <div className="md:hidden">
              <Navbar />
            </div>
            <div className="bg-background relative flex h-full max-w-full grow flex-col overflow-y-scroll">
              <main className="container mx-auto grow p-4 py-16 md:py-4">
                {children}
              </main>
              <div className="flex max-h-full grow flex-col justify-end">
                <p className="font-plain text-foreground/50 p-2 text-center text-sm">
                  <i className="bi bi-c-circle" /> 2026 Z M Williams
                </p>
              </div>
              <footer className="fixed right-0 bottom-0 z-30 p-5 md:hidden">
                <SponserWidget />
              </footer>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}

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
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative h-dvh md:hidden bg-foreground/5">
            <Navbar />
            <div className="rounded-xl grow bg-background overflow-y-auto h-dvh py-8">
              <main className="container grow mx-auto">{children}</main>
              <footer className="fixed bottom-0 right-0 p-5 z-30">
                <SponserWidget />
              </footer>
            </div>
          </div>

          <div className="hidden md:flex bg-foreground/5">
            <Sidebar />
            <div className="relative grow h-dvh mx-auto max-w-full">
              <main className="mt-4 mx-4 rounded-xl bg-background h-29/30 overflow-y-auto px-4">
                {children}
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}

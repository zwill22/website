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
          <div className="relative bg-foreground/5 h-dvh md:flex">
            <div className="hidden md:flex">
              <Sidebar />
            </div>
            <div className="md:hidden">
              <Navbar />
            </div>
            <div className="relative grow bg-background h-full max-w-full overflow-y-scroll ">
              <main className="container grow mx-auto pt-10 md:pt-4 p-4">
                {children}
              </main>
              <footer className="fixed md:hidden bottom-0 right-0 p-5 z-30">
                <SponserWidget />
              </footer>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}

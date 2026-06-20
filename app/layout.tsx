import "@/styles/globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans, fontMono, fontCookie, fontLilita } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";

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
          "min-h-screen text-foreground bg-background font-sans antialiased",
          fontSans.variable,
          fontMono.variable,
          fontCookie.variable,
          fontLilita.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen md:hidden">
            <Navbar />
            <div className="flex flex-col rounded-xl h-full bg-foreground/5">
              <main className="container grow">
                {children}
              </main>
            </div>
          </div>

          <div className="hidden md:relative md:flex">
            <Sidebar />
            <div className="flex flex-col rounded-xl m-4 w-full bg-foreground/5">
              <main className="container grow">{children}</main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}

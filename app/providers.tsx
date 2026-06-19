"use client";

import type { ThemeProviderProps } from "next-themes";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactNode } from "react";

export function Providers(props: {
  children: ReactNode;
  themeProps?: ThemeProviderProps;
}) {
  return (
    <NextThemesProvider {...props.themeProps}>
      {props.children}
    </NextThemesProvider>
  );
}

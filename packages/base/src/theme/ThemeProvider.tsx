"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider(props: React.ComponentProps<typeof NextThemesProvider>) {
  const {
    children,
    attribute="class",
    defaultTheme="system",
    enableSystem = true,
    disableTransitionOnChange = true,
    ...rest
  } = props;

  return (
    <NextThemesProvider
      attribute={attribute}
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
      disableTransitionOnChange={disableTransitionOnChange}
      {...rest}
    >
      {children}
    </NextThemesProvider>
  );
}

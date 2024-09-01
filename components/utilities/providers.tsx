"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";

export const Providers = ({ children, ...props }: ThemeProviderProps) => {
  return (
    <NextThemesProvider {...props}>
      <TooltipProvider>{children}</TooltipProvider>
    </NextThemesProvider>
  );
};

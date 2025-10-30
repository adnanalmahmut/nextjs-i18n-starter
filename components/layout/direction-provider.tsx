// components/layout/DirectionBoundaryAuto.tsx
"use client";

import { PropsWithChildren } from "react";
import { DirectionProvider } from "@radix-ui/react-direction";
import { useI18nUI } from "@/i18n/use-i18n-ui";

export function DirectionBoundaryAuto({
  initialDir,
  children,
}: PropsWithChildren<{ initialDir: "rtl" | "ltr" }>) {
  const { dir } = useI18nUI();
  const effectiveDir = dir ?? initialDir;
  return <DirectionProvider dir={effectiveDir}>{children}</DirectionProvider>;
}

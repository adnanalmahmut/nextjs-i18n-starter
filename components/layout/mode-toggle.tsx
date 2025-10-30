"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslations } from "next-intl";

export function ModeToggle() {
  const { setTheme } = useTheme();
  const t = useTranslations("layout.mode");
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <span suppressHydrationWarning>
        <Button
          size="icon"
          className="
            inline-flex h-9 w-9 items-center justify-center rounded-xl
            border border-border bg-secondary/25 text-muted-foreground
          "
          aria-label={t("mode")}
          disabled
        >
          <Sun className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </span>
    );
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          className="
            inline-flex h-9 w-9 items-center justify-center rounded-xl
            border border-border
            bg-secondary/25 hover:bg-secondary/40
            text-muted-foreground hover:text-foreground
            transition will-change-transform hover:scale-[1.03]
            cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
          "
        >
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">{t("mode")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          {t("light")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          {t("dark")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          {t("system")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

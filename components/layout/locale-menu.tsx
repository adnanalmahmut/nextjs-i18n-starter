"use client";

import { useCallback, useMemo, useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Languages as LanguagesIcon, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SUPPORTED_LOCALES } from "@/i18n/constants";
import { getDir, baseOf } from "@/i18n/locales";
import React from "react";

function buildTarget(pathname: string, nextLocale: string, query?: string) {
  const segments = pathname.split("/").filter(Boolean);
  if (segments[0]?.length === 2) segments[0] = nextLocale;
  else segments.unshift(nextLocale);
  const base = "/" + segments.join("/");
  return query ? `${base}?${query}` : base;
}

export function LocaleMenu() {
  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const router = useRouter();
  const pathname = usePathname() ?? "/";
  const searchParams = useSearchParams();
  const locale = useLocale();
  const currentBase = baseOf(locale);
  const dir = getDir(locale);
  const t = useTranslations("layout.languages");

  const supported = useMemo(
    () => SUPPORTED_LOCALES.map((code) => ({ code, label: t(code) })),
    [t]
  );

  const onSelect = useCallback(
    (targetLocale: string) => {
      document.cookie = `NEXT_LOCALE=${targetLocale}; Max-Age=${
        60 * 60 * 24 * 365
      }; Path=/`;
      const href = buildTarget(
        pathname,
        targetLocale,
        searchParams?.toString()
      );
      router.push(href);
    },
    [pathname, router, searchParams]
  );

  if (!mounted) {
    return (
      <span suppressHydrationWarning>
        <Button
          size="icon"
          className="
            inline-flex h-9 w-9 items-center justify-center rounded-xl
            border border-border bg-secondary/25 text-muted-foreground
          "
          aria-label={dir === "rtl" ? "تبديل اللغة" : "Language switcher"}
          disabled
        >
          <LanguagesIcon className="h-[1.2rem] w-[1.2rem]" />
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
          aria-label={dir === "rtl" ? "تبديل اللغة" : "Language switcher"}
        >
          <LanguagesIcon className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">
            {dir === "rtl" ? "اللغة" : "Language"}
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="center" sideOffset={8}>
        {supported.map(({ code, label }) => {
          const active = code === currentBase;
          return (
            <DropdownMenuItem
              key={code}
              onClick={() => onSelect(code)}
              className="flex items-center justify-between gap-4"
            >
              <span className="truncate">{label}</span>
              {active && <Check className="h-4 w-4 opacity-80" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

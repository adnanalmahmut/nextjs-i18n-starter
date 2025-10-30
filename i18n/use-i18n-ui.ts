"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";
import { baseOf, getDir } from "@/i18n/locales";

export function useI18nUI() {
  const locale = useLocale();
  const dir = getDir(locale);

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("lang", locale);
    html.setAttribute("dir", dir);
    html.dataset.locale = String(baseOf(locale));
    html.dataset.dir = dir;
    document.body.dir = dir;
  }, [locale, dir]);

  return { locale, dir, isRTL: dir === "rtl" };
}

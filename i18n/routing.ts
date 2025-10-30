import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";
import { SUPPORTED_LOCALE_CODES, DEFAULT_LOCALE } from "@/i18n/constants";

export const routing = defineRouting({
  locales: SUPPORTED_LOCALE_CODES,
  defaultLocale: DEFAULT_LOCALE,
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);

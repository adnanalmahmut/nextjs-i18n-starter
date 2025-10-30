import {
  RTL_BASES,
  SUPPORTED_LOCALES,
  type SupportedLocale,
} from "@/i18n/constants";

export const normalizeLocale = (locale: string): string =>
  (locale || "en").toLowerCase().replace("_", "-");

export const baseOf = (locale: string): SupportedLocale | string =>
  normalizeLocale(locale).split("-")[0];

export const isRTL = (locale: string): boolean =>
  (RTL_BASES as readonly string[]).includes(baseOf(locale));

export const getDir = (locale: string): "rtl" | "ltr" =>
  isRTL(locale) ? "rtl" : "ltr";

export function isSupportedLocale(val: string): val is SupportedLocale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(val);
}

import { Languages } from "./languages.enum";

export const SUPPORTED_LOCALES = [
  Languages.ARABIC,
  Languages.ENGLISH,
] as const satisfies readonly Languages[];

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE = Languages.ARABIC;

export const RTL_BASES = ["ar", "fa", "ur", "he"] as const;

export const SUPPORTED_LOCALE_CODES = SUPPORTED_LOCALES.map(
  (l) => l
) as readonly string[];

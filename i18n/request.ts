import { getRequestConfig } from "next-intl/server";
import { isSupportedLocale } from "@/i18n/locales";
import { DEFAULT_LOCALE } from "@/i18n/constants";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !isSupportedLocale(locale)) {
    locale = DEFAULT_LOCALE;
  }
  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});

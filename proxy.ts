import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import {
  SUPPORTED_LOCALES,
  SUPPORTED_LOCALE_CODES,
  DEFAULT_LOCALE,
} from "@/i18n/constants";

const NEXT_LOCALE_COOKIE = "NEXT_LOCALE";

function pathHasLocale(pathname: string) {
  const seg = pathname.split("/")[1];
  return (SUPPORTED_LOCALES as readonly string[]).includes(seg);
}

const intl = createMiddleware({
  locales: SUPPORTED_LOCALE_CODES,
  defaultLocale: DEFAULT_LOCALE,
});

export default function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.includes(".") ||
    pathname.startsWith("/api")
  ) {
    return NextResponse.next();
  }

  if (!pathHasLocale(pathname)) {
    const cookieLocale = req.cookies.get(NEXT_LOCALE_COOKIE)?.value;
    const target =
      cookieLocale && pathHasLocale(`/${cookieLocale}`)
        ? `/${cookieLocale}${pathname}`
        : `/${DEFAULT_LOCALE}${pathname}`;
    return NextResponse.redirect(new URL(target, req.url));
  }

  return intl(req);
}

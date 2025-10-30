import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { getDir, baseOf, isSupportedLocale } from "@/i18n/locales";
import { DEFAULT_LOCALE } from "@/i18n/constants";
import { ThemeProvider } from "next-themes";
import "../globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { geometric } from "../fonts/geometric";
import { DirectionBoundaryAuto } from "@/components/layout/direction-provider";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: maybeLocale } = await params;
  const rawLocale = isSupportedLocale(maybeLocale)
    ? maybeLocale
    : DEFAULT_LOCALE;

  const messages = await getMessages({ locale: rawLocale });

  const dir = getDir(rawLocale);
  const base = String(baseOf(rawLocale));

  return (
    <html
      lang={rawLocale}
      dir={dir}
      data-locale={base}
      data-dir={dir}
      suppressHydrationWarning
    >
      <body
        className={`${geometric.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider locale={rawLocale} messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <DirectionBoundaryAuto initialDir={dir}>
              {children}
            </DirectionBoundaryAuto>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

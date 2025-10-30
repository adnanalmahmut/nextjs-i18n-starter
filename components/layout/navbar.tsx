"use client";

import Link from "next/link";
import { useMemo } from "react";
import { Github, Linkedin, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { LocaleMenu } from "./locale-menu";
import { ModeToggle } from "./mode-toggle";
import { useI18nUI } from "@/i18n/use-i18n-ui";

type NavLink = { href: string; label: string };

export default function Navbar({
  brand = "Adnan",
  links,
  showIcons = true,
}: {
  brand?: string;
  links?: NavLink[];
  showIcons?: boolean;
}) {
  const t = useTranslations("Hero");
  const { isRTL } = useI18nUI();

  const navLinks = useMemo<NavLink[]>(
    () =>
      links ?? [
        { href: "#about", label: t("nav.about") },
        { href: "#projects", label: t("nav.projects") },
        { href: "#contact", label: t("nav.contact") },
      ],
    [links, t]
  );

  return (
    <motion.nav
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mx-auto"
    >
      <div className="h-[84px]" aria-hidden />
      <div className="fixed left-1/2 top-4 z-50 w-[95%] max-w-6xl -translate-x-1/2">
        <div
          className="
            glass
            flex w-full items-center justify-between rounded-2xl
            border px-4 py-3
            shadow-[0_8px_48px_-12px_oklch(0_0_0/_0.45)]
          "
        >
          <Link href="#" className="group inline-flex items-center gap-2">
            <Sparkles className="h-5 w-5" style={{ color: "var(--primary)" }} />
            <span className="text-lg font-bold tracking-wide text-foreground group-hover:text-foreground">
              {t("brand") ?? brand}
            </span>
          </Link>
          <div className="hidden items-center gap-6 md:flex">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="group relative inline-block px-1 text-md text-muted-foreground transition-colors duration-300 hover:text-foreground"
              >
                {l.label}
                <span
                  className={`
                    absolute bottom-[-3px] left-0 h-[2px] w-full
                    origin-left scale-x-0 transition-transform duration-500
                    group-hover:scale-x-100
                    ${isRTL ? "origin-right" : "origin-left"}
                  `}
                  style={{ backgroundColor: "var(--primary)" }}
                />
              </Link>
            ))}
          </div>
          {showIcons && (
            <div className="flex items-center gap-2">
              <IconLink href="#" ariaLabel={t("icons.github")}>
                <Github className="h-5 w-5" />
              </IconLink>
              <IconLink href="#" ariaLabel={t("icons.linkedin")}>
                <Linkedin className="h-5 w-5" />
              </IconLink>

              <LocaleMenu />
              <ModeToggle />
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
}

function IconLink({
  href,
  ariaLabel,
  children,
}: {
  href: string;
  ariaLabel: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className="
        inline-flex h-9 w-9 items-center justify-center rounded-xl
        border border-border
        bg-secondary/25 hover:bg-secondary/40
        text-muted-foreground hover:text-foreground
        transition will-change-transform hover:scale-[1.03]
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
      "
    >
      {children}
    </Link>
  );
}

"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Download, Globe } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { profile } from "@/data/profile";
import { messages, type Locale } from "@/i18n/messages";
import { cn } from "@/lib/utils";
import { scrollToTarget, startScroll, stopScroll } from "@/lib/lenis";

const LOCALE_COOKIE = "sd-locale";

export function Navbar({ locale }: { locale: Locale }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const m = messages[locale];
  const homePath = `/${locale}`;

  const otherLocale: Locale = locale === "en" ? "fr" : "en";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      stopScroll();
      document.body.style.overflow = "hidden";
    } else {
      startScroll();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const onNavClick = (href: string) => {
    setOpen(false);
    if (isHome) {
      // Let the menu overlay close before scrolling.
      window.setTimeout(() => scrollToTarget(href), open ? 320 : 0);
    }
  };

  const langHref =
    pathname && pathname.startsWith(`/${locale}`)
      ? pathname.replace(`/${locale}`, `/${otherLocale}`)
      : `/${otherLocale}`;

  const isHome = pathname === homePath || pathname === `${homePath}/`;

  const navItems = [
    { href: "#work", label: m.nav.work },
    { href: "#about", label: m.nav.about },
    { href: "#experience", label: m.nav.experience },
    { href: "#contact", label: m.nav.contact },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[var(--z-nav)] transition-[background-color,border-color,backdrop-filter] duration-500",
          scrolled && !open
            ? "border-b border-line-soft bg-background/70 backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <nav
          className="container-x flex h-16 items-center justify-between md:h-20"
          aria-label={locale === "en" ? "Primary" : "Navigation principale"}
        >
          <a
            href={isHome ? "#top" : `${homePath}#top`}
            onClick={(e) => {
              if (!isHome) return;
              e.preventDefault();
              onNavClick("#top");
            }}
            className="group flex items-baseline gap-2"
          >
            <span className="label-tight text-foreground group-hover:text-accent">
              Steven Daye
            </span>
            <span className="hidden text-[0.5625rem] uppercase tracking-[0.22em] text-muted-2 transition-colors duration-300 group-hover:text-accent-soft sm:inline">
              Frontend
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={isHome ? item.href : `${homePath}${item.href}`}
                onClick={(e) => {
                  if (!isHome) return;
                  e.preventDefault();
                  onNavClick(item.href);
                }}
                className="nav-link label text-muted transition-colors duration-300 hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Right cluster: theme, language, CV, hire */}
          <div className="flex items-center gap-2 md:gap-3">
            <ThemeToggle
              lightLabel={m.nav.themeToLight}
              darkLabel={m.nav.themeToDark}
            />

            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={m.nav.github}
              title={m.nav.github}
              className="flex size-9 items-center justify-center rounded-full border border-line text-muted transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              <GithubIcon className="size-4" />
            </a>

            <a
              href={profile.linkedIn}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={m.nav.linkedin}
              title={m.nav.linkedin}
              className="flex size-9 items-center justify-center rounded-full border border-line text-muted transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              <LinkedinIcon className="size-4" />
            </a>

            <a
              href={langHref}
              onClick={() => {
                document.cookie = `${LOCALE_COOKIE}=${otherLocale};path=/;max-age=31536000;samesite=lax`;
              }}
              aria-label={m.nav.switchLang}
              title={m.nav.switchLang}
              className="inline-flex h-9 items-center gap-1.5 rounded-full border border-line px-3 label text-muted transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              <Globe className="size-3.5" aria-hidden />
              {otherLocale.toUpperCase()}
            </a>

            <a
              href="/cv/steven-daye-cv.pdf"
              download
              target="_blank"
              rel="noreferrer noopener"
              aria-label={m.nav.downloadCv}
              title={m.nav.downloadCv}
              className="hidden h-9 items-center gap-1.5 rounded-full border border-line px-4 label text-foreground transition-colors duration-300 hover:border-accent hover:bg-accent/10 md:inline-flex"
            >
              {m.nav.cv}
              <Download className="size-3.5 text-muted" aria-hidden />
            </a>

            <a
              href={`mailto:${profile.email}`}
              className="hidden h-9 items-center gap-1.5 rounded-full border border-line px-4 label text-foreground transition-colors duration-300 hover:border-accent hover:bg-accent/10 md:inline-flex"
            >
              {m.nav.hire}
              <ArrowUpRight
                className="size-3.5 text-muted transition-colors duration-300 group-hover:text-accent"
                aria-hidden
              />
            </a>

            {/* Mobile toggle */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? m.nav.menuClose : m.nav.menuOpen}
              className="relative z-[calc(var(--z-menu)+1)] flex size-10 flex-col items-center justify-center gap-1.5 md:hidden"
            >
              <span
                className={cn(
                  "h-px w-6 bg-foreground transition-transform duration-300",
                  open && "translate-y-[3.5px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "h-px w-6 bg-foreground transition-transform duration-300",
                  open && "-translate-y-[3.5px] -rotate-45",
                )}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-0 z-[var(--z-menu)] flex flex-col bg-background md:hidden",
          "transition-[opacity,visibility] duration-300",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
        aria-hidden={!open}
      >
        <nav className="container-x flex flex-1 flex-col justify-center gap-1 pb-10">
          {navItems.map((item, i) => (
            <a
              key={item.href}
              href={isHome ? item.href : `${homePath}${item.href}`}
              onClick={(e) => {
                if (!isHome) return;
                e.preventDefault();
                onNavClick(item.href);
              }}
              className="group flex items-baseline gap-4 border-b border-line-soft py-5"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <span className="label text-muted-2">0{i + 1}</span>
              <span className="display-medium text-foreground transition-colors duration-300 group-hover:text-accent">
                {item.label}
              </span>
            </a>
          ))}
        </nav>
        <div className="container-x flex flex-col gap-4 border-t border-line-soft py-8">
          <p className="label text-muted">{m.about.location}</p>
          <a
            href={`mailto:${profile.email}`}
            className="label text-accent underline-offset-4 hover:underline"
          >
            {profile.email}
          </a>
          <a
            href="/cv/steven-daye-cv.pdf"
            download
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 label text-foreground underline-offset-4 hover:underline"
          >
            {m.nav.downloadCv}
            <Download className="size-3.5 text-muted" aria-hidden />
          </a>
          <div className="flex items-center gap-3">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={m.nav.github}
              title={m.nav.github}
              className="flex size-10 items-center justify-center rounded-full border border-line text-muted transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              <GithubIcon className="size-4" />
            </a>
            <a
              href={profile.linkedIn}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={m.nav.linkedin}
              title={m.nav.linkedin}
              className="flex size-10 items-center justify-center rounded-full border border-line text-muted transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              <LinkedinIcon className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
"use client";

import { ArrowUp } from "lucide-react";
import { profile } from "@/data/profile";
import { messages, type Locale } from "@/i18n/messages";
import { scrollToTarget } from "@/lib/lenis";

export function Footer({ locale }: { locale: Locale }) {
  const year = new Date().getFullYear();
  const m = messages[locale];

  return (
    <footer className="border-t border-line-soft bg-background">
      <div className="container-x flex flex-col gap-10 py-14 md:py-16">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="flex flex-col gap-2">
            <p className="label-tight text-foreground">Steven Daye</p>
            <p className="text-sm text-muted">{m.footer.role}</p>
          </div>

          <div className="flex flex-col gap-2 text-sm text-muted">
            <p>{m.about.location}</p>
            <p>{m.about.availability}</p>
          </div>
        </div>

        <div className="hairline" />

        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <p className="label text-muted-2">
            © {year} Steven Daye · {m.footer.built}
          </p>

          <div className="flex items-center gap-6">
            <a
              href={profile.linkedIn}
              target="_blank"
              rel="noreferrer noopener"
              className="label text-muted transition-colors duration-300 hover:text-foreground"
            >
              LinkedIn
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer noopener"
              className="label text-muted transition-colors duration-300 hover:text-foreground"
            >
              GitHub
            </a>
            <button
              type="button"
              onClick={() => scrollToTarget("#top")}
              className="group inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 label text-foreground transition-colors duration-300 hover:border-accent hover:bg-accent/10"
            >
              {m.footer.top}
              <ArrowUp
                className="size-3.5 text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:text-accent"
                aria-hidden
              />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
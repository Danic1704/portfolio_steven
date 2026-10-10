"use client";

import { ArrowUpRight, Download } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Reveal } from "@/components/motion/Reveal";
import { profile } from "@/data/profile";
import { messages, type Locale } from "@/i18n/messages";

export function Contact({ locale }: { locale: Locale }) {
  const m = messages[locale];

  return (
    <section
      id="contact"
      className="section-y scroll-mt-24 border-t border-line-soft"
      aria-labelledby="contact-heading"
    >
      <Container>
        <div className="flex flex-col items-start gap-10 md:gap-14">
          <Reveal>
            <div>
              <h2
                id="contact-heading"
                className="display-hero text-foreground [font-size:clamp(3rem,9vw,8.5rem)]"
              >
                {m.contact.heading1}
                <span className="block text-accent">{m.contact.heading2}</span>
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="max-w-xl text-base leading-relaxed text-muted md:text-lg">
              {m.contact.supporting}
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-12">
              <MagneticButton strength={0.22}>
                <a
                  href={`mailto:${profile.email}`}
                  data-cursor="talk"
                  className="group inline-flex items-center gap-3 text-xl font-medium tracking-[-0.02em] text-foreground transition-colors duration-300 hover:text-accent md:text-2xl"
                >
                  {profile.email}
                  <ArrowUpRight
                    className="size-6 text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent"
                    aria-hidden
                  />
                </a>
              </MagneticButton>

              <div className="flex flex-wrap items-center gap-8">
                <a
                  href={profile.linkedIn}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="label text-muted transition-colors duration-300 hover:text-foreground"
                >
                  LinkedIn ↗
                </a>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="label text-muted transition-colors duration-300 hover:text-foreground"
                >
                  GitHub ↗
                </a>
                <a
                  href="/cv/steven-daye-cv.pdf"
                  download
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 label text-foreground transition-colors duration-300 hover:border-accent hover:bg-accent/10"
                >
                  {m.contact.downloadCv}
                  <Download
                    className="size-3.5 text-muted transition-colors duration-300 group-hover:text-accent"
                    aria-hidden
                  />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
"use client";

import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { messages, type Locale } from "@/i18n/messages";

export function Experience({ locale }: { locale: Locale }) {
  const m = messages[locale];

  return (
    <section
      id="experience"
      className="section-y scroll-mt-24"
      aria-labelledby="experience-heading"
    >
      <Container>
        <Reveal>
          <div className="mb-14 flex items-end justify-between gap-6 md:mb-20">
            <h2 id="experience-heading" className="display-section">
              {m.experience.heading}
            </h2>
            <span className="label hidden text-muted-2 sm:block">
              {m.experience.items.length.toString().padStart(2, "0")}{" "}
              {m.experience.counter}
            </span>
          </div>
        </Reveal>

        <div className="flex flex-col">
          {m.experience.items.map((entry) => (
            <Reveal key={entry.index} y={48}>
              <article className="group grid grid-cols-12 gap-x-6 gap-y-6 border-t border-line-soft py-10 transition-colors duration-500 last:border-b md:py-12">
                {/* Left rail — meta */}
                <div className="col-span-12 flex flex-row items-baseline justify-between md:col-span-3 md:flex-col md:items-start md:justify-start md:gap-2">
                  <span className="label text-accent">{entry.index}</span>
                  <span className="label-tight text-muted-2">
                    {entry.location}
                  </span>
                </div>

                {/* Body */}
                <div className="col-span-12 md:col-span-9">
                  <h3 className="display-medium text-foreground transition-colors duration-300 group-hover:text-accent">
                    {entry.title}
                  </h3>

                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                    {entry.summary}
                  </p>

                  <ul className="mt-6 flex max-w-2xl flex-col gap-2.5">
                    {entry.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex gap-3 text-sm leading-relaxed text-muted"
                      >
                        <span
                          className="mt-[0.6em] inline-block size-1 shrink-0 rounded-full bg-accent/70"
                          aria-hidden
                        />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {entry.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-line px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted transition-colors duration-300 group-hover:border-line"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
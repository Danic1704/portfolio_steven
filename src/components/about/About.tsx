"use client";

import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { messages, type Locale } from "@/i18n/messages";

export function About({ locale }: { locale: Locale }) {
  const m = messages[locale];

  return (
    <section id="about" className="section-y scroll-mt-24" aria-labelledby="about-heading">
      <Container>
        <Reveal>
          <h2 id="about-heading" className="label mb-10 text-muted md:mb-14">
            {m.about.heading}
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Statement */}
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-pretty text-xl font-medium leading-snug tracking-[-0.02em] text-foreground md:text-3xl md:leading-snug">
                {m.about.summary}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-10 flex flex-wrap gap-2">
                {m.about.focus.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-line px-3 py-1.5 label text-muted"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Facts */}
          <div className="lg:col-span-5">
            <div className="flex flex-col gap-8">
              <Reveal delay={0.05}>
                <div className="grid grid-cols-2 gap-8">
                  {m.about.stats.map((stat) => (
                    <div key={stat.label} className="flex flex-col gap-2">
                      <span className="display-medium text-foreground">
                        {stat.value}
                      </span>
                      <span className="label text-muted-2">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="hairline" />
                <div className="flex flex-col gap-5 pt-6">
                  <div className="flex flex-col gap-2">
                    <span className="label text-muted-2">
                      {m.about.languagesLabel}
                    </span>
                    <div className="flex flex-wrap gap-x-6 gap-y-1">
                      {m.about.languages.map((lang) => (
                        <span key={lang.name} className="text-sm text-foreground">
                          {lang.name}{" "}
                          <span className="text-muted">— {lang.level}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="label text-muted-2">
                      {m.about.locationLabel}
                    </span>
                    <p className="text-sm text-foreground">{m.about.location}</p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="label text-muted-2">
                      {m.about.availabilityLabel}
                    </span>
                    <p className="text-sm leading-relaxed text-muted">
                      {m.about.availability}
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
"use client";

import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { messages, type Locale } from "@/i18n/messages";

export function Principles({ locale }: { locale: Locale }) {
  const m = messages[locale];

  return (
    <section
      id="principles"
      className="section-y bg-surface/30"
      aria-labelledby="principles-heading"
    >
      <Container>
        <Reveal>
          <div className="mb-14 md:mb-20">
            <h2 id="principles-heading" className="display-section">
              {m.principles.heading}
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {m.principles.items.map((principle, i) => (
            <Reveal key={principle.index} delay={(i % 3) * 0.08}>
              <div className="group flex h-full flex-col gap-4 border-t border-line pt-6">
                <span className="label text-accent">{principle.index}</span>
                <h3 className="display-medium text-xl text-foreground md:text-2xl">
                  {principle.title}
                </h3>
                <p className="max-w-sm text-sm leading-relaxed text-muted">
                  {principle.summary}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
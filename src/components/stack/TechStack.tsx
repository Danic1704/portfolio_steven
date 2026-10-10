"use client";

import { useId, useState } from "react";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { messages, type Locale } from "@/i18n/messages";
import { cn } from "@/lib/utils";

export function TechStack({ locale }: { locale: Locale }) {
  const m = messages[locale];
  const [active, setActive] = useState(0);
  const titleId = useId();
  const current = m.stack.items[active];

  return (
    <section
      id="stack"
      className="section-y scroll-mt-24 bg-surface/30"
      aria-labelledby={titleId}
    >
      <Container>
        <Reveal>
          <div className="mb-14 flex items-end justify-between gap-6 md:mb-20">
            <h2 id={titleId} className="display-section">
              {m.stack.heading}
            </h2>
            <span className="label hidden text-muted-2 sm:block">
              {m.stack.counterHead} ·{" "}
              {m.stack.items.length.toString().padStart(2, "0")}
            </span>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Word wall */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3 lg:col-span-8">
            {m.stack.items.map((tech, i) => (
              <button
                key={tech.name}
                type="button"
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                aria-pressed={active === i}
                className={cn(
                  "group flex items-baseline justify-between gap-3 border-b border-line-soft py-5 text-left transition-opacity duration-300",
                  active !== i && "opacity-45 hover:opacity-80",
                )}
              >
                <span
                  className={cn(
                    "display-medium text-xl text-foreground transition-colors duration-300 md:text-2xl",
                    active === i && "text-accent",
                  )}
                >
                  {tech.name}
                </span>
                <span className="label text-muted-2">{tech.level}/5</span>
              </button>
            ))}
          </div>

          {/* Detail card */}
          <div className="lg:col-span-4">
            <div
              key={current.name}
              className="sticky top-28 flex flex-col gap-4 rounded-2xl border border-line bg-surface/80 p-7 md:p-8"
              aria-live="polite"
            >
              <span className="label text-accent-soft">
                {current.level}/5 · {m.stack.everyday}
              </span>
              <h3 className="display-medium text-foreground">{current.name}</h3>
              <p className="text-sm leading-relaxed text-muted">
                {current.note}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
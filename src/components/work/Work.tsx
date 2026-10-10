"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { messages, type Locale } from "@/i18n/messages";

export function Work({ locale }: { locale: Locale }) {
  const m = messages[locale];

  return (
    <section id="work" className="section-y scroll-mt-24" aria-labelledby="work-heading">
      <Container>
        <Reveal>
          <div className="mb-14 flex items-end justify-between gap-6 md:mb-20">
            <h2 id="work-heading" className="display-section">
              {m.work.heading}
            </h2>
            <span className="label hidden text-muted-2 sm:block">
              {m.work.counterHead} — {m.projects.length.toString().padStart(2, "0")}
            </span>
          </div>
        </Reveal>

        <div className="flex flex-col">
          {m.projects.map((project) => (
            <Reveal key={project.slug} y={48}>
              <Link
                href={`/${locale}/work/${project.slug}`}
                data-cursor="view"
                className="group relative block border-t border-line-soft py-10 transition-colors duration-500 last:border-b hover:bg-surface/60 md:py-14"
              >
                <div className="grid grid-cols-12 gap-4 md:gap-8">
                  {/* Index */}
                  <div className="col-span-2 md:col-span-1">
                    <span className="label text-muted-2 group-hover:text-accent">
                      {project.index}
                    </span>
                  </div>

                  {/* Name + kind */}
                  <div className="col-span-10 md:col-span-6">
                    <h3 className="display-medium text-foreground transition-colors duration-300 group-hover:text-accent">
                      {project.name}
                    </h3>
                    <p className="mt-2 text-sm text-muted">{project.kind}</p>
                  </div>

                  {/* Role + stack */}
                  <div className="col-span-12 flex flex-col gap-3 md:col-span-4">
                    <p className="label text-muted-2">{project.role}</p>
                    <p className="font-mono text-xs leading-relaxed text-muted">
                      {project.stack.slice(0, 4).join(" · ")}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="col-span-12 flex items-center justify-between md:col-span-1 md:justify-end">
                    <span className="label text-muted md:hidden">
                      {m.work.caseStudy}
                    </span>
                    <ArrowUpRight
                      className="size-8 text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent"
                      aria-hidden
                    />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
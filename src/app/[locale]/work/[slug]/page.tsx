import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { siteConfig } from "@/config/site";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { messages } from "@/i18n/messages";

type WorkPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    messages[locale].projects.map((project) => ({
      locale,
      slug: project.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: WorkPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const project = messages[locale].projects.find((p) => p.slug === slug);
  if (!project) return {};

  const canonical = `/${locale}/work/${slug}`;
  return {
    title: `${project.name} — ${project.kind}`,
    description: project.summary,
    alternates: {
      canonical,
      languages: {
        en: `/en/work/${slug}`,
        fr: `/fr/work/${slug}`,
        "x-default": `/en/work/${slug}`,
      },
    },
    openGraph: {
      title: `${project.name} — ${project.kind}`,
      description: project.summary,
      url: `${siteConfig.url}/${locale}/work/${slug}`,
      type: "article",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: locale === "fr" ? ["en_US"] : ["fr_FR"],
    },
  };
}

function Section({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="grid grid-cols-12 gap-x-6 gap-y-4 border-t border-line-soft py-10 md:py-12">
      <div className="col-span-12 md:col-span-3">
        <h2 className="label text-muted-2">{label}</h2>
      </div>
      <div className="col-span-12 md:col-span-9">{children}</div>
    </div>
  );
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const currentLocale: Locale = locale;
  const m = messages[currentLocale];

  const project = m.projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const index = m.projects.findIndex((p) => p.slug === slug);
  const next = m.projects[(index + 1) % m.projects.length];

  return (
    <article className="section-y">
      <Container>
        {/* Header */}
        <header className="mb-16 md:mb-24">
          <Link
            href={`/${currentLocale}/#work`}
            className="group mb-10 inline-flex items-center gap-2 label text-muted transition-colors duration-300 hover:text-foreground md:mb-14"
          >
            <ArrowLeft
              className="size-4 transition-transform duration-300 group-hover:-translate-x-1"
              aria-hidden
            />
            {m.caseStudy.back}
          </Link>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <span className="label text-accent">{project.index}</span>
              <span className="label text-muted-2">{project.kind}</span>
            </div>
            <h1 className="display-section">{project.name}</h1>
            <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted md:text-lg">
              {project.summary}
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-2 md:mt-12">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-line px-3 py-1.5 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted"
              >
                {tech}
              </span>
            ))}
          </div>
        </header>

        {/* Body */}
        <div className="flex flex-col">
          <Section label={m.caseStudy.role}>{project.role}</Section>
          <Section label={m.caseStudy.context}>
            <p className="max-w-2xl text-pretty text-base leading-relaxed text-foreground md:text-lg">
              {project.context}
            </p>
          </Section>
          <Section label={m.caseStudy.challenge}>
            <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted">
              {project.challenge}
            </p>
          </Section>
          <Section label={m.caseStudy.approach}>
            <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted">
              {project.approach}
            </p>
          </Section>
          <Section label={m.caseStudy.architecture}>
            <ul className="flex max-w-2xl flex-col gap-3">
              {project.architecture.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted md:text-base">
                  <span
                    className="mt-[0.6em] inline-block size-1 shrink-0 rounded-full bg-accent/70"
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Section>
          <Section label={m.caseStudy.implementation}>
            <ul className="flex max-w-2xl flex-col gap-3">
              {project.implementation.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted md:text-base">
                  <span
                    className="mt-[0.6em] inline-block size-1 shrink-0 rounded-full bg-accent-soft/70"
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Section>
          <Section label={m.caseStudy.impact}>
            <ul className="flex max-w-2xl flex-col gap-3">
              {project.impact.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-foreground md:text-base">
                  <span
                    className="mt-[0.6em] inline-block size-1 shrink-0 rounded-full bg-accent"
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Section>
        </div>

        {/* Next project */}
        <div className="mt-16 border-t border-line py-12 md:mt-24">
          <MagneticButton className="inline-block">
            <Link
              href={`/${currentLocale}/work/${next.slug}`}
              data-cursor="view"
              className="group flex items-center gap-6"
            >
              <div className="flex flex-col gap-2">
                <span className="label text-muted-2">{m.caseStudy.next}</span>
                <span className="display-medium text-foreground transition-colors duration-300 group-hover:text-accent">
                  {next.name}
                </span>
              </div>
              <ArrowUpRight
                className="size-8 text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent"
                aria-hidden
              />
            </Link>
          </MagneticButton>
        </div>
      </Container>
    </article>
  );
}
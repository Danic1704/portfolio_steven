import { notFound } from "next/navigation";
import { About } from "@/components/about/About";
import { Contact } from "@/components/contact/Contact";
import { Experience } from "@/components/experience/Experience";
import { Hero } from "@/components/hero/Hero";
import { Principles } from "@/components/principles/Principles";
import { TechStack } from "@/components/stack/TechStack";
import { Work } from "@/components/work/Work";
import { isLocale } from "@/i18n/config";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function LocaleHomePage({ params }: HomePageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <Hero locale={locale} />
      <Work locale={locale} />
      <Principles locale={locale} />
      <Experience locale={locale} />
      <TechStack locale={locale} />
      <About locale={locale} />
      <Contact locale={locale} />
    </>
  );
}
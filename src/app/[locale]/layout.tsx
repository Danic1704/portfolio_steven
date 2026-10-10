import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/motion/CustomCursor";
import { SmoothScroll } from "@/components/smooth/SmoothScroll";
import { siteConfig } from "@/config/site";
import { profile } from "@/data/profile";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { messages } from "@/i18n/messages";
import { THEME_INIT_SCRIPT } from "@/lib/theme";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const m = messages[locale];

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: m.meta.title,
      template: `%s — ${siteConfig.name}`,
    },
    description: m.meta.description,
    keywords: m.meta.keywords,
    authors: [{ name: siteConfig.name, url: profile.linkedIn }],
    creator: siteConfig.name,
    alternates: {
      canonical: `/${locale}`,
      languages: { en: "/en", fr: "/fr", "x-default": "/en" },
    },
    openGraph: {
      type: "website",
      url: `${siteConfig.url}/${locale}`,
      title: m.meta.title,
      description: m.meta.description,
      siteName: siteConfig.name,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: locale === "fr" ? ["en_US"] : ["fr_FR"],
    },
    twitter: {
      card: "summary_large_image",
      title: m.meta.title,
      description: m.meta.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F5F4F0" },
    { media: "(prefers-color-scheme: dark)", color: "#080A0D" },
  ],
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: "Senior Frontend Engineer & Frontend Technical Lead",
  email: `mailto:${profile.email}`,
  telephone: profile.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cotonou",
    addressCountry: "BJ",
  },
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "Frontend Architecture",
    "Technical Leadership",
    "Full-stack Development",
  ],
  sameAs: [profile.linkedIn, profile.github],
  url: siteConfig.url,
};

const webSiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
};

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const current: Locale = locale;

  return (
    <html
      lang={current}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh bg-background text-foreground" suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
        />
        <SmoothScroll>
          <div id="top" className="flex min-h-dvh flex-col">
            <CustomCursor />
            <Navbar locale={current} />
            <main className="flex-1">{children}</main>
            <Footer locale={current} />
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}

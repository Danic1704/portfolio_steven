import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { locales } from "@/i18n/config";
import { messages } from "@/i18n/messages";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    const languages: Record<string, string> = {
      en: `${base}/en`,
      fr: `${base}/fr`,
      "x-default": `${base}/en`,
    };

    entries.push({
      url: `${base}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages },
    });

    for (const project of messages[locale].projects) {
      entries.push({
        url: `${base}/${locale}/work/${project.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: {
          languages: {
            en: `${base}/en/work/${project.slug}`,
            fr: `${base}/fr/work/${project.slug}`,
            "x-default": `${base}/en/work/${project.slug}`,
          },
        },
      });
    }
  }

  return entries;
}
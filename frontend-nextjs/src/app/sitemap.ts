import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://atlasdigitalize.com";

  const staticPages = [
    "",
    "/about",
    "/solutions",
    "/case-studies",
    "/insights",
    "/contact",
  ];

  const languages = ["en", "id"];

  const routes: MetadataRoute.Sitemap = [];

  // Add static pages for each language
  languages.forEach((lang) => {
    staticPages.forEach((page) => {
      routes.push({
        url: `${baseUrl}/${lang}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1 : 0.8,
        alternates: {
          languages: {
            en: `${baseUrl}/en${page}`,
            id: `${baseUrl}/id${page}`,
          },
        },
      });
    });
  });

  return routes;
}

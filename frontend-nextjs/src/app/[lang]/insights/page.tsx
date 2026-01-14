import { Metadata } from "next";
import InsightsPageClient from "@/components/pages/InsightsPageClient";
import { companyInfo } from "@/lib/data";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const isIndonesian = lang === "id";

  return {
    title: isIndonesian ? "Insight & Artikel" : "Insights & Articles",
    description: isIndonesian
      ? "Baca artikel dan insight terbaru tentang transformasi digital, strategi teknologi, dan pengembangan software untuk bisnis Anda."
      : "Read the latest articles and insights about digital transformation, technology strategy, and software development for your business.",
    openGraph: {
      title: isIndonesian
        ? "Insight & Artikel | Atlas Digitalize"
        : "Insights & Articles | Atlas Digitalize",
      description: isIndonesian
        ? "Artikel terbaru tentang transformasi digital dan strategi teknologi"
        : "Latest articles on digital transformation and technology strategy",
    },
  };
}

export default async function InsightsPage({ params }: PageProps) {
  const { lang } = await params;
  const isIndonesian = lang === "id";

  // CollectionPage JSON-LD for insights listing
  const collectionPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: isIndonesian ? "Insight & Artikel" : "Insights & Articles",
    description: isIndonesian
      ? "Artikel terbaru tentang transformasi digital dan strategi teknologi"
      : "Latest articles on digital transformation and technology strategy",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://atlasdigitalize.com"}/${lang}/insights`,
    publisher: {
      "@type": "Organization",
      name: companyInfo.name,
      logo: {
        "@type": "ImageObject",
        url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://atlasdigitalize.com"}/images/atlas-digitalize-logo.png`,
      },
    },
  };

  // BreadcrumbList JSON-LD
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: isIndonesian ? "Beranda" : "Home",
        item: `${process.env.NEXT_PUBLIC_SITE_URL || "https://atlasdigitalize.com"}/${lang}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: isIndonesian ? "Insight" : "Insights",
        item: `${process.env.NEXT_PUBLIC_SITE_URL || "https://atlasdigitalize.com"}/${lang}/insights`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <InsightsPageClient />
    </>
  );
}

import { Metadata } from "next";
import {
  HeroSection,
  TrustStrip,
  PhilosophySection,
  ExpertiseSection,
  HowWeWorkSection,
  ProjectsSection,
  ClientsSection,
  InsightsSection,
  FinalCtaSection,
} from "@/components/sections";
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
    title: isIndonesian
      ? "Beranda | Atlas Digitalize"
      : "Home | Atlas Digitalize",
    description: isIndonesian
      ? "Atlas Digitalize - Partner terpercaya untuk konsultasi TI dan pengembangan software kustom. Kami membantu bisnis bertransformasi digital dengan solusi yang tepat."
      : "Atlas Digitalize - Your trusted partner for IT consulting and custom software development. We help businesses transform digitally with the right solutions.",
    openGraph: {
      title: isIndonesian
        ? "Atlas Digitalize | Konsultasi TI & Software Kustom"
        : "Atlas Digitalize | IT Consulting & Custom Software",
      description: isIndonesian
        ? "Partner terpercaya untuk transformasi digital bisnis Anda"
        : "Your trusted partner for digital transformation",
      type: "website",
    },
  };
}

export default function HomePage() {
  // Organization JSON-LD for the homepage
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: companyInfo.name,
    alternateName: companyInfo.shortName,
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://atlasdigitalize.com",
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://atlasdigitalize.com"}/images/atlas-digitalize-logo.png`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: companyInfo.phone,
      contactType: "customer service",
      email: companyInfo.email,
      availableLanguage: ["English", "Indonesian"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: companyInfo.address,
      addressCountry: "ID",
    },
    sameAs: [companyInfo.linkedin, companyInfo.instagram],
  };

  // WebSite JSON-LD for search box feature
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: companyInfo.name,
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://atlasdigitalize.com",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL || "https://atlasdigitalize.com"}/insights?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      {/* Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      {/* WebSite Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <HeroSection />
      <TrustStrip />
      <PhilosophySection />
      <ExpertiseSection />
      <HowWeWorkSection />
      <ProjectsSection />
      <ClientsSection />
      <InsightsSection />
      <FinalCtaSection />
    </>
  );
}

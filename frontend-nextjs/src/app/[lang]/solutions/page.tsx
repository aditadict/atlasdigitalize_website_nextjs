import { Metadata } from "next";
import SolutionsPageClient from "@/components/pages/SolutionsPageClient";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const isIndonesian = lang === "id";

  return {
    title: isIndonesian ? "Solusi" : "Solutions",
    description: isIndonesian
      ? "Jelajahi solusi TI kustom kami: ERP, HRIS, POS, WMS, DMS, integrasi sistem, dan pengembangan web strategis untuk bisnis Anda."
      : "Explore our custom IT solutions: ERP, HRIS, POS, WMS, DMS, system integration, and strategic web development for your business.",
    openGraph: {
      title: isIndonesian
        ? "Solusi IT Kustom | Atlas Digitalize"
        : "Custom IT Solutions | Atlas Digitalize",
      description: isIndonesian
        ? "Sistem kustom yang dirancang untuk kebutuhan bisnis Anda"
        : "Custom-built systems designed for your business needs",
    },
  };
}

export default function SolutionsPage() {
  return <SolutionsPageClient />;
}

import { Metadata } from "next";
import CaseStudiesPageClient from "@/components/pages/CaseStudiesPageClient";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const isIndonesian = lang === "id";

  return {
    title: isIndonesian ? "Studi Kasus" : "Case Studies",
    description: isIndonesian
      ? "Jelajahi proyek dan implementasi terbaru kami. Lihat bagaimana kami telah membantu perusahaan mentransformasi operasi mereka dengan solusi teknologi yang tepat."
      : "Explore our recent projects and implementations. See how we've helped companies transform their operations with the right technology solutions.",
    openGraph: {
      title: isIndonesian
        ? "Studi Kasus | Atlas Digitalize"
        : "Case Studies | Atlas Digitalize",
      description: isIndonesian
        ? "Solusi nyata untuk tantangan bisnis nyata"
        : "Real solutions for real business challenges",
    },
  };
}

export default function CaseStudiesPage() {
  return <CaseStudiesPageClient />;
}

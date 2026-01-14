import { Metadata } from "next";
import AboutPageClient from "@/components/pages/AboutPageClient";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const isIndonesian = lang === "id";

  return {
    title: isIndonesian ? "Tentang Kami" : "About Us",
    description: isIndonesian
      ? "Pelajari tentang Atlas Digitalize - Mitra terpercaya untuk konsultasi TI dan pengembangan software kustom dengan pendekatan konsultasi-pertama."
      : "Learn about Atlas Digitalize - Your trusted partner for IT consulting and custom software development with a consulting-first approach.",
    openGraph: {
      title: isIndonesian
        ? "Tentang Atlas Digitalize"
        : "About Atlas Digitalize",
      description: isIndonesian
        ? "Mitra terpercaya untuk transformasi digital bisnis Anda"
        : "Your trusted partner for digital transformation",
    },
  };
}

export default function AboutPage() {
  return <AboutPageClient />;
}

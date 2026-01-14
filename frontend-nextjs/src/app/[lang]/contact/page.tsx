import { Metadata } from "next";
import ContactPageClient from "@/components/pages/ContactPageClient";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const isIndonesian = lang === "id";

  return {
    title: isIndonesian ? "Hubungi Kami" : "Contact Us",
    description: isIndonesian
      ? "Hubungi Atlas Digitalize untuk konsultasi gratis tentang kebutuhan transformasi digital dan pengembangan software kustom Anda."
      : "Contact Atlas Digitalize for a free consultation about your digital transformation and custom software development needs.",
    openGraph: {
      title: isIndonesian
        ? "Hubungi Kami | Atlas Digitalize"
        : "Contact Us | Atlas Digitalize",
      description: isIndonesian
        ? "Mulai transformasi digital bisnis Anda dengan konsultasi gratis"
        : "Start your business digital transformation with a free consultation",
    },
  };
}

export default function ContactPage() {
  return <ContactPageClient />;
}

import { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { LanguageProvider } from "@/context/LanguageContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/common/BackToTop";
import AppWrapper from "@/components/common/AppWrapper";

type Language = "en" | "id";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "id" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isIndonesian = lang === "id";

  return {
    title: {
      default: isIndonesian
        ? "Atlas Digitalize | Konsultasi TI & Solusi Software Kustom"
        : "Atlas Digitalize | IT Consulting & Custom Software Solutions",
      template: isIndonesian ? "%s | Atlas Digitalize" : "%s | Atlas Digitalize",
    },
    description: isIndonesian
      ? "Transformasi bisnis Anda dengan konsultasi TI ahli dan solusi software kustom. Aplikasi enterprise, integrasi sistem, dan layanan transformasi digital."
      : "Transform your business with expert IT consulting and custom software solutions. Enterprise applications, system integration, and digital transformation services.",
    alternates: {
      canonical: `/${lang}`,
      languages: {
        en: "/en",
        id: "/id",
      },
    },
    openGraph: {
      locale: isIndonesian ? "id_ID" : "en_US",
    },
  };
}

export default async function LangLayout({ children, params }: LayoutProps) {
  const { lang } = await params;
  const language = (lang === "id" ? "id" : "en") as Language;

  return (
    <LanguageProvider lang={language}>
      <AppWrapper>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <BackToTop />
        <Toaster position="top-right" />
      </AppWrapper>
    </LanguageProvider>
  );
}

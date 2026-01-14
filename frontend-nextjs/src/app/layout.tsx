import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Atlas Digitalize | IT Consulting & Custom Software Solutions",
    template: "%s | Atlas Digitalize",
  },
  description:
    "Transform your business with expert IT consulting and custom software solutions. Enterprise applications, system integration, and digital transformation services.",
  keywords: [
    "IT consulting",
    "custom software",
    "enterprise applications",
    "digital transformation",
    "system integration",
    "business solutions",
    "software development",
    "ERP systems",
    "Indonesia",
  ],
  authors: [{ name: "Atlas Digitalize" }],
  creator: "Atlas Digitalize",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://atlasdigitalize.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "id_ID",
    siteName: "Atlas Digitalize",
    title: "Atlas Digitalize | IT Consulting & Custom Software Solutions",
    description:
      "Transform your business with expert IT consulting and custom software solutions.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Atlas Digitalize | IT Consulting & Custom Software Solutions",
    description:
      "Transform your business with expert IT consulting and custom software solutions.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${inter.variable}`}>
      <body className="font-sans antialiased bg-slate-950 text-slate-50">
        {children}
      </body>
    </html>
  );
}

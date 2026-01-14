import { Metadata } from "next";
import InsightDetailClient from "@/components/pages/InsightDetailClient";
import { getInsightBySlug } from "@/lib/api";

interface PageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const isIndonesian = lang === "id";

  try {
    const insight = await getInsightBySlug(slug);
    const seo = insight.seo;
    
    // Use SEO data from API (which already has fallback to dynamic data from backend)
    const title = seo?.title || insight.title[lang as "en" | "id"] || insight.title.en;
    const description = seo?.description || insight.excerpt[lang as "en" | "id"] || insight.excerpt.en;
    const image = seo?.image || (insight.featured_image ? `${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')}/storage/${insight.featured_image}` : undefined);
    
    return {
      title,
      description,
      authors: seo?.author ? [{ name: seo.author }] : [{ name: "Atlas Digitalize" }],
      robots: seo?.robots || "index, follow",
      openGraph: {
        title,
        description,
        type: "article",
        publishedTime: seo?.published_time || insight.created_at,
        modifiedTime: seo?.modified_time || insight.updated_at,
        authors: seo?.author ? [seo.author] : ["Atlas Digitalize"],
        section: seo?.section || (typeof insight.category === 'object' ? insight.category[lang as "en" | "id"] || insight.category.en : insight.category),
        images: image ? [{ url: image }] : undefined,
        locale: isIndonesian ? "id_ID" : "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: image ? [image] : undefined,
      },
    };
  } catch {
    return {
      title: isIndonesian ? "Artikel Tidak Ditemukan" : "Article Not Found",
      description: isIndonesian
        ? "Artikel yang Anda cari tidak ditemukan."
        : "The article you are looking for was not found.",
    };
  }
}

export default async function InsightDetailPage({ params }: PageProps) {
  const { slug } = await params;
  
  return <InsightDetailClient slug={slug} />;
}

"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { getInsightBySlug, getRelatedInsights, type Insight } from "@/lib/api";
import { getImageUrl } from "@/lib/utils";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import {
  Clock,
  Tag,
  ArrowLeft,
  ArrowRight,
  Loader2,
  Share2,
  Twitter,
  Linkedin,
  Facebook,
  Copy,
  Check,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";

interface InsightDetailClientProps {
  slug: string;
}

export default function InsightDetailClient({ slug }: InsightDetailClientProps) {
  const { language, basePath } = useLanguage();
  const [insight, setInsight] = useState<Insight | null>(null);
  const [relatedInsights, setRelatedInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [readingProgress, setReadingProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [feedbackStats, setFeedbackStats] = useState({
    helpful_count: 0,
    not_helpful_count: 0,
  });
  const [userFeedback, setUserFeedback] = useState<boolean | null>(null);
  const [feedbackLoading, setFeedbackLoading] = useState(false);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000";

  // Reading progress tracker
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setReadingProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Share functionality
  const handleShare = async (platform?: string) => {
    if (!insight) return;
    
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(insight.title[language]);

    let shareUrl;
    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      default:
        if (navigator.share) {
          try {
            await navigator.share({
              title: insight.title[language],
              url: window.location.href,
            });
          } catch (error) {
            console.log("Error sharing:", error);
          }
        } else {
          navigator.clipboard.writeText(window.location.href);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400");
    }
  };

  // Feedback functionality
  const handleFeedback = async (isHelpful: boolean) => {
    setFeedbackLoading(true);
    try {
      const response = await fetch(
        `${backendUrl}/api/insights/${slug}/feedback`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ is_helpful: isHelpful }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setFeedbackStats({
          helpful_count: data.helpful_count,
          not_helpful_count: data.not_helpful_count,
        });
        setUserFeedback(isHelpful);
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
    } finally {
      setFeedbackLoading(false);
    }
  };

  useEffect(() => {
    const fetchInsight = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getInsightBySlug(slug);
        setInsight(data);

        const related = await getRelatedInsights(slug);
        setRelatedInsights(related);

        try {
          const feedbackResponse = await fetch(
            `${backendUrl}/api/insights/${slug}/feedback-stats`
          );
          if (feedbackResponse.ok) {
            const feedbackData = await feedbackResponse.json();
            setFeedbackStats({
              helpful_count: feedbackData.helpful_count,
              not_helpful_count: feedbackData.not_helpful_count,
            });
          }
        } catch (error) {
          console.error("Error fetching feedback stats:", error);
        }
      } catch (err) {
        console.error("Error fetching insight:", err);
        setError(
          language === "en" ? "Article not found" : "Artikel tidak ditemukan"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchInsight();
  }, [slug, language, backendUrl]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 size={40} className="text-cyan-400 animate-spin" />
      </div>
    );
  }

  if (error || !insight) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="mb-4 text-xl text-red-400">{error}</p>
        <Link
          href={`${basePath}/insights`}
          className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
        >
          <ArrowLeft size={20} />
          {language === "en" ? "Back to Insights" : "Kembali ke Insight"}
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* JSON-LD Structured Data */}
      <ArticleJsonLd
        title={insight.title[language]}
        description={
          insight.seo?.description ||
          insight.excerpt?.[language] ||
          insight.excerpt?.en ||
          ""
        }
        image={getImageUrl(insight.featured_image)}
        datePublished={insight.created_at || new Date().toISOString()}
        dateModified={insight.updated_at || insight.created_at || new Date().toISOString()}
        author={insight.seo?.author}
        section={
          typeof insight.category === "object"
            ? insight.category[language] || insight.category.en
            : insight.category
        }
        url={typeof window !== "undefined" ? window.location.href : ""}
        wordCount={
          insight.content?.[language]
            ? insight.content[language].replace(/<[^>]*>/g, "").split(/\s+/).length
            : undefined
        }
      />
      <BreadcrumbJsonLd
        items={[
          {
            name: language === "en" ? "Home" : "Beranda",
            url: typeof window !== "undefined" ? window.location.origin : "",
          },
          {
            name: language === "en" ? "Insights" : "Insight",
            url:
              typeof window !== "undefined"
                ? `${window.location.origin}${basePath}/insights`
                : "",
          },
          {
            name: insight.title[language],
            url: typeof window !== "undefined" ? window.location.href : "",
          },
        ]}
      />

      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 z-50 w-full h-1 bg-slate-800">
        <div
          className="h-full transition-all duration-150 bg-gradient-to-r from-cyan-500 to-blue-500"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20" />
          <div className="absolute top-0 rounded-full left-1/4 w-96 h-96 bg-cyan-500/30 blur-3xl" />
          <div className="absolute bottom-0 rounded-full right-1/4 w-96 h-96 bg-blue-500/30 blur-3xl" />
        </div>

        <div className="relative max-w-4xl px-4 mx-auto sm:px-6 lg:px-8">
          <Link
            href={`${basePath}/insights`}
            className="flex items-center gap-2 mb-8 transition-all duration-300 group text-cyan-400 hover:text-cyan-300"
          >
            <ArrowLeft
              size={20}
              className="transition-transform group-hover:-translate-x-1"
            />
            {language === "en" ? "Back to Insights" : "Kembali ke Insight"}
          </Link>

          {/* Category Badge */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 text-sm font-semibold border border-cyan-500/30">
              <Tag size={14} />
              {typeof insight.category === "object"
                ? insight.category[language] || insight.category.en
                : insight.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="mb-8 text-4xl font-bold leading-tight text-transparent sm:text-5xl lg:text-6xl bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text">
            {insight.title[language]}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 mb-12 text-slate-300">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-cyan-400" />
              <span className="text-sm">
                {insight.read_time}{" "}
                {language === "en" ? "min read" : "menit baca"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">
                {language === "id"
                  ? insight.formatted_date_id
                  : insight.formatted_date_en}
              </span>
            </div>
            <button
              onClick={() => handleShare()}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-colors text-sm"
            >
              {copied ? (
                <Check size={16} className="text-green-400" />
              ) : (
                <Share2 size={16} />
              )}
              {copied
                ? language === "en"
                  ? "Copied!"
                  : "Tersalin!"
                : language === "en"
                ? "Share"
                : "Bagikan"}
            </button>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-4xl px-4 mx-auto sm:px-6 lg:px-8">
          {/* Featured Image */}
          {insight.featured_image && (
            <div className="relative w-full h-64 mb-12 overflow-hidden md:h-96 rounded-2xl">
              <Image
                src={getImageUrl(insight.featured_image) || ""}
                alt={insight.title[language]}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Article Content */}
          <article
            className="prose prose-lg prose-invert max-w-none prose-headings:text-white prose-p:text-slate-300 prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-code:text-cyan-400 prose-pre:bg-slate-800 prose-blockquote:border-cyan-500 prose-blockquote:text-slate-400"
            dangerouslySetInnerHTML={{
              __html: insight.content?.[language] || "",
            }}
          />

          {/* Feedback Section */}
          <div className="mt-16 p-8 rounded-2xl bg-slate-800/30 border border-slate-700/50">
            <h3 className="text-xl font-semibold text-white mb-4 text-center">
              {language === "en"
                ? "Was this article helpful?"
                : "Apakah artikel ini membantu?"}
            </h3>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => handleFeedback(true)}
                disabled={feedbackLoading || userFeedback !== null}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-200 ${
                  userFeedback === true
                    ? "bg-green-500/20 text-green-400 border border-green-500/50"
                    : "bg-slate-700/50 text-slate-300 hover:bg-slate-600/50"
                } disabled:opacity-50`}
              >
                <ThumbsUp size={20} />
                <span>{feedbackStats.helpful_count}</span>
              </button>
              <button
                onClick={() => handleFeedback(false)}
                disabled={feedbackLoading || userFeedback !== null}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-200 ${
                  userFeedback === false
                    ? "bg-red-500/20 text-red-400 border border-red-500/50"
                    : "bg-slate-700/50 text-slate-300 hover:bg-slate-600/50"
                } disabled:opacity-50`}
              >
                <ThumbsDown size={20} />
                <span>{feedbackStats.not_helpful_count}</span>
              </button>
            </div>
          </div>

          {/* Share Buttons */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <span className="text-slate-400">
              {language === "en" ? "Share this article:" : "Bagikan artikel ini:"}
            </span>
            <button
              onClick={() => handleShare("twitter")}
              className="p-3 rounded-lg bg-slate-800/50 text-slate-400 hover:bg-cyan-500/20 hover:text-cyan-400 transition-all duration-200"
            >
              <Twitter size={20} />
            </button>
            <button
              onClick={() => handleShare("linkedin")}
              className="p-3 rounded-lg bg-slate-800/50 text-slate-400 hover:bg-cyan-500/20 hover:text-cyan-400 transition-all duration-200"
            >
              <Linkedin size={20} />
            </button>
            <button
              onClick={() => handleShare("facebook")}
              className="p-3 rounded-lg bg-slate-800/50 text-slate-400 hover:bg-cyan-500/20 hover:text-cyan-400 transition-all duration-200"
            >
              <Facebook size={20} />
            </button>
            <button
              onClick={() => handleShare()}
              className="p-3 rounded-lg bg-slate-800/50 text-slate-400 hover:bg-cyan-500/20 hover:text-cyan-400 transition-all duration-200"
            >
              <Copy size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedInsights.length > 0 && (
        <section className="py-16 bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-white mb-8">
              {language === "en" ? "Related Articles" : "Artikel Terkait"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedInsights.map((article) => (
                <Link
                  key={article.id}
                  href={`${basePath}/insights/${article.slug}`}
                  className="group bg-slate-800/30 border border-slate-700/50 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-3 text-sm text-slate-500">
                      <span>
                        {language === "id"
                          ? article.formatted_date_id
                          : article.formatted_date_en}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {article.read_time}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors duration-200 line-clamp-2">
                      {article.title[language]}
                    </h3>
                    <div className="mt-4 flex items-center text-sm font-medium text-cyan-400">
                      <span className="mr-2">
                        {language === "en" ? "Read more" : "Baca selengkapnya"}
                      </span>
                      <ArrowRight
                        size={16}
                        className="group-hover:translate-x-1 transition-transform duration-200"
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

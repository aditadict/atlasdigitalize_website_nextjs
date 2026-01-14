import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { getInsightBySlug, getRelatedInsights } from "../../services/api";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
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
  Instagram,
  Copy,
  Check,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";

const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "http://127.0.0.1:8000";

// Helper function to construct image URLs
const getImageUrl = (imagePath) => {
  if (!imagePath) return null;

  // Handle both absolute URLs and relative paths from Filament
  if (imagePath.startsWith("http")) {
    return imagePath;
  }

  // For Filament uploads like "insights/filename.png"
  const cleanPath = imagePath.startsWith("/") ? imagePath.slice(1) : imagePath;
  const fullUrl = `${BACKEND_URL}/storage/${cleanPath}`;

  console.log("Image URL constructed:", fullUrl); // Debug log
  return fullUrl;
};

const InsightDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [insight, setInsight] = useState(null);
  const [relatedInsights, setRelatedInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [readingProgress, setReadingProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [feedbackStats, setFeedbackStats] = useState({
    helpful_count: 0,
    not_helpful_count: 0,
  });
  const [userFeedback, setUserFeedback] = useState(null);
  const [feedbackLoading, setFeedbackLoading] = useState(false);

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
  const handleShare = async (platform) => {
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
      case "instagram":
        // Instagram doesn't support direct URL sharing, copy to clipboard instead
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        return;
      default:
        // Generic share or copy
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
  const handleFeedback = async (isHelpful) => {
    setFeedbackLoading(true);
    try {
      const response = await fetch(
        `${
          process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000/api"
        }/insights/${slug}/feedback`,
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

        // Fetch related insights
        const related = await getRelatedInsights(slug);
        setRelatedInsights(related);

        // Fetch feedback stats
        try {
          const feedbackResponse = await fetch(
            `${
              process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000/api"
            }/insights/${slug}/feedback-stats`
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
  }, [slug, language]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950">
        <Header />
        <div className="flex items-center justify-center min-h-screen pt-20">
          <Loader2 size={40} className="text-cyan-400 animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !insight) {
    return (
      <div className="min-h-screen bg-slate-950">
        <Header />
        <div className="flex flex-col items-center justify-center min-h-screen pt-20">
          <p className="mb-4 text-xl text-red-400">{error}</p>
          <button
            onClick={() => navigate(`/${language}/insights`)}
            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
          >
            <ArrowLeft size={20} />
            {language === "en" ? "Back to Insights" : "Kembali ke Insight"}
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />

      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 z-50 w-full h-1 bg-slate-800">
        <div
          className="h-full transition-all duration-150 bg-gradient-to-r from-cyan-500 to-blue-500"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20" />
            <div className="absolute top-0 rounded-full left-1/4 w-96 h-96 bg-cyan-500/30 blur-3xl" />
            <div className="absolute bottom-0 rounded-full right-1/4 w-96 h-96 bg-blue-500/30 blur-3xl" />
          </div>

          <div className="relative max-w-4xl px-4 mx-auto sm:px-6 lg:px-8">
            <button
              onClick={() => navigate(`/${language}/insights`)}
              className="flex items-center gap-2 mb-8 transition-all duration-300 group text-cyan-400 hover:text-cyan-300"
            >
              <ArrowLeft
                size={20}
                className="transition-transform group-hover:-translate-x-1"
              />
              {language === "en" ? "Back to Insights" : "Kembali ke Insight"}
            </button>

            {/* Category and Tags */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 text-sm font-semibold border border-cyan-500/30">
                <Tag size={14} />
                {insight.category[language]}
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
                    : "Disalin!"
                  : language === "en"
                  ? "Share"
                  : "Bagikan"}
              </button>
            </div>

            {/* Featured Image */}
            {insight.featured_image && (
              <div className="relative mt-8 overflow-hidden shadow-2xl rounded-2xl">
                <img
                  src={`${BACKEND_URL}/storage/${insight.featured_image}`}
                  alt={insight.title[language]}
                  className="w-full h-80 sm:h-96 lg:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            )}
          </div>
        </section>

        {/* Article Content */}
        <section className="py-20 lg:py-28">
          <div className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
            {/* Main Content */}
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-xl prose-invert max-w-none prose-headings:text-white prose-h2:text-3xl prose-h3:text-2xl prose-p:text-slate-200 prose-p:leading-8 prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:text-cyan-300 prose-strong:text-white prose-code:text-cyan-300 prose-code:bg-slate-800 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:bg-slate-800 prose-blockquote:border-cyan-500 prose-blockquote:text-slate-300 prose-ul:text-slate-200 prose-ol:text-slate-200 prose-li:text-slate-200 prose-li:leading-7">
                {/* Check if content contains HTML tags */}
                {insight.content[language].includes("<") &&
                insight.content[language].includes(">") ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: insight.content[language],
                    }}
                    className="space-y-8"
                  />
                ) : (
                  <div className="space-y-8 leading-relaxed text-slate-200">
                    {insight.content[language]
                      .split("\n\n")
                      .map((paragraph, index) => (
                        <p
                          key={index}
                          className="text-xl leading-9 mb-6 first-letter:text-7xl first-letter:font-bold first-letter:text-cyan-400 first-letter:float-left first-letter:mr-3 first-letter:mt-2 first:first-letter:leading-[0.7]"
                          style={index === 0 ? { textAlign: "justify" } : {}}
                        >
                          {paragraph}
                        </p>
                      ))}
                  </div>
                )}
              </div>

              {/* Article Footer - Feedback Section */}
              <div className="pt-8 mt-20 border-t border-slate-800">
                <div className="p-8 mb-8 bg-slate-900/50 rounded-2xl">
                  <div className="mb-6 text-center">
                    <h3 className="mb-2 text-xl font-semibold text-white">
                      {language === "en"
                        ? "Was this article helpful?"
                        : "Apakah artikel ini membantu?"}
                    </h3>
                    <p className="text-sm text-slate-400">
                      {language === "en"
                        ? "Your feedback helps us improve our content"
                        : "Masukan Anda membantu kami meningkatkan konten"}
                    </p>
                  </div>

                  <div className="flex justify-center gap-4 mb-6">
                    <button
                      onClick={() => handleFeedback(true)}
                      disabled={feedbackLoading || userFeedback !== null}
                      className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                        userFeedback === true
                          ? "bg-green-500 text-white"
                          : "bg-green-500/20 text-green-400 hover:bg-green-500/30 hover:scale-105"
                      } ${
                        feedbackLoading || userFeedback !== null
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      <ThumbsUp size={20} />
                      {language === "en" ? "Yes" : "Ya"}
                      {feedbackStats.helpful_count > 0 && (
                        <span className="px-2 py-1 text-xs rounded-full bg-green-500/30">
                          {feedbackStats.helpful_count}
                        </span>
                      )}
                    </button>

                    <button
                      onClick={() => handleFeedback(false)}
                      disabled={feedbackLoading || userFeedback !== null}
                      className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                        userFeedback === false
                          ? "bg-red-500 text-white"
                          : "bg-red-500/20 text-red-400 hover:bg-red-500/30 hover:scale-105"
                      } ${
                        feedbackLoading || userFeedback !== null
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      <ThumbsDown size={20} />
                      {language === "en" ? "No" : "Tidak"}
                      {feedbackStats.not_helpful_count > 0 && (
                        <span className="px-2 py-1 text-xs rounded-full bg-red-500/30">
                          {feedbackStats.not_helpful_count}
                        </span>
                      )}
                    </button>
                  </div>

                  {userFeedback !== null && (
                    <div className="text-center">
                      <p className="text-sm text-cyan-400">
                        {language === "en"
                          ? "Thank you for your feedback!"
                          : "Terima kasih atas masukan Anda!"}
                      </p>
                    </div>
                  )}
                </div>

                {/* Share Buttons */}
                <div className="flex flex-col items-center">
                  <h4 className="mb-4 text-sm font-semibold text-slate-400">
                    {language === "en"
                      ? "Share this article"
                      : "Bagikan artikel ini"}
                  </h4>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleShare("twitter")}
                      className="flex items-center justify-center w-10 h-10 transition-colors rounded-lg bg-slate-800 hover:bg-blue-500 group"
                      title="Share on Twitter"
                    >
                      <Twitter size={16} />
                    </button>
                    <button
                      onClick={() => handleShare("linkedin")}
                      className="flex items-center justify-center w-10 h-10 transition-colors rounded-lg bg-slate-800 hover:bg-blue-600"
                      title="Share on LinkedIn"
                    >
                      <Linkedin size={16} />
                    </button>
                    <button
                      onClick={() => handleShare()}
                      className="flex items-center justify-center w-10 h-10 transition-colors rounded-lg bg-slate-800 hover:bg-cyan-500"
                      title="Copy link"
                    >
                      {copied ? (
                        <Check size={16} className="text-green-400" />
                      ) : (
                        <Copy size={16} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        {relatedInsights.length > 0 && (
          <section className="relative py-20 overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800">
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute w-64 h-64 rounded-full top-1/4 left-10 bg-cyan-500/30 blur-3xl" />
              <div className="absolute w-64 h-64 rounded-full bottom-1/4 right-10 bg-blue-500/30 blur-3xl" />
            </div>

            <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="mb-16 text-center">
                <h2 className="mb-4 text-3xl font-bold text-transparent sm:text-4xl lg:text-5xl bg-gradient-to-r from-white to-slate-300 bg-clip-text">
                  {language === "en" ? "Related Articles" : "Artikel Terkait"}
                </h2>
                <p className="max-w-2xl mx-auto text-lg text-slate-400">
                  {language === "en"
                    ? "Discover more insights to accelerate your digital transformation journey"
                    : "Temukan lebih banyak insight untuk mempercepat perjalanan transformasi digital Anda"}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {relatedInsights.map((article, index) => (
                  <article
                    key={article.id}
                    className="relative overflow-hidden transition-all duration-500 border group bg-slate-800/50 backdrop-blur-sm rounded-2xl border-slate-700/50 hover:border-cyan-500/50 hover:transform hover:scale-105"
                  >
                    {/* Image */}
                    {article.featured_image ? (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={getImageUrl(article.featured_image)}
                          alt={article.title[language]}
                          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                          onError={(e) => {
                            console.error(
                              "Failed to load related article image:",
                              e.target.src
                            );
                            // If image fails to load, show SVG placeholder
                            e.target.style.display = "none";
                            const placeholder =
                              e.target.parentElement.nextElementSibling;
                            if (placeholder) placeholder.style.display = "flex";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/80 backdrop-blur-sm text-white text-xs font-semibold">
                            <Tag size={12} />
                            {article.category[language]}
                          </span>
                        </div>
                      </div>
                    ) : (
                      /* SVG Placeholder for missing images */
                      <div className="relative h-48 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                        <svg
                          className="w-16 h-16 text-slate-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3v-.5a2 2 0 00-2-2H9a2 2 0 00-2 2v.5m4 3V15a2 2 0 002 2h2a2 2 0 002-2v-1.5m0 0V9.5a2 2 0 00-2-2H9.5"
                          />
                        </svg>
                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/80 backdrop-blur-sm text-white text-xs font-semibold">
                            <Tag size={12} />
                            {article.category[language]}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-3 text-sm text-slate-400">
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {article.read_time} min
                        </span>
                        <span>
                          {language === "id"
                            ? insight.formatted_date_id
                            : insight.formatted_date_en}
                        </span>
                      </div>

                      <h3 className="mb-3 text-xl font-bold text-white transition-colors line-clamp-2 group-hover:text-cyan-400">
                        {article.title[language]}
                      </h3>

                      <p className="mb-4 text-sm leading-relaxed text-slate-300 line-clamp-3">
                        {article.content[language].substring(0, 120)}...
                      </p>

                      <button
                        onClick={() =>
                          navigate(`/${language}/insights/${article.slug}`)
                        }
                        className="inline-flex items-center gap-2 text-sm font-medium transition-all duration-300 text-cyan-400 hover:text-cyan-300 group-hover:gap-3"
                      >
                        {language === "en" ? "Read More" : "Baca Selengkapnya"}
                        <ArrowRight
                          size={16}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </button>
                    </div>

                    {/* Hover Effect Overlay */}
                    <div className="absolute inset-0 transition-opacity duration-500 opacity-0 pointer-events-none bg-gradient-to-r from-cyan-500/5 to-blue-500/5 group-hover:opacity-100" />
                  </article>
                ))}
              </div>

              {/* View All Articles Button */}
              <div className="mt-12 text-center">
                <button
                  onClick={() => navigate(`/${language}/insights`)}
                  className="inline-flex items-center gap-2 px-8 py-4 font-semibold text-white transition-all duration-300 transform shadow-lg bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl hover:from-cyan-600 hover:to-blue-600 hover:scale-105 hover:shadow-cyan-500/25"
                >
                  {language === "en"
                    ? "View All Articles"
                    : "Lihat Semua Artikel"}
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default InsightDetailPage;

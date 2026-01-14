import React, { useState, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import { companyInfo } from "../../data/mock";
import { getInsights, getInsightFilters } from "../../services/api";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Button } from "../ui/button";
import {
  ArrowRight,
  Clock,
  Tag,
  MessageCircle,
  BookOpen,
  Loader2,
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

const InsightsPage = () => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const basePath = language === "id" ? "/id" : "/en";
  const [activeFilter, setActiveFilter] = useState("all");
  const [insights, setInsights] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const whatsappLink = `https://wa.me/${
    companyInfo.whatsapp
  }?text=${encodeURIComponent(
    language === "en"
      ? "Hello, I would like to discuss digital transformation for my business."
      : "Halo, saya ingin mendiskusikan transformasi digital untuk bisnis saya."
  )}`;

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const filterData = await getInsightFilters();
        const dynamicCategories = [
          { key: "all", en: "All", id: "Semua" },
          ...filterData.map((category) => ({
            key: category[language] || category.en || category,
            en: category.en || category,
            id: category.id || category.en || category,
          })),
        ];
        setCategories(dynamicCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
        // Fallback to default categories
        setCategories([
          { key: "all", en: "All", id: "Semua" },
          { key: "strategy", en: "Strategy", id: "Strategi" },
          { key: "technology", en: "Technology", id: "Teknologi" },
        ]);
      }
    };

    fetchCategories();
  }, [language]);

  // Fetch insights from API
  useEffect(() => {
    const fetchInsights = async () => {
      setLoading(true);
      setError(null);
      try {
        const category = activeFilter === "all" ? null : activeFilter;
        const data = await getInsights(category, true);
        setInsights(data);
      } catch (err) {
        console.error("Error fetching insights:", err);
        setError(
          language === "en" ? "Failed to load articles" : "Gagal memuat artikel"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, [activeFilter, language]);

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden bg-slate-900">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(6,182,212,0.1),transparent_50%)]" />
          <div className="absolute right-0 items-center justify-center hidden w-1/3 h-full -translate-y-1/2 top-1/2 lg:flex opacity-20">
            <BookOpen size={200} className="text-cyan-400" />
          </div>
          <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 border rounded-full bg-cyan-500/10 border-cyan-500/20">
                <span className="text-sm font-medium text-cyan-400">
                  {language === "en"
                    ? "Insights & Articles"
                    : "Insight & Artikel"}
                </span>
              </div>
              <h1 className="mb-6 text-4xl font-bold text-white sm:text-5xl">
                {t("insights.title")}
              </h1>
              <p className="text-xl text-slate-300">{t("insights.subtitle")}</p>
            </div>
          </div>
        </section>

        {/* Filter Bar */}
        <section className="py-8 border-b border-slate-800">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <label
                htmlFor="insight-filter"
                className="font-medium text-slate-400 whitespace-nowrap"
              >
                {language === "en" ? "Category:" : "Kategori:"}
              </label>
              <select
                id="insight-filter"
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value)}
                className="px-4 py-2 transition-all duration-200 border rounded-lg cursor-pointer bg-slate-800/80 text-slate-300 border-slate-700 hover:border-cyan-500/50 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
              >
                {categories.map((cat) => (
                  <option key={cat.key} value={cat.key}>
                    {cat[language]}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-24">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 size={40} className="text-cyan-400 animate-spin" />
              </div>
            ) : error ? (
              <div className="py-12 text-center">
                <p className="text-red-400">{error}</p>
              </div>
            ) : insights.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-slate-400">
                  {language === "en"
                    ? "No articles found in this category."
                    : "Tidak ada artikel dalam kategori ini."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {insights.map((article) => (
                  <article
                    key={article.id}
                    onClick={() =>
                      navigate(`${basePath}/insights/${article.slug}`)
                    }
                    className="overflow-hidden transition-all duration-300 border cursor-pointer group bg-slate-800/30 border-slate-700/50 rounded-xl hover:border-cyan-500/50 hover:-translate-y-1"
                  >
                    {article.featured_image ? (
                      <div className="h-48 overflow-hidden">
                        <img
                          src={getImageUrl(article.featured_image)}
                          alt={article.title[language]}
                          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                          onError={(e) => {
                            console.error(
                              "Failed to load image:",
                              e.target.src
                            );
                            // If image fails to load, hide the img element and show placeholder
                            e.target.style.display = "none";
                            const placeholder =
                              e.target.parentElement.nextElementSibling;
                            if (placeholder)
                              placeholder.style.display = "block";
                          }}
                        />
                      </div>
                    ) : (
                      /* Fallback placeholder for missing or failed images */
                      <div className="h-48 bg-gradient-to-br from-slate-700/50 to-slate-800/50 relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-cyan-500/10">
                            <Tag size={24} className="text-cyan-400" />
                          </div>
                        </div>
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 text-xs font-medium rounded-full bg-cyan-500/20 text-cyan-400">
                            {typeof article.category === "object"
                              ? article.category[language] ||
                                article.category.en ||
                                "Category"
                              : article.category || "Category"}
                          </span>
                        </div>
                      </div>
                    )}
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

                      <h3 className="mb-3 text-lg font-semibold text-white transition-colors duration-200 group-hover:text-cyan-400 line-clamp-2">
                        {article.title[language]}
                      </h3>

                      <p className="mb-4 text-sm leading-relaxed text-slate-400 line-clamp-3">
                        {article.excerpt[language]}
                      </p>

                      <div className="flex items-center text-sm font-medium text-cyan-400">
                        <span className="mr-2">{t("insights.readMore")}</span>
                        <ArrowRight
                          size={16}
                          className="transition-transform duration-200 group-hover:translate-x-1"
                        />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-slate-900">
          <div className="max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8">
            <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl">
              {language === "en"
                ? "Want to Learn More About Digital Transformation?"
                : "Ingin Belajar Lebih Lanjut Tentang Transformasi Digital?"}
            </h2>
            <p className="mb-8 text-lg text-slate-400">
              {language === "en"
                ? "Let's discuss how these insights can apply to your specific business challenges."
                : "Mari diskusikan bagaimana insight ini dapat diterapkan pada tantangan bisnis spesifik Anda."}
            </p>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <Button className="flex items-center gap-2 px-8 py-4 mx-auto text-lg font-semibold transition-all duration-300 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-900 hover:shadow-xl hover:shadow-cyan-500/20">
                <MessageCircle size={20} />
                {language === "en"
                  ? "Discuss With Us"
                  : "Diskusikan Dengan Kami"}
              </Button>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default InsightsPage;

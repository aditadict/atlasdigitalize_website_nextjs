"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { getInsights, type Insight } from "@/lib/api";
import { ArrowRight, Clock, Tag, Loader2, Zap } from "lucide-react";

const InsightsSection = () => {
  const { language, t, basePath } = useLanguage();
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const data = await getInsights(null, true, 3); // Get 3 published insights
        setInsights(data);
      } catch (err) {
        console.error("Error fetching insights:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, []);

  if (loading) {
    return (
      <section className="bg-slate-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-20">
            <Loader2 size={40} className="text-cyan-400 animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-slate-900 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <Zap className="w-9 h-9 text-cyan-400" />
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                {t("insights.title")}
              </h2>
            </div>
            <p className="text-lg text-slate-400">{t("insights.subtitle")}</p>
          </div>
          <Link
            href={`${basePath}/insights`}
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium transition-colors duration-200"
          >
            {language === "en" ? "View all articles" : "Lihat semua artikel"}
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Articles Grid */}
        {insights.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {insights.map((article) => (
              <Link
                key={article.id}
                href={`${basePath}/insights/${article.slug}`}
                className="group bg-slate-800/30 border border-slate-700/50 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Thumbnail Placeholder */}
                <div className="h-48 bg-gradient-to-br from-slate-700/50 to-slate-800/50 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-cyan-500/10 flex items-center justify-center">
                      <Tag size={24} className="text-cyan-400" />
                    </div>
                  </div>
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-medium">
                      {typeof article.category === "object"
                        ? article.category[language] ||
                          article.category.en ||
                          "Category"
                        : article.category || "Category"}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Meta */}
                  <div className="flex items-center gap-4 text-slate-500 text-sm mb-3">
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

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-200 line-clamp-2">
                    {article.title[language]}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 mb-4">
                    {article.excerpt[language]}
                  </p>

                  {/* Read More */}
                  <div className="flex items-center text-cyan-400 text-sm font-medium">
                    <span className="mr-2">{t("insights.readMore")}</span>
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform duration-200"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-400">
              {language === "en"
                ? "No articles available."
                : "Tidak ada artikel tersedia."}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default InsightsSection;

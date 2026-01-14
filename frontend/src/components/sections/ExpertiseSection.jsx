import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { getSolutions } from "../../services/api";

import {
  Server,
  Users,
  ShoppingCart,
  Package,
  FileText,
  Zap,
  Loader2,
  Layers,
  Database,
  GitMerge,
  Globe,
} from "lucide-react";

const iconMap = {
  Layers,
  Database,
  Server,
  Users,
  ShoppingCart,
  Package,
  FileText,
  GitMerge,
  Globe,
  Zap,
};

const ExpertiseSection = () => {
  const { language, t } = useLanguage();
  const basePath = language === "id" ? "/id" : "/en";
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSolutions = async () => {
      try {
        const data = await getSolutions();
        setSolutions(data);
      } catch (err) {
        console.error("Error fetching solutions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSolutions();
  }, []);

  if (loading) {
    return (
      <section className="relative min-h-screen flex items-center bg-slate-900 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="flex items-center justify-center py-20">
            <Loader2 size={40} className="text-cyan-400 animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex items-center bg-slate-900 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(30,58,95,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(30,58,95,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-slate-950 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            {t("expertise.title")}
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            {t("expertise.subtitle")}
          </p>
        </div>

        {/* Solutions Grid */}
        {solutions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((solution) => {
              const Icon = iconMap[solution.icon] || Server;
              return (
                <div
                  key={solution.id}
                  className="group relative bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/5 hover:-translate-y-1"
                >
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-lg bg-slate-700/50 flex items-center justify-center mb-4 text-cyan-400 group-hover:bg-cyan-500/20 transition-colors duration-300">
                    <Icon size={24} />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-200">
                    {solution.title[language] || solution.title.en}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {solution.description[language] || solution.description.en}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center text-slate-400 py-12">
            {language === "en"
              ? "No solutions available"
              : "Tidak ada solusi tersedia"}
          </div>
        )}
      </div>
    </section>
  );
};

export default ExpertiseSection;

import React, { useState, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { companyInfo } from "../../data/mock";
import { getProjects, getProjectFilters } from "../../services/api";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Button } from "../ui/button";
import {
  Building2,
  Server,
  ArrowRight,
  MessageCircle,
  Briefcase,
  Loader2,
} from "lucide-react";

const CaseStudiesPage = () => {
  const { language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState("all");
  const [filterType, setFilterType] = useState("industry"); // 'industry' or 'system_type'
  const [projects, setProjects] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    industries: [],
    system_types: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const whatsappLink = `https://wa.me/${
    companyInfo.whatsapp
  }?text=${encodeURIComponent(
    language === "en"
      ? "Hello, I would like to discuss a similar project."
      : "Halo, saya ingin mendiskusikan proyek serupa."
  )}`;

  const projectColors = [
    "from-cyan-500/20 to-slate-800/50",
    "from-slate-600/30 to-slate-800/50",
    "from-teal-500/20 to-slate-800/50",
    "from-slate-500/30 to-slate-800/50",
  ];

  // Fetch filter options and initial projects
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const filters = await getProjectFilters();
        setFilterOptions(filters);
      } catch (error) {
        console.error("Error fetching filters:", error);
      }
    };

    fetchFilters();
  }, []);

  // Generate dynamic filters based on API data
  const getFilters = () => {
    const baseFilters = [
      { key: "all", en: "All Projects", id: "Semua Proyek" },
    ];

    if (filterType === "industry") {
      return [
        ...baseFilters,
        ...filterOptions.industries.map((industry) => ({
          key: industry[language] || industry.en || industry,
          en: industry.en || industry,
          id: industry.id || industry.en || industry,
        })),
      ];
    } else {
      return [
        ...baseFilters,
        ...filterOptions.system_types.map((systemType) => ({
          key: systemType[language] || systemType.en || systemType,
          en: systemType.en || systemType,
          id: systemType.id || systemType.en || systemType,
        })),
      ];
    }
  };

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setError(null);
      try {
        let industry = null;
        let systemType = null;

        if (activeFilter !== "all") {
          if (filterType === "industry") {
            industry = activeFilter;
          } else {
            systemType = activeFilter;
          }
        }

        const data = await getProjects(industry, systemType);
        setProjects(data);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError(
          language === "en" ? "Failed to load projects" : "Gagal memuat proyek"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [activeFilter, language, filterType]);

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-24 bg-slate-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(6,182,212,0.1),transparent_50%)]" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-full hidden lg:flex items-center justify-center opacity-20">
            <Briefcase size={200} className="text-cyan-400" />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
                <span className="text-cyan-400 text-sm font-medium">
                  {language === "en" ? "Case Studies" : "Studi Kasus"}
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                {language === "en"
                  ? "Recent Projects & Implementations"
                  : "Proyek & Implementasi Terbaru"}
              </h1>
              <p className="text-xl text-slate-300">
                {language === "en"
                  ? "Real solutions for real business challenges. Explore how we've helped companies transform their operations."
                  : "Solusi nyata untuk tantangan bisnis nyata. Jelajahi bagaimana kami telah membantu perusahaan mentransformasi operasi mereka."}
              </p>
            </div>
          </div>
        </section>

        {/* Filter Bar */}
        <section className="py-8 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
              {/* Filter Type Toggle */}
              <div className="flex items-center gap-3">
                <label className="text-slate-400 font-medium whitespace-nowrap">
                  {language === "en" ? "Filter by:" : "Filter berdasarkan:"}
                </label>
                <div className="flex rounded-lg bg-slate-800/80 border border-slate-700 overflow-hidden">
                  <button
                    onClick={() => {
                      setFilterType("industry");
                      setActiveFilter("all");
                    }}
                    className={`px-4 py-2 text-sm font-medium transition-colors ${
                      filterType === "industry"
                        ? "bg-cyan-500 text-white"
                        : "text-slate-300 hover:text-cyan-400"
                    }`}
                  >
                    {language === "en" ? "Industry" : "Industri"}
                  </button>
                  <button
                    onClick={() => {
                      setFilterType("system_type");
                      setActiveFilter("all");
                    }}
                    className={`px-4 py-2 text-sm font-medium transition-colors ${
                      filterType === "system_type"
                        ? "bg-cyan-500 text-white"
                        : "text-slate-300 hover:text-cyan-400"
                    }`}
                  >
                    {language === "en" ? "System Type" : "Tipe Sistem"}
                  </button>
                </div>
              </div>

              {/* Filter Select */}
              <select
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value)}
                className="px-4 py-2 rounded-lg bg-slate-800/80 text-slate-300 border border-slate-700 hover:border-cyan-500/50 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200 cursor-pointer"
              >
                {getFilters().map((filter) => (
                  <option key={filter.key} value={filter.key}>
                    {filter[language]}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 size={40} className="text-cyan-400 animate-spin" />
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-400">{error}</p>
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-slate-400">
                  {language === "en"
                    ? "No projects found in this category."
                    : "Tidak ada proyek dalam kategori ini."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project, index) => (
                  <div
                    key={project.id}
                    className="group relative overflow-hidden rounded-2xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300"
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${
                        projectColors[index % projectColors.length]
                      }`}
                    />

                    <div className="relative p-8">
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 text-slate-300 text-xs font-medium">
                          <Building2 size={12} />
                          {project.industry[language]}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-medium">
                          <Server size={12} />
                          {project.system_type[language]}
                        </span>
                      </div>

                      <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-200">
                        {project.title[language]}
                      </h3>

                      <p className="text-slate-400 text-sm mb-4">
                        <span className="font-medium text-slate-300">
                          {language === "en" ? "Scope: " : "Lingkup: "}
                        </span>
                        {project.scope[language]}
                      </p>

                      <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-700/50 mb-6">
                        <p className="text-sm text-slate-500 mb-1">
                          {language === "en" ? "Outcome" : "Hasil"}
                        </p>
                        <p className="text-slate-300 leading-relaxed">
                          {project.outcome[language]}
                        </p>
                      </div>

                      <a
                        href={`${
                          whatsappLink.split("?")[0]
                        }?text=${encodeURIComponent(
                          language === "en"
                            ? `Hello, I'm interested in a similar project: ${project.title.en}`
                            : `Halo, saya tertarik dengan proyek serupa: ${project.title.id}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-cyan-400 text-sm font-medium hover:text-cyan-300 transition-colors"
                      >
                        <span className="mr-2">
                          {language === "en"
                            ? "Discuss similar project"
                            : "Diskusikan proyek serupa"}
                        </span>
                        <ArrowRight size={16} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-slate-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              {language === "en"
                ? "Have a Similar Challenge?"
                : "Punya Tantangan Serupa?"}
            </h2>
            <p className="text-lg text-slate-400 mb-8">
              {language === "en"
                ? "Let's discuss how we can help solve your business challenges with the right technology."
                : "Mari diskusikan bagaimana kami dapat membantu menyelesaikan tantangan bisnis Anda dengan teknologi yang tepat."}
            </p>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <Button className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold px-8 py-4 text-lg rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/20 flex items-center gap-2 mx-auto">
                <MessageCircle size={20} />
                {language === "en"
                  ? "Start a Conversation"
                  : "Mulai Percakapan"}
              </Button>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CaseStudiesPage;

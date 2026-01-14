import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import { useLanguage } from "../../context/LanguageContext";
import { companyInfo } from "../../data/mock";
import { getAbout } from "../../services/api";
import { Button } from "../ui/button";
import { ArrowRight, ChevronDown, MessageCircle, Loader2 } from "lucide-react";

const HeroSection = () => {
  const { language, t } = useLanguage();
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const data = await getAbout();
        setAboutData(data);
      } catch (err) {
        console.error("Error fetching about data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  const whatsappLink = `https://wa.me/${
    companyInfo.whatsapp
  }?text=${encodeURIComponent(
    language === "en"
      ? "Hello, I would like to schedule a consultation."
      : "Halo, saya ingin menjadwalkan konsultasi."
  )}`;

  // Use API data if available, otherwise fallback to translations
  const headline = aboutData?.headline?.[language] || t("hero.headline");
  const subheadline =
    aboutData?.subheadline?.[language] || t("hero.subheadline");
  return (
    <section className="relative flex items-center min-h-screen overflow-hidden bg-slate-950">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(30,58,95,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(30,58,95,0.15)_1px,transparent_1px)] bg-[size:60px_60px]" />

        {/* Gradient Orbs */}
        <div className="absolute rounded-full top-1/4 -left-32 w-96 h-96 bg-cyan-500/10 blur-3xl" />
        <div className="absolute rounded-full bottom-1/4 -right-32 w-96 h-96 bg-slate-600/10 blur-3xl" />

        {/* Animated Tech Lottie Animations */}
        <div className="absolute right-[15%] top-1/2 -translate-y-1/2 w-80 h-80 hidden lg:block">
          {/* Tech Animation 1 */}
          <div className="absolute top-8 right-8 w-14 h-14">
            <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-cyan-400/30 to-blue-500/30 rounded-xl animate-pulse">
              <div className="rounded-lg w-7 h-7 bg-cyan-400/60 animate-spin-slow"></div>
            </div>
          </div>

          {/* Tech Animation 2 */}
          <div className="absolute w-12 h-12 bottom-20 left-8">
            <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-blue-400/30 to-cyan-500/30 rounded-xl animate-bounce">
              <div className="w-5 h-5 rounded-full bg-blue-400/60 animate-pulse"></div>
            </div>
          </div>

          {/* Tech Animation 3 */}
          <div className="absolute top-32 left-20 w-14 h-14">
            <div
              className="flex items-center justify-center w-full h-full bg-gradient-to-br from-cyan-300/30 to-slate-500/30 rounded-xl"
              style={{ animation: "bounce 2s infinite 0.5s" }}
            >
              <div className="h-1 rounded-full w-7 bg-cyan-300/60 animate-pulse"></div>
            </div>
          </div>

          {/* Background Orbit Rings */}
          <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            <div
              className="w-48 h-48 border rounded-full border-cyan-400/20 animate-spin-slow"
              style={{ animationDuration: "12s" }}
            ></div>
            <div
              className="absolute w-32 h-32 -translate-x-1/2 -translate-y-1/2 border rounded-full top-1/2 left-1/2 border-blue-400/20 animate-spin-slow"
              style={{ animationDuration: "8s", animationDirection: "reverse" }}
            ></div>
          </div>
        </div>
      </div>

      {/* Content - Left aligned with proper text composition */}
      <div className="relative z-10 w-full px-4 py-32 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 border rounded-full bg-slate-800/50 border-slate-700/50">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-sm font-medium text-slate-300">
              {language === "en"
                ? "IT Consulting & Custom Software"
                : "Konsultasi TI & Software Kustom"}
            </span>
          </div>

          {/* Headline */}
          {loading ? (
            <div className="flex items-center gap-3 mb-6">
              <Loader2 size={32} className="text-cyan-400 animate-spin" />
              <span className="text-slate-400">Loading...</span>
            </div>
          ) : (
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.15] mb-6">
              {headline}
            </h1>
          )}

          {/* Subheadline */}
          <p className="mb-8 text-base leading-relaxed sm:text-lg text-slate-400">
            {subheadline}
          </p>

          {/* CTAs */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <Button className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold px-6 py-3.5 text-base rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/20 flex items-center gap-2 w-full sm:w-auto justify-center">
                <MessageCircle size={18} />
                {t("hero.primaryCta")}
                <ArrowRight size={18} />
              </Button>
            </a>
            <a href="#projects">
              <Button
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white px-6 py-3.5 text-base rounded-lg transition-all duration-200 w-full sm:w-auto justify-center"
              >
                {t("hero.secondaryCta")}
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToNext}
        className="absolute transition-colors duration-200 -translate-x-1/2 bottom-8 left-1/2 text-slate-400 hover:text-cyan-400 animate-bounce"
      >
        <ChevronDown size={32} />
      </button>
    </section>
  );
};

export default HeroSection;

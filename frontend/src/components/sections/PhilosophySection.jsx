import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { MessageSquare, Map, Code } from "lucide-react";

const PhilosophySection = () => {
  const { language, t } = useLanguage();

  const icons = [MessageSquare, Map, Code];

  return (
    <section className="relative min-h-screen flex items-center bg-slate-950 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.08),transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            {t("philosophy.title")}
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            {t("philosophy.subtitle")}
          </p>
        </div>

        {/* Philosophy Flow */}
        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent -translate-y-1/2" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-stretch">
            {t("philosophy.steps")?.map((step, index) => {
              const Icon = icons[index];
              return (
                <div key={index} className="relative group flex">
                  {/* Card */}
                  <div className="relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 hover:border-cyan-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-cyan-500/5 w-full flex flex-col">
                    {/* Step Number */}
                    <div className="absolute -top-4 left-8 px-4 py-1 bg-cyan-500 text-slate-900 font-bold text-sm rounded-full">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    {/* Icon */}
                    <div className="w-16 h-16 rounded-xl bg-slate-800 flex items-center justify-center mb-6 text-cyan-400 group-hover:bg-cyan-500/20 transition-colors duration-300">
                      <Icon size={28} />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-4">
                        {step.title}
                      </h3>
                      <p className="text-slate-400 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Arrow - Mobile */}
                  {index < 2 && (
                    <div className="lg:hidden flex justify-center my-4">
                      <div className="w-0.5 h-8 bg-cyan-500/30" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;

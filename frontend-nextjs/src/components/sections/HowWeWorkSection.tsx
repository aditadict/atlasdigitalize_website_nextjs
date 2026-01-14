"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

interface Step {
  number: string;
  title: string;
  description: string;
}

const HowWeWorkSection = () => {
  const { language, t } = useLanguage();
  const steps = (t("howWeWork.steps") as unknown as Step[]) || [];

  return (
    <section className="bg-slate-950 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {t("howWeWork.title")}
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            {t("howWeWork.subtitle")}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line - Desktop */}
          <div className="hidden lg:block absolute top-8 left-0 right-0 h-0.5 bg-slate-800" />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Timeline Dot - Desktop */}
                <div className="hidden lg:flex absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-slate-900 border-2 border-cyan-500/50 items-center justify-center text-cyan-400 font-bold">
                  {step.number}
                </div>

                {/* Content */}
                <div className="lg:pt-24">
                  {/* Mobile Number */}
                  <div className="lg:hidden flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-slate-900 border-2 border-cyan-500/50 flex items-center justify-center text-cyan-400 font-bold text-sm">
                      {step.number}
                    </div>
                    <div className="flex-1 h-0.5 bg-slate-800" />
                  </div>

                  <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-cyan-500/30 transition-all duration-300">
                    <h3 className="text-lg font-semibold text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWorkSection;

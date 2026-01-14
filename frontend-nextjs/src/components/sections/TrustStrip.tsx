"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { getAbout, type AboutData } from "@/lib/api";
import { Calendar, Server, Building2, Loader2 } from "lucide-react";

const TrustStrip = () => {
  const { language, t } = useLanguage();
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
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

  if (loading) {
    return (
      <section className="bg-slate-900 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-center py-8">
            <Loader2 size={32} className="text-cyan-400 animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  if (!aboutData) return null;

  const metrics = [
    {
      icon: Calendar,
      value: `${aboutData.years_experience}+`,
      label: t("trust.years"),
    },
    {
      icon: Server,
      value: `${aboutData.systems_delivered}+`,
      label: t("trust.systems"),
    },
    {
      icon: Building2,
      value: `${aboutData.industries_served}+`,
      label: t("trust.industries"),
    },
  ];

  return (
    <section className="bg-slate-900 border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="flex items-center gap-6 p-6 rounded-xl bg-slate-800/30 border border-slate-700/30 hover:border-cyan-500/30 transition-all duration-300"
            >
              <div className="p-4 rounded-xl bg-cyan-500/10 text-cyan-400">
                <metric.icon size={28} />
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">
                  {metric.value}
                </div>
                <div className="text-slate-400 text-sm font-medium">
                  {metric.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustStrip;

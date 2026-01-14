"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { companyInfo } from "@/lib/data";
import { getAbout, type AboutData } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  MessageCircle,
  Target,
  Eye,
  Award,
  Users,
  Calendar,
  Server,
  Building2,
  Sparkles,
  Loader2,
  LucideIcon,
} from "lucide-react";

interface Value {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function AboutPageClient() {
  const { language, t, basePath } = useLanguage();
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

  const whatsappLink = `https://wa.me/${
    companyInfo.whatsapp
  }?text=${encodeURIComponent(
    language === "en"
      ? "Hello, I would like to learn more about Atlas Digitalize."
      : "Halo, saya ingin mengetahui lebih lanjut tentang Atlas Digitalize."
  )}`;

  const values: Value[] =
    language === "en"
      ? [
          {
            icon: Target,
            title: "Consulting-First Approach",
            description:
              "We understand your business before writing a single line of code. Every solution starts with deep analysis.",
          },
          {
            icon: Eye,
            title: "Long-Term Vision",
            description:
              "We build systems that grow with your business, not solutions that need replacement in 2 years.",
          },
          {
            icon: Award,
            title: "Quality Over Speed",
            description:
              "We prioritize building robust, maintainable systems over rushing to deliver incomplete solutions.",
          },
          {
            icon: Users,
            title: "Partnership Mindset",
            description:
              "We see ourselves as your technology partner, not just a vendor. Your success is our success.",
          },
        ]
      : [
          {
            icon: Target,
            title: "Pendekatan Konsultasi-Pertama",
            description:
              "Kami memahami bisnis Anda sebelum menulis satu baris kode. Setiap solusi dimulai dengan analisis mendalam.",
          },
          {
            icon: Eye,
            title: "Visi Jangka Panjang",
            description:
              "Kami membangun sistem yang tumbuh bersama bisnis Anda, bukan solusi yang perlu diganti dalam 2 tahun.",
          },
          {
            icon: Award,
            title: "Kualitas di Atas Kecepatan",
            description:
              "Kami memprioritaskan membangun sistem yang kuat dan dapat dipelihara daripada terburu-buru memberikan solusi tidak lengkap.",
          },
          {
            icon: Users,
            title: "Pola Pikir Kemitraan",
            description:
              "Kami melihat diri kami sebagai mitra teknologi Anda, bukan hanya vendor. Kesuksesan Anda adalah kesuksesan kami.",
          },
        ];

  return (
    <>
      {/* Hero Section with Illustration */}
      <section className="relative py-24 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(6,182,212,0.1),transparent_50%)]" />
        {/* Abstract Illustration */}
        <div className="absolute right-0 items-center justify-center hidden w-1/3 h-full -translate-y-1/2 top-1/2 lg:flex opacity-20">
          <svg viewBox="0 0 200 200" className="w-64 h-64">
            <defs>
              <linearGradient
                id="aboutGrad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke="url(#aboutGrad)"
              strokeWidth="2"
            />
            <circle
              cx="100"
              cy="100"
              r="60"
              fill="none"
              stroke="url(#aboutGrad)"
              strokeWidth="2"
              opacity="0.7"
            />
            <circle
              cx="100"
              cy="100"
              r="40"
              fill="none"
              stroke="url(#aboutGrad)"
              strokeWidth="2"
              opacity="0.5"
            />
            <circle
              cx="100"
              cy="100"
              r="20"
              fill="url(#aboutGrad)"
              opacity="0.3"
            />
            <circle cx="100" cy="20" r="8" fill="#06b6d4" />
            <circle cx="180" cy="100" r="8" fill="#06b6d4" />
            <circle cx="100" cy="180" r="8" fill="#06b6d4" />
            <circle cx="20" cy="100" r="8" fill="#06b6d4" />
          </svg>
        </div>
        <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 border rounded-full bg-cyan-500/10 border-cyan-500/20">
              <span className="text-sm font-medium text-cyan-400">
                {language === "en" ? "About Us" : "Tentang Kami"}
              </span>
            </div>
            <h1 className="mb-6 text-4xl font-bold text-white sm:text-5xl">
              {language === "en"
                ? "We Build Systems That Run Your Business"
                : "Kami Membangun Sistem yang Menjalankan Bisnis Anda"}
            </h1>
            {loading ? (
              <div className="flex items-center gap-3">
                <Loader2 size={24} className="text-cyan-400 animate-spin" />
                <span className="text-slate-400">Loading...</span>
              </div>
            ) : (
              <p className="text-xl leading-relaxed text-slate-300">
                {aboutData?.subheadline?.[language] ||
                  (language === "en"
                    ? "Atlas Digitalize is an IT consulting and custom software company that helps businesses digitalize and transform their operations through strategic, consulting-first approach."
                    : "Atlas Digitalize adalah perusahaan konsultan TI dan software kustom yang membantu bisnis melakukan digitalisasi dan transformasi operasi mereka melalui pendekatan strategis berbasis konsultasi.")}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Company Info with Visual */}
      <section className="py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center grid-cols-1 gap-16 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-white">
                {language === "en" ? "Our Story" : "Cerita Kami"}
              </h2>
              {loading ? (
                <div className="flex items-center gap-3">
                  <Loader2 size={24} className="text-cyan-400 animate-spin" />
                  <span className="text-slate-400">Loading...</span>
                </div>
              ) : (
                <div className="space-y-4 leading-relaxed text-slate-300">
                  {aboutData?.story?.[language]
                    ?.split("\n")
                    .map((paragraph: string, index: number) => (
                      <p key={index}>{paragraph}</p>
                    )) || (
                    <>
                      <p>
                        {language === "en"
                          ? "Founded with a vision to bridge the gap between business needs and technology solutions, Atlas Digitalize has grown to become a trusted partner for companies seeking digital transformation."
                          : "Didirikan dengan visi untuk menjembatani kesenjangan antara kebutuhan bisnis dan solusi teknologi, Atlas Digitalize telah berkembang menjadi mitra terpercaya bagi perusahaan yang mencari transformasi digital."}
                      </p>
                      <p>
                        {language === "en"
                          ? "We don't believe in one-size-fits-all solutions. Every business is unique, and so should be its systems. That's why we start every engagement with deep business analysis and consulting."
                          : "Kami tidak percaya pada solusi satu ukuran untuk semua. Setiap bisnis unik, begitu juga sistemnya. Itulah mengapa kami memulai setiap keterlibatan dengan analisis bisnis dan konsultasi mendalam."}
                      </p>
                      <p>
                        {language === "en"
                          ? "Our team combines industry expertise with technical excellence to deliver systems that truly fit how your organization operates."
                          : "Tim kami menggabungkan keahlian industri dengan keunggulan teknis untuk memberikan sistem yang benar-benar sesuai dengan cara organisasi Anda beroperasi."}
                      </p>
                    </>
                  )}
                </div>
              )}
              <div className="mt-8">
                <p className="mb-2 text-sm text-slate-400">
                  {language === "en" ? "Legal Entity" : "Badan Hukum"}
                </p>
                <p className="font-semibold text-white">{companyInfo.name}</p>
              </div>
            </div>

            {/* Stats with Visual Enhancement */}
            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 transition-colors border bg-slate-800/30 border-slate-700/50 rounded-xl hover:border-cyan-500/30">
                <Calendar className="mb-4 text-cyan-400" size={28} />
                <div className="mb-2 text-3xl font-bold text-white">
                  {aboutData?.years_experience || 0}+
                </div>
                <div className="text-slate-400">
                  {language === "en" ? "Years Experience" : "Tahun Pengalaman"}
                </div>
              </div>
              <div className="p-6 transition-colors border bg-slate-800/30 border-slate-700/50 rounded-xl hover:border-cyan-500/30">
                <Server className="mb-4 text-cyan-400" size={28} />
                <div className="mb-2 text-3xl font-bold text-white">
                  {aboutData?.systems_delivered || 0}+
                </div>
                <div className="text-slate-400">
                  {language === "en"
                    ? "Systems Delivered"
                    : "Sistem Terdeliveri"}
                </div>
              </div>
              <div className="p-6 transition-colors border bg-slate-800/30 border-slate-700/50 rounded-xl hover:border-cyan-500/30">
                <Building2 className="mb-4 text-cyan-400" size={28} />
                <div className="mb-2 text-3xl font-bold text-white">
                  {aboutData?.industries_served || 0}+
                </div>
                <div className="text-slate-400">
                  {language === "en"
                    ? "Industries Served"
                    : "Industri Dilayani"}
                </div>
              </div>
              <div className="p-6 transition-colors border bg-slate-800/30 border-slate-700/50 rounded-xl hover:border-cyan-500/30">
                <Sparkles className="mb-4 text-cyan-400" size={28} />
                <div className="mb-2 text-3xl font-bold text-white">100%</div>
                <div className="text-slate-400">
                  {language === "en"
                    ? "Custom Solutions"
                    : "Solusi Kustom"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 bg-slate-900">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h2 className="mb-12 text-3xl font-bold text-center text-white">
            {language === "en" ? "Our Values" : "Nilai-Nilai Kami"}
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <div
                key={index}
                className="p-6 transition-all duration-300 border bg-slate-800/30 border-slate-700/50 rounded-xl hover:border-cyan-500/30 hover:-translate-y-1"
              >
                <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-cyan-500/10">
                  <value.icon size={24} className="text-cyan-400" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">
                  {value.title}
                </h3>
                <p className="text-sm text-slate-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl">
            {language === "en"
              ? "Ready to Transform Your Business?"
              : "Siap Mentransformasi Bisnis Anda?"}
          </h2>
          <p className="mb-8 text-lg text-slate-400">
            {language === "en"
              ? "Let's discuss how we can help you achieve your digital goals."
              : "Mari diskusikan bagaimana kami dapat membantu Anda mencapai tujuan digital Anda."}
          </p>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            <Button className="flex items-center gap-2 px-8 py-4 mx-auto text-lg font-semibold transition-all duration-300 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-900 hover:shadow-xl hover:shadow-cyan-500/20">
              <MessageCircle size={20} />
              {language === "en" ? "Contact Us" : "Hubungi Kami"}
            </Button>
          </a>
        </div>
      </section>
    </>
  );
}

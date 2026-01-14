"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { companyInfo } from "@/lib/data";
import { getSolutions, type Solution } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  Server,
  Users,
  ShoppingCart,
  Package,
  FileText,
  Zap,
  ArrowRight,
  MessageCircle,
  CheckCircle,
  Cog,
  Loader2,
  Layers,
  Database,
  GitMerge,
  Globe,
  LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
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

const solutionDetails: Record<
  string,
  { en: string[]; id: string[] }
> = {
  digitalization: {
    en: [
      "Business process analysis and mapping",
      "Digital readiness assessment",
      "Technology roadmap development",
      "Change management consulting",
      "ROI analysis and planning",
    ],
    id: [
      "Analisis dan pemetaan proses bisnis",
      "Penilaian kesiapan digital",
      "Pengembangan peta jalan teknologi",
      "Konsultasi manajemen perubahan",
      "Analisis dan perencanaan ROI",
    ],
  },
  erp: {
    en: [
      "Financial management modules",
      "Inventory and supply chain",
      "Production planning",
      "Human resource integration",
      "Business intelligence & reporting",
    ],
    id: [
      "Modul manajemen keuangan",
      "Inventaris dan rantai pasokan",
      "Perencanaan produksi",
      "Integrasi sumber daya manusia",
      "Business intelligence & pelaporan",
    ],
  },
  hris: {
    en: [
      "Employee database management",
      "Attendance and time tracking",
      "Payroll processing",
      "Leave management",
      "Performance evaluation",
    ],
    id: [
      "Manajemen database karyawan",
      "Pelacakan kehadiran dan waktu",
      "Pemrosesan penggajian",
      "Manajemen cuti",
      "Evaluasi kinerja",
    ],
  },
  pos: {
    en: [
      "Real-time sales tracking",
      "Inventory synchronization",
      "Multi-outlet management",
      "Customer loyalty programs",
      "Sales analytics and reporting",
    ],
    id: [
      "Pelacakan penjualan real-time",
      "Sinkronisasi inventaris",
      "Manajemen multi-outlet",
      "Program loyalitas pelanggan",
      "Analitik dan pelaporan penjualan",
    ],
  },
  wms: {
    en: [
      "Inventory tracking and accuracy",
      "Picking and packing optimization",
      "Receiving and put-away",
      "Barcode/RFID integration",
      "Logistics coordination",
    ],
    id: [
      "Pelacakan dan akurasi inventaris",
      "Optimisasi picking dan packing",
      "Penerimaan dan penyimpanan",
      "Integrasi barcode/RFID",
      "Koordinasi logistik",
    ],
  },
  dms: {
    en: [
      "Document digitization",
      "Approval workflow automation",
      "Version control",
      "Audit trails",
      "Search and retrieval",
    ],
    id: [
      "Digitalisasi dokumen",
      "Otomasi alur kerja persetujuan",
      "Kontrol versi",
      "Jejak audit",
      "Pencarian dan pengambilan",
    ],
  },
  integration: {
    en: [
      "API development and management",
      "Legacy system integration",
      "Third-party platform connectors",
      "Data synchronization",
      "Workflow automation",
    ],
    id: [
      "Pengembangan dan manajemen API",
      "Integrasi sistem legacy",
      "Konektor platform pihak ketiga",
      "Sinkronisasi data",
      "Otomasi alur kerja",
    ],
  },
  web: {
    en: [
      "Corporate website development",
      "Business web applications",
      "E-commerce integration",
      "Content management systems",
      "SEO optimization",
    ],
    id: [
      "Pengembangan website korporat",
      "Aplikasi web bisnis",
      "Integrasi e-commerce",
      "Sistem manajemen konten",
      "Optimisasi SEO",
    ],
  },
};

export default function SolutionsPageClient() {
  const { language } = useLanguage();
  const [solutions, setSolutions] = useState<Solution[]>([]);
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

  const whatsappLink = `https://wa.me/${
    companyInfo.whatsapp
  }?text=${encodeURIComponent(
    language === "en"
      ? "Hello, I would like to discuss your solutions."
      : "Halo, saya ingin mendiskusikan solusi Anda."
  )}`;

  return (
    <>
      {/* Hero Section with Illustration */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(6,182,212,0.1),transparent_50%)]" />
        {/* Gear Illustration */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-full hidden lg:flex items-center justify-center opacity-20">
          <Cog size={200} className="text-cyan-400 animate-spin-slow" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
              <span className="text-cyan-400 text-sm font-medium">
                {language === "en" ? "Our Solutions" : "Solusi Kami"}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              {language === "en" ? "Our Solutions" : "Solusi Kami"}
            </h1>
            <p className="text-xl text-slate-300">
              {language === "en"
                ? "Custom-built systems designed for your business needs"
                : "Sistem kustom yang dirancang untuk kebutuhan bisnis Anda"}
            </p>
          </div>
        </div>
      </section>

      {/* Solutions List */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 size={40} className="text-cyan-400 animate-spin" />
            </div>
          ) : solutions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {solutions.map((solution) => {
                const Icon = iconMap[solution.icon] || Server;

                return (
                  <div
                    key={solution.id}
                    className="group bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/5 hover:-translate-y-1"
                  >
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-6 group-hover:bg-cyan-500/20 transition-colors">
                      <Icon size={28} />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                      {solution.title[language]}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6">
                      {solution.description[language]}
                    </p>

                    {/* Details */}
                    {solution.key &&
                      solutionDetails[solution.key]?.[language] && (
                        <ul className="space-y-2">
                          {solutionDetails[solution.key][language].map(
                            (detail, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-2 text-sm text-slate-300"
                              >
                                <CheckCircle
                                  size={16}
                                  className="text-cyan-400 mt-0.5 flex-shrink-0"
                                />
                                <span>{detail}</span>
                              </li>
                            )
                          )}
                        </ul>
                      )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-400">
                {language === "en"
                  ? "No solutions available."
                  : "Tidak ada solusi tersedia."}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            {language === "en"
              ? "Need a Custom Solution?"
              : "Butuh Solusi Kustom?"}
          </h2>
          <p className="text-lg text-slate-400 mb-8">
            {language === "en"
              ? "Every business is unique. Let's discuss how we can build the perfect system for your needs."
              : "Setiap bisnis unik. Mari diskusikan bagaimana kami dapat membangun sistem yang sempurna untuk kebutuhan Anda."}
          </p>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            <Button className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold px-8 py-4 text-lg rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/20 flex items-center gap-2 mx-auto">
              <MessageCircle size={20} />
              {language === "en" ? "Discuss Your Needs" : "Diskusikan Kebutuhan Anda"}
            </Button>
          </a>
        </div>
      </section>
    </>
  );
}

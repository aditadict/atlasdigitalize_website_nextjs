// Static data for Atlas Digitalize corporate website
// Dynamic data (projects, insights, contacts) are fetched from the backend API

// Fallback logo import with error handling
let logoSrc;
try {
  logoSrc = require("../assets/atlas-digitalize-logo.png");
} catch (error) {
  // Fallback to a placeholder SVG if logo not found
  logoSrc =
    "data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 4L12 32H16L17.5 28H22.5L24 32H28L20 4Z' fill='%2306B6D4'/%3E%3Cpath d='M18.5 23L20 16L21.5 23H18.5Z' fill='%230E7490'/%3E%3C/svg%3E";
}

export const companyInfo = {
  name: "CV. Atlas Digital Cipta Teknologi",
  shortName: "Atlas Digitalize",
  logo: logoSrc,
  phone: "+62 878 6557 1555",
  whatsapp: "6287865571555",
  email: "adict@atlasdigitalize.com",
  address:
    "Jl. Prof. Dr. Hamka, Ruko Ngaliyan Square No.56 Lantai 2 Ngaliyan, Semarang",
  linkedin: "https://id.linkedin.com/company/atlas-digitalize",
  instagram: "https://www.instagram.com/atlasdigitalize/",
  tagline: "Let's Get Addicted with Us",
};

export const translations = {
  en: {
    nav: {
      solutions: "Solutions",
      industries: "Industries",
      caseStudies: "Case Studies",
      insights: "Insights",
      about: "About",
      contact: "Contact",
      cta: "Start With a Consultation",
    },
    hero: {
      headline:
        "IT Consulting & Custom Software That Runs Your Business — Not the Other Way Around",
      subheadline:
        "We help companies digitalize their business through consulting-first strategy, business process analysis, and custom-built systems — designed to fit how organizations actually operate.",
      supportingLine:
        "Business Digitalization & Transformation as Part of a Long-Term Digital Strategy — from business websites to ERP, HRIS, POS, and Warehouse Management systems.",
      primaryCta: "Start With a Consultation",
      secondaryCta: "View Our Work",
    },
    trust: {
      years: "Years of Experience",
      systems: "Systems Delivered",
      industries: "Industries Served",
    },
    philosophy: {
      title: "We Don't Start With Code. We Start With Your Business.",
      subtitle:
        "Our consulting-first approach ensures every system we build is aligned with your business goals.",
      steps: [
        {
          title: "Business & Process Consulting",
          description:
            "We analyze your current operations, identify inefficiencies, and map out opportunities for digital improvement.",
        },
        {
          title: "System Architecture & Digital Roadmap",
          description:
            "We design a comprehensive technical blueprint that aligns with your business strategy and growth plans.",
        },
        {
          title: "Custom Software Implementation",
          description:
            "We build, test, and deploy solutions tailored exactly to your operational requirements.",
        },
      ],
    },
    expertise: {
      title: "Business Digitalization & Systems We Design and Implement",
      subtitle: "Comprehensive solutions built around your business processes",
      solutions: [
        {
          id: "digitalization",
          title: "Business Digitalization & Transformation",
          description:
            "Consulting-led digitalization aligning people, processes, and technology into a clear digital roadmap.",
          icon: "Layers",
        },
        {
          id: "erp",
          title: "Custom ERP Development",
          description:
            "Integrated finance, operations, inventory, and reporting systems tailored to organizational structure.",
          icon: "Database",
        },
        {
          id: "hris",
          title: "HRIS",
          description:
            "Attendance, payroll logic, approvals, and compliance-aligned HR workflows.",
          icon: "Users",
        },
        {
          id: "pos",
          title: "Point of Sale (POS)",
          description:
            "Real-time sales, inventory synchronization, and multi-outlet management.",
          icon: "ShoppingCart",
        },
        {
          id: "wms",
          title: "Warehouse Management System (WMS)",
          description:
            "Inventory accuracy, picking optimization, logistics coordination, and ERP integration.",
          icon: "Package",
        },
        {
          id: "dms",
          title: "Document Management System (DMS)",
          description:
            "Centralized documents, approval workflows, version control, and audit trails.",
          icon: "FileText",
        },
        {
          id: "integration",
          title: "System Integration & Automation",
          description:
            "API-based integration between internal systems, third-party platforms, and legacy applications.",
          icon: "GitMerge",
        },
        {
          id: "web",
          title: "Strategic Website Development",
          description:
            "Corporate and business websites designed as part of a broader digital strategy and system ecosystem.",
          icon: "Globe",
        },
      ],
    },
    howWeWork: {
      title: "How We Work",
      subtitle: "A structured approach to delivering business value",
      steps: [
        {
          number: "01",
          title: "Discovery & Business Analysis",
          description:
            "Understanding your business, challenges, and objectives through stakeholder interviews and process mapping.",
        },
        {
          number: "02",
          title: "System Architecture & Planning",
          description:
            "Designing technical solutions that align with your business requirements and future scalability needs.",
        },
        {
          number: "03",
          title: "Agile Development",
          description:
            "Iterative development with regular feedback cycles ensuring the solution meets your expectations.",
        },
        {
          number: "04",
          title: "Deployment & Training",
          description:
            "Seamless system rollout with comprehensive training for your team.",
        },
        {
          number: "05",
          title: "Long-Term Support & Improvement",
          description:
            "Ongoing maintenance, optimization, and feature enhancements as your business evolves.",
        },
      ],
    },
    projects: {
      title: "Recent Projects & Implementations",
      subtitle: "Real solutions for real business challenges",
    },
    clients: {
      title: "Trusted by Growing Businesses",
      subtitle: "Companies that chose consulting-first digital transformation",
    },
    insights: {
      title: "Insights on Digital Transformation & Business Systems",
      subtitle: "Expert perspectives on business digitalization",
      readMore: "Read Article",
    },
    finalCta: {
      title: "Ready to Digitalize Your Business the Right Way?",
      subtitle: "Start with a consultation — not assumptions.",
      cta: "Schedule a Free Consultation",
    },
    footer: {
      company: "Company",
      solutions: "Solutions",
      insights: "Insights",
      contact: "Contact",
      tagline:
        "Let's Get Addicted with Us — to better systems and better business outcomes.",
      copyright:
        "© 2025 CV. Atlas Digital Cipta Teknologi. All rights reserved.",
    },
  },
  id: {
    nav: {
      solutions: "Solusi",
      industries: "Industri",
      caseStudies: "Studi Kasus",
      insights: "Insight",
      about: "Tentang",
      contact: "Kontak",
      cta: "Mulai dengan Konsultasi",
    },
    hero: {
      headline:
        "Konsultan TI & Perangkat Lunak Kustom yang Menyesuaikan dengan Cara Bisnis Anda Bekerja",
      subheadline:
        "Kami membantu perusahaan melakukan digitalisasi bisnis melalui strategi berbasis konsultasi, analisis proses bisnis, dan pengembangan sistem kustom — disesuaikan dengan cara organisasi bekerja secara nyata.",
      supportingLine:
        "Digitalisasi & Transformasi Bisnis sebagai Bagian dari Strategi Digital Jangka Panjang — mulai dari website bisnis hingga ERP, HRIS, POS, dan Warehouse Management.",
      primaryCta: "Mulai dengan Konsultasi",
      secondaryCta: "Lihat Proyek Kami",
    },
    trust: {
      years: "Tahun Pengalaman",
      systems: "Sistem Terkirim",
      industries: "Industri Dilayani",
    },
    philosophy: {
      title: "Kami Tidak Memulai dari Kode. Kami Memulai dari Bisnis Anda.",
      subtitle:
        "Pendekatan konsultasi-pertama kami memastikan setiap sistem yang kami bangun selaras dengan tujuan bisnis Anda.",
      steps: [
        {
          title: "Konsultasi Bisnis & Proses",
          description:
            "Kami menganalisis operasi Anda saat ini, mengidentifikasi inefisiensi, dan memetakan peluang untuk perbaikan digital.",
        },
        {
          title: "Arsitektur Sistem & Peta Jalan Digital",
          description:
            "Kami merancang cetak biru teknis komprehensif yang selaras dengan strategi bisnis dan rencana pertumbuhan Anda.",
        },
        {
          title: "Implementasi Perangkat Lunak Kustom",
          description:
            "Kami membangun, menguji, dan menerapkan solusi yang disesuaikan persis dengan kebutuhan operasional Anda.",
        },
      ],
    },
    expertise: {
      title:
        "Digitalisasi Bisnis & Sistem yang Kami Rancang dan Implementasikan",
      subtitle:
        "Solusi komprehensif yang dibangun di sekitar proses bisnis Anda",
      solutions: [
        {
          id: "digitalization",
          title: "Digitalisasi & Transformasi Bisnis",
          description:
            "Digitalisasi berbasis konsultasi yang menyelaraskan orang, proses, dan teknologi ke dalam peta jalan digital yang jelas.",
          icon: "Layers",
        },
        {
          id: "erp",
          title: "Pengembangan ERP Kustom",
          description:
            "Sistem keuangan, operasi, inventaris, dan pelaporan terintegrasi yang disesuaikan dengan struktur organisasi.",
          icon: "Database",
        },
        {
          id: "hris",
          title: "HRIS",
          description:
            "Kehadiran, logika penggajian, persetujuan, dan alur kerja HR yang sesuai kepatuhan.",
          icon: "Users",
        },
        {
          id: "pos",
          title: "Point of Sale (POS)",
          description:
            "Penjualan real-time, sinkronisasi inventaris, dan manajemen multi-outlet.",
          icon: "ShoppingCart",
        },
        {
          id: "wms",
          title: "Warehouse Management System (WMS)",
          description:
            "Akurasi inventaris, optimisasi picking, koordinasi logistik, dan integrasi ERP.",
          icon: "Package",
        },
        {
          id: "dms",
          title: "Document Management System (DMS)",
          description:
            "Dokumen terpusat, alur kerja persetujuan, kontrol versi, dan jejak audit.",
          icon: "FileText",
        },
        {
          id: "integration",
          title: "Integrasi Sistem & Otomasi",
          description:
            "Integrasi berbasis API antara sistem internal, platform pihak ketiga, dan aplikasi legacy.",
          icon: "GitMerge",
        },
        {
          id: "web",
          title: "Pengembangan Website Strategis",
          description:
            "Website korporat dan bisnis yang dirancang sebagai bagian dari strategi digital dan ekosistem sistem yang lebih luas.",
          icon: "Globe",
        },
      ],
    },
    howWeWork: {
      title: "Cara Kami Bekerja",
      subtitle: "Pendekatan terstruktur untuk memberikan nilai bisnis",
      steps: [
        {
          number: "01",
          title: "Penemuan & Analisis Bisnis",
          description:
            "Memahami bisnis, tantangan, dan tujuan Anda melalui wawancara pemangku kepentingan dan pemetaan proses.",
        },
        {
          number: "02",
          title: "Arsitektur Sistem & Perencanaan",
          description:
            "Merancang solusi teknis yang selaras dengan kebutuhan bisnis dan skalabilitas masa depan Anda.",
        },
        {
          number: "03",
          title: "Pengembangan Agile",
          description:
            "Pengembangan iteratif dengan siklus umpan balik reguler untuk memastikan solusi memenuhi harapan Anda.",
        },
        {
          number: "04",
          title: "Deployment & Pelatihan",
          description:
            "Peluncuran sistem yang mulus dengan pelatihan komprehensif untuk tim Anda.",
        },
        {
          number: "05",
          title: "Dukungan & Perbaikan Jangka Panjang",
          description:
            "Pemeliharaan berkelanjutan, optimisasi, dan peningkatan fitur seiring berkembangnya bisnis Anda.",
        },
      ],
    },
    projects: {
      title: "Proyek & Implementasi Terbaru",
      subtitle: "Solusi nyata untuk tantangan bisnis nyata",
    },
    clients: {
      title: "Dipercaya oleh Perusahaan Berkembang",
      subtitle:
        "Perusahaan yang memilih transformasi digital berbasis konsultasi",
    },
    insights: {
      title: "Insight Transformasi Digital & Sistem Bisnis",
      subtitle: "Perspektif ahli tentang digitalisasi bisnis",
      readMore: "Baca Artikel",
    },
    finalCta: {
      title: "Siap Mentransformasi Bisnis Anda dengan Cara yang Tepat?",
      subtitle: "Mulai dengan konsultasi — bukan asumsi.",
      cta: "Jadwalkan Konsultasi Gratis",
    },
    footer: {
      company: "Perusahaan",
      solutions: "Solusi",
      insights: "Insight",
      contact: "Kontak",
      tagline:
        "Let's Get Addicted with Us — menuju sistem dan hasil bisnis yang lebih baik.",
      copyright:
        "© 2025 CV. Atlas Digital Cipta Teknologi. Hak cipta dilindungi.",
    },
  },
};

export const trustMetrics = {
  years: 5,
  systems: 50,
  industries: ["Retail", "Logistics", "Services", "Manufacturing"],
};

// Client logos placeholder (static for now)
export const mockClients = [
  { id: 1, name: "TechCorp Industries", logo: "client1" },
  { id: 2, name: "Global Retail Group", logo: "client2" },
  { id: 3, name: "Manufacturing Plus", logo: "client3" },
  { id: 4, name: "Logistics Pro", logo: "client4" },
  { id: 5, name: "Service Excellence", logo: "client5" },
  { id: 6, name: "Retail Solutions", logo: "client6" },
];

export const industriesList = [
  { en: "Retail", id: "Ritel" },
  { en: "Manufacturing", id: "Manufaktur" },
  { en: "Logistics", id: "Logistik" },
  { en: "Services", id: "Jasa" },
];

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { companyInfo } from "@/lib/data";
import { Menu, X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedGradientText from "@/components/ui/animated-gradient-text";

const Header = () => {
  const { language, t, basePath } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const otherLang = language === "en" ? "id" : "en";
  const switchLangPath = pathname.replace(`/${language}`, `/${otherLang}`);

  // Professional menu order with Home
  const navItems = [
    { label: t("nav.home"), href: basePath },
    { label: t("nav.about"), href: `${basePath}/about` },
    { label: t("nav.solutions"), href: `${basePath}/solutions` },
    { label: t("nav.caseStudies"), href: `${basePath}/case-studies` },
    { label: t("nav.insights"), href: `${basePath}/insights` },
    { label: t("nav.contact"), href: `${basePath}/contact` },
  ];

  const whatsappLink = `https://wa.me/${
    companyInfo.whatsapp
  }?text=${encodeURIComponent(
    language === "en"
      ? "Hello, I would like to schedule a consultation."
      : "Halo, saya ingin menjadwalkan konsultasi."
  )}`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-slate-800/50"
          : "bg-slate-900/20 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo with styled brand name */}
          <Link href={basePath || "/"} className="flex items-center gap-3 group">
            <Image
              src={companyInfo.logo}
              alt={companyInfo.shortName}
              width={40}
              height={40}
              className="transition-transform duration-300 group-hover:scale-105"
            />
            <AnimatedGradientText className="font-bold text-lg sm:text-xl">
              {companyInfo.shortName}
            </AnimatedGradientText>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  pathname === item.href
                    ? "text-cyan-400"
                    : "text-slate-300 hover:text-cyan-400"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <Link
              href={switchLangPath}
              className="text-slate-300 hover:text-white text-sm font-medium px-3 py-1.5 rounded-md border border-slate-700 hover:border-slate-600 transition-all duration-200"
            >
              {language === "en" ? "ID" : "EN"}
            </Link>

            {/* WhatsApp CTA Button */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:block"
            >
              <Button className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/25 flex items-center gap-2 text-sm">
                <MessageCircle size={16} />
                {t("nav.cta")}
              </Button>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white p-2"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-slate-900/98 backdrop-blur-md border-t border-slate-800">
          <nav className="max-w-7xl mx-auto px-4 py-6 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block text-base font-medium py-2 transition-colors duration-200 ${
                  pathname === item.href
                    ? "text-cyan-400"
                    : "text-slate-300 hover:text-cyan-400"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block pt-4"
            >
              <Button className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold px-5 py-3 rounded-lg flex items-center justify-center gap-2">
                <MessageCircle size={18} />
                {t("nav.cta")}
              </Button>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

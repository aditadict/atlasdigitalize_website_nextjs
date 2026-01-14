import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { companyInfo } from "../../data/mock";
import { Mail, Phone, MapPin, Linkedin, Instagram } from "lucide-react";
import AnimatedGradientText from "../ui/AnimatedGradientText";

const Footer = () => {
  const { language, t } = useLanguage();
  const basePath = language === "id" ? "/id" : "/en";

  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link
              to={basePath || "/"}
              className="flex items-center gap-3 group"
            >
              <img
                src={companyInfo.logo}
                alt={companyInfo.shortName}
                className="h-10 w-10 transition-transform duration-300 group-hover:scale-105"
              />
              <AnimatedGradientText className="font-bold text-xl">
                {companyInfo.shortName}
              </AnimatedGradientText>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              {companyInfo.name}
            </p>
            <p className="text-slate-500 text-xs italic">
              {companyInfo.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              {language === "en" ? "Quick Links" : "Tautan Cepat"}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to={`${basePath}/about`}
                  className="text-slate-400 hover:text-cyan-400 transition-colors text-sm"
                >
                  {language === "en" ? "About Us" : "Tentang Kami"}
                </Link>
              </li>
              <li>
                <Link
                  to={`${basePath}/solutions`}
                  className="text-slate-400 hover:text-cyan-400 transition-colors text-sm"
                >
                  {language === "en" ? "Solutions" : "Solusi"}
                </Link>
              </li>
              <li>
                <Link
                  to={`${basePath}/case-studies`}
                  className="text-slate-400 hover:text-cyan-400 transition-colors text-sm"
                >
                  {language === "en" ? "Case Studies" : "Studi Kasus"}
                </Link>
              </li>
              <li>
                <Link
                  to={`${basePath}/insights`}
                  className="text-slate-400 hover:text-cyan-400 transition-colors text-sm"
                >
                  {language === "en" ? "Insights" : "Artikel"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              {language === "en" ? "Contact" : "Kontak"}
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${companyInfo.email}`}
                  className="flex items-start gap-2 text-slate-400 hover:text-cyan-400 transition-colors text-sm"
                >
                  <Mail size={16} className="mt-0.5 flex-shrink-0" />
                  <span className="break-all">{companyInfo.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${companyInfo.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-slate-400 hover:text-cyan-400 transition-colors text-sm"
                >
                  <Phone size={16} className="mt-0.5 flex-shrink-0" />
                  <span>{companyInfo.phone}</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2 text-slate-400 text-sm">
                  <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                  <span className="leading-relaxed">{companyInfo.address}</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              {language === "en" ? "Follow Us" : "Ikuti Kami"}
            </h3>
            <div className="flex gap-3">
              {companyInfo.linkedin && (
                <a
                  href={companyInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-800/50 border border-slate-700/50 hover:border-cyan-500/50 hover:bg-slate-800 transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} className="text-slate-400" />
                </a>
              )}
              {companyInfo.instagram && (
                <a
                  href={companyInfo.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-800/50 border border-slate-700/50 hover:border-cyan-500/50 hover:bg-slate-800 transition-all duration-300"
                  aria-label="Instagram"
                >
                  <Instagram size={18} className="text-slate-400" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800">
          <p className="text-slate-500 text-sm text-center">
            &copy; {new Date().getFullYear()} {companyInfo.name}.{" "}
            {language === "en" ? "All rights reserved" : "Hak cipta dilindungi"}
            .
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

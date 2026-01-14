import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { companyInfo } from '../../data/mock';
import { Button } from '../ui/button';
import { ArrowRight, MessageCircle } from 'lucide-react';

const FinalCtaSection = () => {
  const { language, t } = useLanguage();

  const whatsappLink = `https://wa.me/${companyInfo.whatsapp}?text=${encodeURIComponent(
    language === 'en' 
      ? 'Hello, I would like to schedule a free consultation.' 
      : 'Halo, saya ingin menjadwalkan konsultasi gratis.'
  )}`;

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-slate-950 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(6,182,212,0.15),transparent_70%)]" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(30,58,95,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(30,58,95,0.1)_1px,transparent_1px)] bg-[size:60px_60px]" />
        
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-slate-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-8">
          <span className="text-cyan-400 text-sm font-medium">
            {language === 'en' ? 'Free Consultation' : 'Konsultasi Gratis'}
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
          {t('finalCta.title')}
        </h2>

        {/* Subtitle */}
        <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
          {t('finalCta.subtitle')}
        </p>

        {/* CTA Button - WhatsApp */}
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
          <Button className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold px-10 py-5 text-lg rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/25 flex items-center gap-3 mx-auto">
            <MessageCircle size={22} />
            {t('finalCta.cta')}
            <ArrowRight size={22} />
          </Button>
        </a>

        {/* Trust Indicators */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 text-slate-400 text-sm">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>{language === 'en' ? 'No commitment required' : 'Tanpa komitmen'}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>{language === 'en' ? 'Consulting-first approach' : 'Pendekatan konsultasi-pertama'}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>{language === 'en' ? 'Expert team' : 'Tim ahli'}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCtaSection;

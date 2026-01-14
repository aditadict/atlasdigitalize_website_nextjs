import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { companyInfo } from '../../data/mock';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner';
import { submitContact } from '../../services/api';
import { Phone, Mail, MapPin, Linkedin, Instagram, Send, CheckCircle, MessageCircle } from 'lucide-react';

const ContactPage = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const whatsappLink = `https://wa.me/${companyInfo.whatsapp}?text=${encodeURIComponent(
    language === 'en' 
      ? 'Hello, I would like to schedule a consultation.' 
      : 'Halo, saya ingin menjadwalkan konsultasi.'
  )}`;

  const services = language === 'en' 
    ? [
        'Business Digitalization & Transformation',
        'Custom ERP Development',
        'HRIS',
        'Point of Sale (POS)',
        'Warehouse Management System (WMS)',
        'Document Management System (DMS)',
        'System Integration & Automation',
        'Strategic Website Development',
        'Other'
      ]
    : [
        'Digitalisasi & Transformasi Bisnis',
        'Pengembangan ERP Kustom',
        'HRIS',
        'Point of Sale (POS)',
        'Warehouse Management System (WMS)',
        'Document Management System (DMS)',
        'Integrasi Sistem & Otomasi',
        'Pengembangan Website Strategis',
        'Lainnya'
      ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Submit to backend API
      await submitContact({
        ...formData,
        language: language
      });
      
      setIsSubmitted(true);
      toast.success(
        language === 'en' 
          ? 'Thank you! We will contact you soon.' 
          : 'Terima kasih! Kami akan segera menghubungi Anda.'
      );
      
      // Reset form after delay
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          service: '',
          message: '',
        });
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error('Contact submission error:', error);
      toast.error(
        language === 'en'
          ? 'Something went wrong. Please try again.'
          : 'Terjadi kesalahan. Silakan coba lagi.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-24 bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                {language === 'en' ? 'Start With a Consultation' : 'Mulai dengan Konsultasi'}
              </h1>
              <p className="text-xl text-slate-300 mb-8">
                {language === 'en'
                  ? "Tell us about your business challenges. We'll help you find the right digital solution."
                  : 'Ceritakan tantangan bisnis Anda. Kami akan membantu menemukan solusi digital yang tepat.'}
              </p>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <Button className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold px-6 py-3 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/25 flex items-center gap-2">
                  <MessageCircle size={20} />
                  {language === 'en' ? 'Chat on WhatsApp' : 'Chat di WhatsApp'}
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <div>
                <h2 className="text-2xl font-semibold text-white mb-2">
                  {language === 'en' ? 'Or send us a message' : 'Atau kirim pesan kepada kami'}
                </h2>
                <p className="text-slate-400 mb-8">
                  {language === 'en' 
                    ? "We'll get back to you within 24 hours."
                    : 'Kami akan menghubungi Anda dalam 24 jam.'}
                </p>

                {isSubmitted ? (
                  <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-8 text-center">
                    <CheckCircle size={48} className="text-cyan-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {language === 'en' ? 'Message Sent!' : 'Pesan Terkirim!'}
                    </h3>
                    <p className="text-slate-400">
                      {language === 'en'
                        ? "We'll get back to you within 24 hours."
                        : 'Kami akan menghubungi Anda dalam 24 jam.'}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          {language === 'en' ? 'Full Name' : 'Nama Lengkap'} *
                        </label>
                        <Input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-500"
                          placeholder={language === 'en' ? 'Your name' : 'Nama Anda'}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Email *
                        </label>
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-500"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          {language === 'en' ? 'Company' : 'Perusahaan'}
                        </label>
                        <Input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-500"
                          placeholder={language === 'en' ? 'Your company' : 'Perusahaan Anda'}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          {language === 'en' ? 'Phone' : 'Telepon'}
                        </label>
                        <Input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-500"
                          placeholder="+62"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        {language === 'en' ? 'Service Interest' : 'Layanan yang Diminati'}
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-md px-3 py-2 focus:border-cyan-500 focus:outline-none"
                      >
                        <option value="" className="bg-slate-800">
                          {language === 'en' ? 'Select a service' : 'Pilih layanan'}
                        </option>
                        {services.map((service, index) => (
                          <option key={index} value={service} className="bg-slate-800">
                            {service}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        {language === 'en' ? 'Message' : 'Pesan'} *
                      </label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-500"
                        placeholder={language === 'en' ? 'Tell us about your project...' : 'Ceritakan tentang proyek Anda...'}
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-4 rounded-lg transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          {language === 'en' ? 'Sending...' : 'Mengirim...'}
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          {language === 'en' ? 'Send Message' : 'Kirim Pesan'}
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>

              {/* Contact Info */}
              <div>
                <h2 className="text-2xl font-semibold text-white mb-8">
                  {language === 'en' ? 'Contact Information' : 'Informasi Kontak'}
                </h2>

                <div className="space-y-6 mb-12">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 transition-all duration-200"
                  >
                    <div className="p-3 rounded-lg bg-cyan-500/20 text-cyan-400">
                      <MessageCircle size={20} />
                    </div>
                    <div>
                      <p className="text-cyan-400 text-sm mb-1 font-medium">
                        WhatsApp ({language === 'en' ? 'Preferred' : 'Diutamakan'})
                      </p>
                      <p className="text-white font-medium">{companyInfo.phone}</p>
                    </div>
                  </a>

                  <a
                    href={`tel:${companyInfo.phone}`}
                    className="flex items-start gap-4 p-4 rounded-xl bg-slate-800/30 border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-200"
                  >
                    <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm mb-1">
                        {language === 'en' ? 'Phone' : 'Telepon'}
                      </p>
                      <p className="text-white font-medium">{companyInfo.phone}</p>
                    </div>
                  </a>

                  <a
                    href={`mailto:${companyInfo.email}`}
                    className="flex items-start gap-4 p-4 rounded-xl bg-slate-800/30 border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-200"
                  >
                    <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm mb-1">Email</p>
                      <p className="text-white font-medium">{companyInfo.email}</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-800/30 border border-slate-700/50">
                    <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm mb-1">
                        {language === 'en' ? 'Office' : 'Kantor'}
                      </p>
                      <p className="text-white font-medium">{companyInfo.address}</p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div>
                  <h3 className="text-lg font-medium text-white mb-4">
                    {language === 'en' ? 'Follow Us' : 'Ikuti Kami'}
                  </h3>
                  <div className="flex gap-4">
                    <a
                      href={companyInfo.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all duration-200"
                    >
                      <Linkedin size={20} />
                    </a>
                    <a
                      href={companyInfo.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all duration-200"
                    >
                      <Instagram size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;

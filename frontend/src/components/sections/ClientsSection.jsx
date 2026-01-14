import React, { useState, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { getClients } from "../../services/api";
import useEmblaCarousel from "embla-carousel-react";
import { Loader2 } from "lucide-react";

const ClientsSection = () => {
  const { language, t } = useLanguage();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
    containScroll: "trimSnaps",
    dragFree: true,
  });

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await getClients();
        setClients(data);
      } catch (err) {
        console.error("Error fetching clients:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  // Auto-scroll carousel
  useEffect(() => {
    if (!emblaApi || clients.length === 0) return;

    const autoScroll = setInterval(() => {
      emblaApi.scrollNext();
    }, 3000);

    return () => clearInterval(autoScroll);
  }, [emblaApi, clients.length]);

  if (loading) {
    return (
      <section className="bg-slate-950 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Loader2 size={40} className="text-cyan-400 animate-spin mx-auto" />
        </div>
      </section>
    );
  }

  if (clients.length === 0) {
    return null;
  }

  return (
    <section className="bg-slate-950 py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            {t("clients.title")}
          </h2>
          <p className="text-slate-400">{t("clients.subtitle")}</p>
        </div>

        {/* Client Logos Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {clients.map((client) => (
              <div key={client.id} className="flex-[0_0_auto] w-[200px]">
                <div className="flex items-center justify-center h-24 rounded-xl bg-slate-800/30 border border-slate-700/30 hover:border-cyan-500/30 transition-all duration-300 p-4">
                  {client.logo ? (
                    <img
                      src={`${process.env.REACT_APP_BACKEND_URL}/storage/${client.logo}`}
                      alt={client.name}
                      className="max-w-full max-h-full object-contain filter brightness-90"
                    />
                  ) : (
                    <span className="text-slate-300 text-sm font-medium text-center">
                      {client.name}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Scissors, Clock, Calendar, CheckCircle2, Sparkles, User } from 'lucide-react';

interface SalonViewProps {
  onOpenBooking: (serviceId?: string) => void;
}

export const SalonView: React.FC<SalonViewProps> = ({ onOpenBooking }) => {
  const { services, t, language } = useApp();
  const [filter, setFilter] = useState<'all' | 'men' | 'women'>('all');

  const filteredServices = services.filter((s) => {
    if (filter === 'all') return true;
    return s.category === filter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-8 sm:space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="text-xs font-bold uppercase tracking-widest text-[#8C6B28]">
          Atelier d'Application Coiffure & Beauté
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-[#2D241E] font-display text-balance">
          {t('salonTitle')}
        </h1>
        <p className="text-sm text-[#6B5E52] leading-relaxed">
          {t('salonSubtitle')}. Un cadre moderne et raffiné à Mostaganem pour prendre soin de votre style tout en soutenant l'apprentissage d'excellence.
        </p>
      </div>

      {/* Hero Showcase Split */}
      <div className="bg-gradient-to-br from-white to-[#FAF7F2] text-[#2D241E] rounded-2xl border border-[#E8DEC8] overflow-hidden grid grid-cols-1 lg:grid-cols-2 items-center shadow-sm">
        <div className="p-6 sm:p-10 lg:p-12 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#FAF4E6] text-[#8C6B28] border border-[#E8DEC8] text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A45C]" />
            <span>Salon d'Application École Benzaza</span>
          </div>

          <h2 className="text-xl sm:text-3xl font-bold font-display leading-tight text-[#2D241E]">
            L'Élégance du Ciseau & du Rasoir
          </h2>

          <p className="text-xs sm:text-sm text-[#6B5E52] leading-relaxed">
            Nos ateliers coiffure masculine et féminine sont équipés de fauteuils de barbier ergonomiques, de bacs de lavage confortables et de matériel professionnel de premier ordre. Chaque prestation est supervisée par nos maîtres formateurs.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-[#EAE3D6]">
            <div>
              <span className="text-[10px] uppercase text-[#7A6E63] block">Horaires de réservation</span>
              <strong className="text-xs text-[#2D241E] block mt-0.5">Samedi au Jeudi</strong>
            </div>
            <div>
              <span className="text-[10px] uppercase text-[#7A6E63] block">Créneaux disponibles</span>
              <strong className="text-xs text-[#8C6B28] font-mono block mt-0.5">09h00 - 18h00</strong>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => onOpenBooking()}
              className="w-full sm:w-auto px-6 py-3 bg-[#C9A45C] hover:bg-[#DFC283] text-white font-bold text-xs uppercase tracking-wider rounded transition-colors shadow-md shadow-[#C9A45C]/20 text-center"
            >
              {t('bookAppointment')}
            </button>
          </div>
        </div>

        <div className="h-64 sm:h-72 lg:h-full relative overflow-hidden bg-neutral-100">
          <img
            src="/src/assets/images/barber_coiffure_master_1794418834548.jpg"
            alt="Atelier Coiffure et Barbier Chef Benzaza"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center">
        <div className="flex items-center gap-1 overflow-x-auto max-w-full scrollbar-none p-1 bg-white border border-[#E8DEC8] rounded-lg shadow-xs">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 sm:px-4 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
              filter === 'all'
                ? 'bg-[#C9A45C] text-white shadow-xs'
                : 'text-[#6B5E52] hover:text-[#8C6B28]'
            }`}
          >
            Toutes les prestations
          </button>
          <button
            onClick={() => setFilter('men')}
            className={`px-3 sm:px-4 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
              filter === 'men'
                ? 'bg-[#C9A45C] text-white shadow-xs'
                : 'text-[#6B5E52] hover:text-[#8C6B28]'
            }`}
          >
            {t('salonCategory_men')}
          </button>
          <button
            onClick={() => setFilter('women')}
            className={`px-3 sm:px-4 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
              filter === 'women'
                ? 'bg-[#C9A45C] text-white shadow-xs'
                : 'text-[#6B5E52] hover:text-[#8C6B28]'
            }`}
          >
            {t('salonCategory_women')}
          </button>
        </div>
      </div>

      {/* Services Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-xl border border-[#E8DEC8] shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col sm:flex-row group"
          >
            <div className="sm:w-2/5 h-52 sm:h-auto relative overflow-hidden bg-neutral-100 shrink-0">
              <img
                src={service.image}
                alt={service.title[language] || service.title.fr}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 bg-white/95 text-[#8C6B28] text-[10px] font-mono px-2 py-0.5 rounded border border-[#EADFC7] shadow-xs backdrop-blur-xs">
                {service.category === 'men' ? 'Homme' : 'Femme'}
              </div>
            </div>

            <div className="p-5 sm:p-6 sm:w-3/5 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-[#7A6E63] mb-2">
                  <Clock className="w-3.5 h-3.5 text-[#C9A45C]" />
                  <span>{service.durationMinutes} {t('approxMinutes')}</span>
                </div>

                <h3 className="text-base font-bold text-[#2D241E] font-display">
                  {service.title[language] || service.title.fr}
                </h3>

                <p className="text-xs text-[#6B5E52] line-clamp-3 mt-2 leading-relaxed">
                  {service.description[language] || service.description.fr}
                </p>
              </div>

              <div className="pt-4 border-t border-[#F1ECE1] flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] uppercase text-[#7A6E63] block">Tarif soin</span>
                  <span className="text-base font-bold font-mono text-[#8C6B28] tabular-nums">
                    {service.priceDZD} {t('dzd')}
                  </span>
                </div>

                <button
                  onClick={() => onOpenBooking(service.id)}
                  className="px-4 py-2 bg-[#C9A45C] hover:bg-[#DFC283] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors flex items-center gap-1.5 whitespace-nowrap shadow-xs"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Réserver</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

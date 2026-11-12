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
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="text-xs font-semibold uppercase tracking-widest text-[#C9A45C]">
          Atelier d'Application Coiffure & Beauté
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#171717] font-display text-balance">
          {t('salonTitle')}
        </h1>
        <p className="text-sm text-neutral-600 leading-relaxed">
          {t('salonSubtitle')}. Un cadre moderne et raffiné à Oran pour prendre soin de votre style tout en soutenant l'apprentissage d'excellence.
        </p>
      </div>

      {/* Hero Showcase Split */}
      <div className="bg-[#171717] text-white rounded-2xl border border-[#2d2a24] overflow-hidden grid grid-cols-1 lg:grid-cols-2 items-center">
        <div className="p-8 sm:p-12 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#C9A45C]/15 text-[#C9A45C] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Salon d'Application École Benzaza</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold font-display leading-tight">
            L'Élégance du Ciseau & du Rasoir
          </h2>

          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            Nos ateliers coiffure masculine et féminine sont équipés de fauteuils de barbier ergonomiques, de bacs de lavage confortables et de matériel professionnel de premier ordre. Chaque prestation est supervisée par nos maîtres formateurs.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-[#2e2e2e]">
            <div>
              <span className="text-[10px] uppercase text-neutral-400 block">Horaires de réservation</span>
              <strong className="text-xs text-white block mt-0.5">Samedi au Jeudi</strong>
            </div>
            <div>
              <span className="text-[10px] uppercase text-neutral-400 block">Créneaux disponibles</span>
              <strong className="text-xs text-[#C9A45C] font-mono block mt-0.5">09h00 - 18h00</strong>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => onOpenBooking()}
              className="px-6 py-3 bg-[#C9A45C] hover:bg-[#DFC283] text-[#171717] font-bold text-xs uppercase tracking-wider rounded transition-colors shadow-md shadow-[#C9A45C]/20"
            >
              {t('bookAppointment')}
            </button>
          </div>
        </div>

        <div className="h-72 lg:h-full relative overflow-hidden bg-neutral-900">
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
        <div className="inline-flex p-1 bg-white border border-[#E6DFD3] rounded-lg shadow-xs">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors ${
              filter === 'all'
                ? 'bg-[#171717] text-[#C9A45C]'
                : 'text-neutral-600 hover:text-black'
            }`}
          >
            Toutes les prestations
          </button>
          <button
            onClick={() => setFilter('men')}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors ${
              filter === 'men'
                ? 'bg-[#171717] text-[#C9A45C]'
                : 'text-neutral-600 hover:text-black'
            }`}
          >
            {t('salonCategory_men')}
          </button>
          <button
            onClick={() => setFilter('women')}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors ${
              filter === 'women'
                ? 'bg-[#171717] text-[#C9A45C]'
                : 'text-neutral-600 hover:text-black'
            }`}
          >
            {t('salonCategory_women')}
          </button>
        </div>
      </div>

      {/* Services Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-xl border border-[#E6DFD3] shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col sm:flex-row group"
          >
            <div className="sm:w-2/5 h-48 sm:h-auto relative overflow-hidden bg-neutral-100 shrink-0">
              <img
                src={service.image}
                alt={service.title[language] || service.title.fr}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 bg-[#171717]/85 text-[#C9A45C] text-[10px] font-mono px-2 py-0.5 rounded backdrop-blur-xs">
                {service.category === 'men' ? 'Homme' : 'Femme'}
              </div>
            </div>

            <div className="p-6 sm:w-3/5 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-neutral-500 mb-2">
                  <Clock className="w-3.5 h-3.5 text-[#C9A45C]" />
                  <span>{service.durationMinutes} {t('approxMinutes')}</span>
                </div>

                <h3 className="text-base font-bold text-[#171717] font-display">
                  {service.title[language] || service.title.fr}
                </h3>

                <p className="text-xs text-neutral-600 line-clamp-3 mt-2 leading-relaxed">
                  {service.description[language] || service.description.fr}
                </p>
              </div>

              <div className="pt-4 border-t border-[#F1ECE1] flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase text-neutral-400 block">Tarif soin</span>
                  <span className="text-base font-bold font-mono text-[#171717] tabular-nums">
                    {service.priceDZD} {t('dzd')}
                  </span>
                </div>

                <button
                  onClick={() => onOpenBooking(service.id)}
                  className="px-4 py-2 bg-[#171717] hover:bg-[#C9A45C] hover:text-[#171717] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors flex items-center gap-1.5 whitespace-nowrap shadow-xs"
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

import React from 'react';
import { useApp } from '../context/AppContext';
import {
  GraduationCap,
  Award,
  Users,
  Compass,
  Building,
  CheckCircle,
  MapPin,
  Flame,
  Scissors,
} from 'lucide-react';

interface AboutViewProps {
  onNavigate: (view: string) => void;
  onOpenRegistration: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate, onOpenRegistration }) => {
  const { t, language, settings, courses } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="text-xs font-semibold uppercase tracking-widest text-[#C9A45C]">
          Histoire & Savoir-Faire
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#171717] font-display text-balance">
          L'Académie Professionnelle Chef Benzaza
        </h1>
        <p className="text-sm text-neutral-600 leading-relaxed">
          {t('slogan')} — Un engagement sans compromis pour l'excellence et la transmission des métiers manuels et techniques à Oran.
        </p>
      </div>

      {/* Founder Story Split */}
      <div className="bg-white rounded-2xl border border-[#E6DFD3] overflow-hidden grid grid-cols-1 lg:grid-cols-2 items-center">
        <div className="p-8 sm:p-12 space-y-6">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C9A45C]">
            <Award className="w-4 h-4" />
            <span>Fondation & Vision</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-[#171717] font-display">
            {t('aboutHistoryTitle')}
          </h2>

          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            {t('aboutHistoryDesc')}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#F1ECE1]">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#171717] block">
                {t('aboutMissionTitle')}
              </span>
              <p className="text-[11px] text-neutral-500 leading-relaxed">
                {t('aboutMissionDesc')}
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#171717] block">
                {t('aboutVisionTitle')}
              </span>
              <p className="text-[11px] text-neutral-500 leading-relaxed">
                {t('aboutVisionDesc')}
              </p>
            </div>
          </div>
        </div>

        <div className="h-80 lg:h-full relative overflow-hidden bg-neutral-900">
          <img
            src="/src/assets/images/hero_chef_kitchen_1794418831073.jpg"
            alt="Chef Benzaza dans les cuisines de l'école"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>

      {/* Facilities & Classrooms */}
      <div className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl font-bold text-[#171717] font-display">
            {t('aboutFacilitiesTitle')}
          </h2>
          <p className="text-xs text-neutral-600">
            {t('aboutFacilitiesDesc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-[#E6DFD3] p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#C9A45C]/15 text-[#8C6B28] flex items-center justify-center font-bold">
              <Flame className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#171717] font-display">
              Laboratoire de Pâtisserie & Boulangerie
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Plan de travail en marbre et inox, laminoirs professionnels, cellules de refroidissement rapide, fours rotatifs et tempéreuses à chocolat.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-[#E6DFD3] p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#C9A45C]/15 text-[#8C6B28] flex items-center justify-center font-bold">
              <Scissors className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#171717] font-display">
              Salon d'Application Coiffure & Barbier
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Postes de coiffage individuels avec grands miroirs biseautés, fauteuils barbier en cuir, stérilisateurs UV et bacs massants.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-[#E6DFD3] p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#C9A45C]/15 text-[#8C6B28] flex items-center justify-center font-bold">
              <Building className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#171717] font-display">
              Laboratoire Informatique & Four à Bois
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Postes de travail PC modernes connectés en fibre optique, et espace pizzeria équipé d’un authentique four à sole napolitain.
            </p>
          </div>
        </div>
      </div>

      {/* Instructors & Master Chefs */}
      <div className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="text-xs font-semibold uppercase tracking-widest text-[#C9A45C]">
            L'Excellence de la Transmission
          </div>
          <h2 className="text-2xl font-bold text-[#171717] font-display">
            {t('aboutInstructorsTitle')}
          </h2>
          <p className="text-xs text-neutral-600">
            {t('aboutInstructorsSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.slice(0, 4).map((c) => (
            <div
              key={c.id}
              className="bg-white p-6 rounded-xl border border-[#E6DFD3] space-y-3 text-center"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-[#171717] text-[#C9A45C] flex items-center justify-center font-bold text-lg font-display border-2 border-[#C9A45C]">
                {c.instructor.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#171717]">{c.instructor.name}</h4>
                <p className="text-[11px] text-[#C9A45C] font-semibold mt-0.5">
                  {c.instructor.role[language] || c.instructor.role.fr}
                </p>
              </div>
              <p className="text-xs text-neutral-500 leading-relaxed">
                {c.instructor.experience[language] || c.instructor.experience.fr}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Box */}
      <div className="bg-[#171717] text-white p-8 sm:p-12 rounded-2xl border border-[#2d2a24] text-center space-y-5">
        <h3 className="text-2xl font-bold font-display">
          Prêt à transformer votre passion en carrière d'avenir ?
        </h3>
        <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto leading-relaxed">
          Les inscriptions pour les prochaines promotions sont ouvertes. Nombre de places limité par atelier pour garantir un encadrement personnalisé.
        </p>
        <div className="pt-2 flex justify-center gap-4">
          <button
            onClick={onOpenRegistration}
            className="px-6 py-3 bg-[#C9A45C] hover:bg-[#DFC283] text-[#171717] font-bold text-xs uppercase tracking-wider rounded transition-colors"
          >
            {t('registerNow')}
          </button>
        </div>
      </div>

    </div>
  );
};

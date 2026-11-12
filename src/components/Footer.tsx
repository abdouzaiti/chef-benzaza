import React from 'react';
import { useApp } from '../context/AppContext';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  GraduationCap,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string) => void;
  onOpenRegistration: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenRegistration }) => {
  const { t, settings, language } = useApp();

  const handleNav = (view: string) => {
    onNavigate(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#141414] text-neutral-300 border-t border-[#262626] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Col 1: Brand & Slogan */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Logo École Chef Benzaza"
                className="h-16 sm:h-20 w-auto object-contain drop-shadow-[0_2px_10px_rgba(201,164,92,0.3)]"
              />
            </div>

            <p className="text-sm text-neutral-400 leading-relaxed italic border-l-2 rtl:border-l-0 rtl:border-r-2 border-[#C9A45C] pl-3 rtl:pl-0 rtl:pr-3">
              "{settings.slogan[language] || settings.slogan.fr}"
            </p>

            <p className="text-xs text-neutral-400 leading-relaxed">
              {language === 'ar'
                ? 'الصرح التكويني المرجعي في الغرب الجزائري لتعليم فنون الطبخ والحلويات، الحلاقة والإعلام الآلي بشهادات تأهيلية وتدريب تطبيقي مكثف.'
                : language === 'en'
                ? 'The premier vocational academy in Oran, Algeria specializing in high-mastery culinary arts, artisan bakery, barbering and office technology.'
                : "L'académie professionnelle de référence à Oran pour l'apprentissage des métiers de la gastronomie, de la coiffure et des technologies appliquées."}
            </p>
          </div>

          {/* Col 2: Formations */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-2 h-0.5 bg-[#C9A45C]"></span>
              {t('navCourses')}
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <button
                  onClick={() => handleNav('courses')}
                  className="hover:text-[#C9A45C] transition-colors flex items-center justify-between w-full text-left rtl:text-right"
                >
                  <span>{t('courseCategory_pastry')}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('courses')}
                  className="hover:text-[#C9A45C] transition-colors flex items-center justify-between w-full text-left rtl:text-right"
                >
                  <span>{t('courseCategory_pizza')}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('courses')}
                  className="hover:text-[#C9A45C] transition-colors flex items-center justify-between w-full text-left rtl:text-right"
                >
                  <span>{t('courseCategory_culinary')}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('courses')}
                  className="hover:text-[#C9A45C] transition-colors flex items-center justify-between w-full text-left rtl:text-right"
                >
                  <span>{t('courseCategory_barber')}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('courses')}
                  className="hover:text-[#C9A45C] transition-colors flex items-center justify-between w-full text-left rtl:text-right"
                >
                  <span>{t('courseCategory_hairdressing')}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('courses')}
                  className="hover:text-[#C9A45C] transition-colors flex items-center justify-between w-full text-left rtl:text-right"
                >
                  <span>{t('courseCategory_it')}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Navigation Rapide */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-2 h-0.5 bg-[#C9A45C]"></span>
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-white transition-colors">
                  {t('navHome')}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-white transition-colors">
                  {t('navAbout')}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('store')} className="hover:text-white transition-colors">
                  {t('navStore')}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('salon')} className="hover:text-white transition-colors">
                  {t('navSalon')}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('gallery')} className="hover:text-white transition-colors">
                  {t('navGallery')}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-white transition-colors">
                  {t('navContact')}
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenRegistration}
                  className="text-[#C9A45C] font-semibold hover:underline"
                >
                  {t('registerNow')}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Horaires à Oran */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-2 h-0.5 bg-[#C9A45C]"></span>
              {t('contactTitle')}
            </h4>

            <div className="space-y-3 text-xs text-neutral-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C9A45C] shrink-0 mt-0.5" />
                <span>{settings.address}, {settings.city}, {settings.country}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C9A45C] shrink-0" />
                <span className="tabular-nums font-mono">{settings.phone} / {settings.phoneSecondary}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C9A45C] shrink-0" />
                <span>{settings.email}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#C9A45C] shrink-0 mt-0.5" />
                <span>{settings.openingHours[language] || settings.openingHours.fr}</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={`https://wa.me/${settings.whatsapp.replace(/\+/g, '')}?text=${encodeURIComponent(
                  language === 'ar'
                    ? 'السلام عليكم، أود الاستفسار عن التسجيل في مدرسة الشيف بن زازة'
                    : 'Bonjour, je souhaite me renseigner sur les formations de l’École Chef Benzaza.'
                )}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] border border-[#25D366]/30 rounded text-xs font-semibold transition-colors"
              >
                <span>WhatsApp Officiel</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Copyright & Admin Portal */}
        <div className="pt-8 border-t border-[#222222] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © {new Date().getFullYear()} ECOLE CHEF BENZAZA — Tous droits réservés. Oran, Algérie.
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => handleNav('admin')}
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#C9A45C]" />
              <span>{t('navAdmin')}</span>
            </button>
            <span className="text-neutral-700">|</span>
            <button onClick={() => handleNav('contact')} className="hover:text-white transition-colors">
              Plan d’accès
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

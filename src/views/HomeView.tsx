import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import {
  GraduationCap,
  ArrowRight,
  Clock,
  Sparkles,
  ShoppingBag,
  Scissors,
  CheckCircle2,
  Star,
  MapPin,
  ChevronRight,
  User,
} from 'lucide-react';

interface HomeViewProps {
  onNavigate: (view: string) => void;
  onOpenRegistration: (courseId?: string) => void;
  onOpenBooking: (serviceId?: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onOpenRegistration,
  onOpenBooking,
}) => {
  const { courses, products, services, testimonials, t, language, isRtl, addToCart, settings } = useApp();

  const [activeCourseId, setActiveCourseId] = useState<string>(courses[0]?.id || '');
  const homeSidebarRef = useRef<HTMLDivElement>(null);

  const popularProducts = products.filter((p) => p.isPopular).slice(0, 3);

  // Scrollspy for Home page featured section
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -50% 0px',
      threshold: 0.1,
    };

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('data-home-course-id');
          if (id) {
            setActiveCourseId(id);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const cards = document.querySelectorAll('[data-home-course-id]');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [courses]);

  const handleSelectHomeCoursePath = (id: string) => {
    setActiveCourseId(id);
    const targetEl = document.getElementById(`home-course-card-${id}`);
    if (targetEl) {
      const yOffset = -90;
      const y = targetEl.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-24 pb-20">
      
      {/* 1. HERO SECTION — Luxury White & Gold Atmosphere */}
      <section className="relative min-h-[580px] lg:min-h-[640px] flex items-center bg-gradient-to-br from-white via-[#FAF7F2] to-[#F5EEDB] text-[#2D241E] overflow-hidden border-b border-[#EADFC7]">
        {/* Background photo with white & gold scrim for high contrast */}
        <div className="absolute inset-0">
          <img
            src="/src/assets/images/hero_chef_kitchen_1794418831073.jpg"
            alt="Chef Exécutif dans la cuisine de l'école Benzaza à Mostaganem"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-40 lg:opacity-50 filter brightness-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent rtl:bg-gradient-to-l" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-white/40" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-8 py-20 lg:py-28 z-10 w-full">
          <div className="max-w-2xl space-y-6">
            
            {/* Quiet unboxed kicker */}
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#8C6B28]">
              <span>{t('heroBadge')}</span>
              <span aria-hidden="true">·</span>
              <span>Fondée par Chef Benzaza</span>
            </div>

            {/* Headline with text-wrap: balance */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#2D241E] leading-[1.15] font-display text-balance">
              {t('heroTitle')}
            </h1>

            {/* Slogan & Subtitle */}
            <p className="text-base sm:text-lg text-[#6B5E52] font-normal leading-relaxed">
              {t('heroSubtitle')}
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onOpenRegistration()}
                className="px-6 py-3.5 bg-[#C9A45C] hover:bg-[#DFC283] text-white font-bold text-xs uppercase tracking-wider rounded-md transition-all shadow-md shadow-[#C9A45C]/25 whitespace-nowrap"
              >
                {t('registerNow')}
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('home-formations-section');
                  if (el) {
                    const yOffset = -80;
                    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                  }
                }}
                className="px-6 py-3.5 bg-white hover:bg-[#FAF7F2] text-[#8C6B28] border border-[#C9A45C] font-bold text-xs uppercase tracking-wider rounded-md transition-all shadow-xs whitespace-nowrap"
              >
                {t('discoverCourses')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED COURSES SECTION — Interactive Split Path & Scrollspy Directly on Main Landing Page */}
      <section id="home-formations-section" className="max-w-7xl mx-auto px-4 sm:px-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-[#C9A45C] mb-2">
              Diplômes & Certifications — Mostaganem
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#2D241E] font-display text-balance">
              {t('featuredCoursesTitle')}
            </h2>
            <p className="text-sm text-[#6B5E52] mt-1 max-w-xl">
              {t('featuredCoursesSubtitle')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-2.5 sm:gap-6 lg:gap-8 items-start">
          
          {/* LEFT SIDEBAR: Simple Rectangular Formation List (Visible on ALL Screen Sizes) */}
          <div className="col-span-4 sm:col-span-4 lg:col-span-4 sticky top-16 sm:top-24 self-start">
            <div className="bg-white border border-[#E8DEC8] flex flex-col shadow-xs overflow-hidden">
              <div className="p-2.5 sm:p-4 bg-[#FAF7F2] border-b border-[#E8DEC8]">
                <h3 className="text-xs sm:text-sm font-bold text-[#2D241E] font-display uppercase tracking-wider">
                  Nos Formations
                </h3>
              </div>
              <div
                ref={homeSidebarRef}
                className="max-h-[calc(100vh-120px)] sm:max-h-[calc(100vh-180px)] overflow-y-auto divide-y divide-[#E8DEC8]"
              >
                {courses.map((course) => {
                  const isActive = activeCourseId === course.id;
                  return (
                    <button
                      key={`home-path-${course.id}`}
                      id={`home-path-${course.id}`}
                      onClick={() => handleSelectHomeCoursePath(course.id)}
                      className={`w-full text-left p-2.5 sm:p-4 transition-colors flex flex-col ${
                        isActive
                          ? 'bg-[#FAF4E6] border-l-2 sm:border-l-4 border-l-[#8C6B28] text-[#2D241E]'
                          : 'bg-white hover:bg-[#FAF7F2] text-[#2D241E]'
                      }`}
                    >
                      {/* BIG BOLD FORMATION TITLE */}
                      <span className={`text-xs sm:text-base font-bold font-display leading-tight line-clamp-2 ${
                        isActive ? 'text-[#8C6B28]' : 'text-[#2D241E]'
                      }`}>
                        {course.title[language] || course.title.fr}
                      </span>

                      {/* FORMATEUR NAME DOWNSIDE THE FORMATION NAME */}
                      <span className="text-[10px] sm:text-xs font-semibold text-[#8C6B28] mt-1 block">
                        {course.instructor.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Detailed Cards (Visible on ALL Screen Sizes) */}
          <div className="col-span-8 sm:col-span-8 lg:col-span-8 space-y-4 sm:space-y-8">
            {courses.map((course) => (
              <div
                key={`home-card-${course.id}`}
                id={`home-course-card-${course.id}`}
                data-home-course-id={course.id}
                className={`bg-white border transition-colors overflow-hidden shadow-xs ${
                  activeCourseId === course.id ? 'border-[#8C6B28] ring-1 ring-[#8C6B28]' : 'border-[#E8DEC8]'
                }`}
              >
                <div className="relative w-full aspect-[9/10] overflow-hidden bg-[#FAF7F2] flex items-center justify-center">
                  <img
                    src={course.image}
                    alt={course.title[language] || course.title.fr}
                    referrerPolicy="no-referrer"
                    className="w-full h-auto max-h-full object-contain object-center"
                  />
                  <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3 bg-white/95 text-[#8C6B28] text-xs font-mono font-bold px-3 py-1 border border-[#EADFC7] shadow-xs">
                    {course.priceDZD} {t('dzd')}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#7A6E63] mb-1">
                      <Clock className="w-3.5 h-3.5 text-[#C9A45C]" />
                      <span>{course.duration[language] || course.duration.fr}</span>
                    </div>
                    <h3 className="text-xl font-bold text-[#2D241E] font-display">
                      {course.title[language] || course.title.fr}
                    </h3>
                    <div className="text-xs font-semibold text-[#8C6B28] mt-1">
                      {course.instructor.name}
                    </div>
                    <p className="text-xs text-[#6B5E52] mt-2 leading-relaxed">
                      {course.shortDesc[language] || course.shortDesc.fr}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#F1ECE1] flex items-center justify-between gap-3">
                    <button
                      onClick={() => onNavigate('courses')}
                      className="text-xs font-semibold text-[#6B5E52] hover:text-[#8C6B28] transition-colors"
                    >
                      {t('viewDetails')}
                    </button>

                    <button
                      onClick={() => onOpenRegistration(course.id)}
                      className="px-4 py-2 bg-[#C9A45C] hover:bg-[#DFC283] text-white text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap shadow-xs"
                    >
                      {t('registerShort')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. POPULAR BOUTIQUE CREATIONS */}
      <section className="bg-white border-y border-[#E8DEC8] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-[#8C6B28] mb-2">
                Ateliers Culinaires & Pâtisserie
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#2D241E] font-display text-balance">
                {t('popularProductsTitle')}
              </h2>
              <p className="text-sm text-[#6B5E52] mt-1 max-w-xl">
                {t('popularProductsSubtitle')}
              </p>
            </div>
            <button
              onClick={() => onNavigate('store')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8C6B28] hover:text-[#C9A45C] uppercase tracking-wider transition-colors shrink-0"
            >
              <span>{t('filterAll')}</span>
              <ChevronRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {popularProducts.map((product) => (
              <div
                key={product.id}
                className="bg-[#FAF7F2] rounded-xl border border-[#E8DEC8] shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col group"
              >
                <div className="relative h-60 overflow-hidden bg-neutral-100">
                  <img
                    src={product.image}
                    alt={product.name[language] || product.name.fr}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 bg-white/95 text-neutral-800 text-[11px] font-semibold px-2 py-0.5 rounded shadow-xs border border-[#EADFC7]">
                    {product.stock > 0 ? (
                      <span className="text-emerald-700">En stock ({product.stock})</span>
                    ) : (
                      <span className="text-red-700">Épuisé</span>
                    )}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-[#2D241E] font-display">
                      {product.name[language] || product.name.fr}
                    </h3>
                    <p className="text-xs text-[#6B5E52] line-clamp-2 mt-2 leading-relaxed">
                      {product.description[language] || product.description.fr}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#EAE3D6] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase text-[#7A6E63] block">Prix atelier</span>
                      <span className="text-base font-bold font-mono text-[#8C6B28] tabular-nums">
                        {product.priceDZD} {t('dzd')}
                      </span>
                    </div>

                    <button
                      onClick={() => addToCart(product, 1)}
                      disabled={product.stock <= 0}
                      className="px-4 py-2 bg-[#C9A45C] hover:bg-[#DFC283] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors flex items-center gap-1.5 shadow-xs"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>{t('addToCart')}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SALON & BARBERSHOP TEASER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-gradient-to-br from-[#FAF7F2] to-[#F5EEDB] text-[#2D241E] rounded-2xl border border-[#E8DEC8] overflow-hidden grid grid-cols-1 lg:grid-cols-2 items-center shadow-sm">
          <div className="p-8 sm:p-12 lg:p-16 space-y-6">
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#8C6B28]">
              <Scissors className="w-4 h-4 text-[#C9A45C]" />
              <span>Studio d'application & Coiffure</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display leading-tight text-[#2D241E] text-balance">
              {t('salonTitle')}
            </h2>

            <p className="text-sm text-[#6B5E52] leading-relaxed">
              {t('salonSubtitle')}. Bénéficiez de prestations haut de gamme (dégradé américain, rasage traditionnel, brushing glamour, soins kératine) dans notre salon chic à Mostaganem.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => onOpenBooking()}
                className="px-6 py-3 bg-[#C9A45C] hover:bg-[#DFC283] text-white font-bold text-xs uppercase tracking-wider rounded transition-colors shadow-xs"
              >
                {t('bookAppointment')}
              </button>
              <button
                onClick={() => onNavigate('salon')}
                className="px-6 py-3 bg-white hover:bg-[#FBF8F1] text-[#8C6B28] text-xs font-bold uppercase tracking-wider rounded border border-[#C9A45C] transition-colors shadow-xs"
              >
                Découvrir la carte des soins
              </button>
            </div>
          </div>

          <div className="h-72 lg:h-full relative overflow-hidden bg-neutral-100">
            <img
              src="/src/assets/images/barber_coiffure_master_1794418834548.jpg"
              alt="Salon barbier et coiffure de l'école Benzaza"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE OUR SCHOOL (Claim-to-Proof Adjacency) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="text-xs font-bold uppercase tracking-widest text-[#8C6B28]">
            L'Engagement Benzaza
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#2D241E] font-display text-balance">
            {t('whyChooseTitle')}
          </h2>
          <p className="text-sm text-[#6B5E52]">
            {t('whyChooseSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-xl border border-[#E8DEC8] space-y-3 shadow-xs">
            <div className="w-12 h-12 rounded-lg bg-[#FAF4E6] text-[#8C6B28] flex items-center justify-center font-bold border border-[#E8DEC8]">
              01
            </div>
            <h3 className="text-base font-bold text-[#2D241E] font-display">
              {t('whyReason1Title')}
            </h3>
            <p className="text-xs text-[#6B5E52] leading-relaxed">
              {t('whyReason1Desc')}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[#E8DEC8] space-y-3 shadow-xs">
            <div className="w-12 h-12 rounded-lg bg-[#FAF4E6] text-[#8C6B28] flex items-center justify-center font-bold border border-[#E8DEC8]">
              02
            </div>
            <h3 className="text-base font-bold text-[#2D241E] font-display">
              {t('whyReason2Title')}
            </h3>
            <p className="text-xs text-[#6B5E52] leading-relaxed">
              {t('whyReason2Desc')}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[#E8DEC8] space-y-3 shadow-xs">
            <div className="w-12 h-12 rounded-lg bg-[#FAF4E6] text-[#8C6B28] flex items-center justify-center font-bold border border-[#E8DEC8]">
              03
            </div>
            <h3 className="text-base font-bold text-[#2D241E] font-display">
              {t('whyReason3Title')}
            </h3>
            <p className="text-xs text-[#6B5E52] leading-relaxed">
              {t('whyReason3Desc')}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[#E8DEC8] space-y-3 shadow-xs">
            <div className="w-12 h-12 rounded-lg bg-[#FAF4E6] text-[#8C6B28] flex items-center justify-center font-bold border border-[#E8DEC8]">
              04
            </div>
            <h3 className="text-base font-bold text-[#2D241E] font-display">
              {t('whyReason4Title')}
            </h3>
            <p className="text-xs text-[#6B5E52] leading-relaxed">
              {t('whyReason4Desc')}
            </p>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="bg-white text-[#2D241E] py-20 border-y border-[#E8DEC8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <div className="text-xs font-bold uppercase tracking-widest text-[#8C6B28]">
              {t('testimonialsTitle')}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#2D241E] text-balance">
              {t('testimonialsSubtitle')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test) => (
              <div
                key={test.id}
                className="bg-[#FAF7F2] p-6 rounded-xl border border-[#E8DEC8] flex flex-col justify-between space-y-4 shadow-xs"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-[#C9A45C]">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C9A45C]" />
                    ))}
                  </div>
                  <p className="text-xs text-[#6B5E52] leading-relaxed italic">
                    "{test.comment[language] || test.comment.fr}"
                  </p>
                </div>

                <div className="pt-4 border-t border-[#EAE3D6]">
                  <h4 className="text-sm font-bold text-[#2D241E]">{test.name}</h4>
                  <p className="text-[11px] text-[#8C6B28] font-semibold mt-0.5">
                    {test.course[language] || test.course.fr}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. LOCATION & ACCESS BANNER (Mostaganem, Algeria) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-gradient-to-br from-white to-[#FAF7F2] border border-[#E8DEC8] rounded-2xl p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-sm">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2 text-xs font-bold text-[#8C6B28] uppercase tracking-wider">
              <MapPin className="w-4 h-4 text-[#C9A45C]" />
              <span>Implantation au cœur de Mostaganem</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#2D241E] font-display">
              Venez visiter nos laboratoires pédagogiques
            </h3>
            <p className="text-xs text-[#6B5E52] leading-relaxed">
              Située à {settings.address}, notre école vous accueille du Samedi au Jeudi pour découvrir nos installations et vous inscrire directement.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3 bg-[#C9A45C] hover:bg-[#DFC283] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors shadow-xs"
            >
              Plan d’accès & Horaires
            </button>
            <a
              href={`https://wa.me/${settings.whatsapp.replace(/\+/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors flex items-center gap-2 shadow-xs"
            >
              <span>Discuter sur WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

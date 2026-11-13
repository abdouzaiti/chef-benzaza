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
    <div className="space-y-14 sm:space-y-20 lg:space-y-24 pb-14 sm:pb-20">
      
      {/* 1. HERO SECTION — Unified Full-Screen Page 1 with Integrated Top Navigation */}
      <section
        id="home-hero-section"
        className="relative min-h-[100svh] flex items-center bg-gradient-to-br from-[#021510] via-[#062B22] to-[#041E17] text-[#FAF6ED] overflow-hidden border-b border-[#D6AD4F]/50"
      >
        {/* Background composition: deep emerald left canvas + cinematic warm chef photo on right */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Chef photograph anchored to the right on desktop (flipped for RTL) */}
          <div className="absolute inset-y-0 right-0 rtl:right-auto rtl:left-0 w-full lg:w-[62%] overflow-hidden">
            <img
              src="/src/assets/images/hero_chef_kitchen_1794418831073.jpg"
              alt="Chef Exécutif dans la cuisine de l'école Benzaza à Mostaganem"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center opacity-55 sm:opacity-65 lg:opacity-80 brightness-[0.68] contrast-[1.08] saturate-[0.92] sepia-[0.14]"
            />
            {/* Warm golden cinematic atmosphere tint */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#062B22]/75 via-[#D6AD4F]/10 to-[#021510]/65 mix-blend-multiply" />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(circle at 68% 35%, rgba(229, 189, 91, 0.22) 0%, rgba(6, 43, 34, 0) 60%)',
              }}
            />
          </div>

          {/* Smooth directional scrim blending photo seamlessly into deep emerald-black green on the left */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#021510] via-[#062B22]/95 via-45% to-[#062B22]/25 rtl:bg-gradient-to-l" />
          {/* Mobile readability scrim + top header contrast & bottom cinematic shadow */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#021510]/95 via-[#062B22]/45 lg:via-transparent to-[#021510]/80" />
          {/* Subtle left ambient warm gold glow behind headline */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 55% 60% at 22% 45%, rgba(214, 173, 79, 0.11) 0%, transparent 70%)',
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-8 pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-24 z-10 w-full">
          <div className="max-w-2xl space-y-5 sm:space-y-6">
            
            {/* Quiet unboxed luxury kicker */}
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-[#E5BD5B]">
              <span className="hidden sm:inline-block w-6 h-[1px] bg-[#D6AD4F]/80" aria-hidden="true" />
              <span>{t('heroBadge')}</span>
              <span aria-hidden="true" className="text-[#D6AD4F]/70">·</span>
              <span>{language === 'ar' ? 'معتمد من طرف الدولة' : "AGRÉÉ PAR L'ÉTAT"}</span>
            </div>

            {/* Editorial serif headline with ivory white + metallic gold highlights */}
            <h1 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-semibold tracking-tight text-[#FAF6ED] leading-[1.14] font-display text-balance drop-shadow-[0_2px_18px_rgba(0,0,0,0.45)]">
              {language === 'ar' ? (
                <>
                  <span className="text-[#E5BD5B]">التميز</span> من خلال التكوين في{' '}
                  <span className="text-[#E5BD5B]">فنون الطهي</span> والتقنيات الحديثة.
                </>
              ) : (
                <>
                  <span className="text-[#E5BD5B]">L&apos;excellence</span> par la formation{' '}
                  <span className="text-[#E5BD5B]">culinaire &amp; technique</span>.
                </>
              )}
            </h1>

            {/* Subtitle in clean light ivory sans-serif */}
            <p className="text-sm sm:text-base lg:text-lg text-[#EAE2CF]/90 font-normal leading-relaxed max-w-xl">
              {t('heroSubtitle')}
            </p>

            {/* Luxury Dual CTAs */}
            <div className="pt-3 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
              <button
                onClick={() => onOpenRegistration()}
                className="w-full sm:w-auto px-6 sm:px-7 py-3.5 bg-gradient-to-r from-[#D6AD4F] via-[#E5BD5B] to-[#C89B3C] hover:from-[#E5BD5B] hover:via-[#F3D784] hover:to-[#D6AD4F] text-[#05261D] font-bold text-xs uppercase tracking-widest rounded-lg transition-all duration-200 hover:-translate-y-0.5 shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_10px_28px_rgba(229,189,91,0.3)] whitespace-nowrap text-center cursor-pointer"
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
                className="w-full sm:w-auto px-6 sm:px-7 py-3.5 bg-[#062B22]/60 hover:bg-[#0B4335]/85 backdrop-blur-xs text-[#FAF6ED] hover:text-[#E5BD5B] border border-[#D6AD4F]/70 hover:border-[#E5BD5B] font-bold text-xs uppercase tracking-widest rounded-lg transition-all duration-200 shadow-sm whitespace-nowrap text-center cursor-pointer"
              >
                {t('discoverCourses')}
              </button>
            </div>
          </div>
        </div>

        {/* Subtle curved gold decorative lines near bottom of hero section */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 overflow-hidden" aria-hidden="true">
          <svg
            viewBox="0 0 1440 56"
            fill="none"
            preserveAspectRatio="none"
            className="w-full h-8 sm:h-12"
          >
            <defs>
              <linearGradient id="heroGoldLinePrimary" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#D6AD4F" stopOpacity="0" />
                <stop offset="25%" stopColor="#D6AD4F" stopOpacity="0.55" />
                <stop offset="55%" stopColor="#E5BD5B" stopOpacity="0.85" />
                <stop offset="85%" stopColor="#D6AD4F" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#D6AD4F" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="heroGoldLineSecondary" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#E5BD5B" stopOpacity="0" />
                <stop offset="40%" stopColor="#E5BD5B" stopOpacity="0.32" />
                <stop offset="75%" stopColor="#D6AD4F" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#D6AD4F" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0 44 C340 12, 680 54, 1060 22 C1220 9, 1340 18, 1440 28"
              stroke="url(#heroGoldLinePrimary)"
              strokeWidth="1.2"
              fill="none"
            />
            <path
              d="M0 52 C420 26, 780 6, 1140 38 C1280 50, 1375 44, 1440 36"
              stroke="url(#heroGoldLineSecondary)"
              strokeWidth="0.9"
              fill="none"
            />
          </svg>
        </div>
      </section>

      {/* 2. FEATURED COURSES SECTION — Interactive Split Path & Scrollspy Directly on Main Landing Page */}
      <section id="home-formations-section" className="max-w-7xl mx-auto px-4 sm:px-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-[#8C6B28] mb-2">
              Diplômes & Certifications — Mostaganem
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#062B22] font-display text-balance">
              {t('featuredCoursesTitle')}
            </h2>
            <p className="text-sm text-[#5C6660] mt-1 max-w-xl">
              {t('featuredCoursesSubtitle')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-2 sm:gap-6 lg:gap-8 items-start">
          
          {/* LEFT SIDEBAR: Simple Rectangular Formation List (Visible on ALL Screen Sizes) */}
          <div className="col-span-4 sm:col-span-4 lg:col-span-4 sticky top-[76px] sm:top-24 self-start">
            <div className="bg-white border border-[#063B2E]/20 flex flex-col shadow-sm overflow-hidden rounded-lg">
              <div className="p-2.5 sm:p-4 bg-[#063B2E] border-b border-[#D6AD4F]/60">
                <h3 className="text-[11px] sm:text-sm font-bold text-[#E5BD5B] font-display uppercase tracking-wider">
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
                      className={`w-full text-left rtl:text-right p-2 sm:p-4 transition-colors flex flex-col cursor-pointer ${
                        isActive
                          ? 'bg-[#063B2E] border-l-2 sm:border-l-4 rtl:border-l-0 rtl:border-r-2 sm:rtl:border-r-4 border-l-[#D6AD4F] rtl:border-r-[#D6AD4F] text-[#FAF6ED]'
                          : 'bg-white hover:bg-[#F3F7F5] text-[#062B22]'
                      }`}
                    >
                      {/* BIG BOLD FORMATION TITLE */}
                      <span className={`text-[11px] sm:text-base font-bold font-display leading-tight line-clamp-2 break-words ${
                        isActive ? 'text-[#E5BD5B]' : 'text-[#062B22]'
                      }`}>
                        {course.title[language] || course.title.fr}
                      </span>

                      {/* FORMATEUR NAME DOWNSIDE THE FORMATION NAME */}
                      <span className={`text-[10px] sm:text-xs font-semibold mt-1 block truncate w-full ${
                        isActive ? 'text-[#EAE2CF]/90' : 'text-[#8C6B28]'
                      }`}>
                        {course.instructor.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Detailed Cards (Visible on ALL Screen Sizes) */}
          <div className="col-span-8 sm:col-span-8 lg:col-span-8 space-y-4 sm:space-y-8 min-w-0">
            {courses.map((course) => (
              <div
                key={`home-card-${course.id}`}
                id={`home-course-card-${course.id}`}
                data-home-course-id={course.id}
                className={`bg-white border rounded-xl transition-all overflow-hidden shadow-xs ${
                  activeCourseId === course.id ? 'border-[#063B2E] ring-1 ring-[#063B2E]/25 shadow-md' : 'border-[#E8DEC8]'
                }`}
              >
                <div className="relative w-full aspect-[9/10] overflow-hidden bg-[#FAF7F2] flex items-center justify-center">
                  <img
                    src={course.image}
                    alt={course.title[language] || course.title.fr}
                    referrerPolicy="no-referrer"
                    className="w-full h-auto max-h-full object-contain object-center"
                  />
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 rtl:right-auto rtl:left-2 sm:rtl:left-3 bg-[#062B22]/95 text-[#E5BD5B] text-[10px] sm:text-xs font-mono font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded border border-[#D6AD4F]/55 shadow-sm">
                    {course.priceDZD} {t('dzd')}
                  </div>
                </div>

                <div className="p-3 sm:p-6 space-y-2.5 sm:space-y-4">
                  <div>
                    <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-[#5C6660] mb-1">
                      <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#063B2E] shrink-0" />
                      <span className="truncate">{course.duration[language] || course.duration.fr}</span>
                    </div>
                    <h3 className="text-sm sm:text-xl font-bold text-[#062B22] font-display leading-snug">
                      {course.title[language] || course.title.fr}
                    </h3>
                    <div className="text-[11px] sm:text-xs font-semibold text-[#8C6B28] mt-1">
                      {course.instructor.name}
                    </div>
                    <p className="text-[11px] sm:text-xs text-[#5C6660] mt-1.5 sm:mt-2 leading-relaxed">
                      {course.shortDesc[language] || course.shortDesc.fr}
                    </p>
                  </div>

                  <div className="pt-3 sm:pt-4 border-t border-[#E8DEC8]/70 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-3">
                    <button
                      onClick={() => onNavigate('courses')}
                      className="text-[11px] sm:text-xs font-semibold text-[#063B2E] hover:text-[#8C6B28] transition-colors text-left rtl:text-right py-1 cursor-pointer"
                    >
                      {t('viewDetails')}
                    </button>

                    <button
                      onClick={() => onOpenRegistration(course.id)}
                      className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-[#063B2E] hover:bg-[#0A4F3E] text-[#FAF6ED] hover:text-[#E5BD5B] border border-[#D6AD4F]/55 text-[11px] sm:text-xs font-bold uppercase tracking-wider rounded transition-colors whitespace-nowrap shadow-xs text-center cursor-pointer"
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
      <section className="bg-white border-y border-[#E8DEC8] py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-[#8C6B28] mb-2">
                Ateliers Culinaires & Pâtisserie
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#062B22] font-display text-balance">
                {t('popularProductsTitle')}
              </h2>
              <p className="text-sm text-[#5C6660] mt-1 max-w-xl">
                {t('popularProductsSubtitle')}
              </p>
            </div>
            <button
              onClick={() => onNavigate('store')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#063B2E] hover:text-[#8C6B28] uppercase tracking-wider transition-colors shrink-0 cursor-pointer"
            >
              <span>{t('filterAll')}</span>
              <ChevronRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {popularProducts.map((product) => (
              <div
                key={product.id}
                className="bg-[#FAF7F2] rounded-xl border border-[#E8DEC8] hover:border-[#063B2E]/40 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col group"
              >
                <div className="relative h-52 sm:h-60 overflow-hidden bg-neutral-100">
                  <img
                    src={product.image}
                    alt={product.name[language] || product.name.fr}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 bg-[#062B22]/90 text-[#FAF6ED] text-[11px] font-semibold px-2.5 py-0.5 rounded shadow-xs border border-[#D6AD4F]/50">
                    {product.stock > 0 ? (
                      <span className="text-[#E5BD5B]">En stock ({product.stock})</span>
                    ) : (
                      <span className="text-red-300">Épuisé</span>
                    )}
                  </div>
                </div>

                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-[#062B22] font-display">
                      {product.name[language] || product.name.fr}
                    </h3>
                    <p className="text-xs text-[#5C6660] line-clamp-2 mt-2 leading-relaxed">
                      {product.description[language] || product.description.fr}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E8DEC8] flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] uppercase text-[#7A6E63] block">Prix atelier</span>
                      <span className="text-base font-bold font-mono text-[#063B2E] tabular-nums">
                        {product.priceDZD} {t('dzd')}
                      </span>
                    </div>

                    <button
                      onClick={() => addToCart(product, 1)}
                      disabled={product.stock <= 0}
                      className="px-4 py-2 bg-[#063B2E] hover:bg-[#0A4F3E] text-[#FAF6ED] hover:text-[#E5BD5B] border border-[#D6AD4F]/50 text-xs font-bold uppercase tracking-wider rounded transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-[#E5BD5B]" />
                      <span>{t('addToCart')}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ATELIER COIFFURE FEMME TEASER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-gradient-to-br from-[#FAF7F2] to-[#F5EEDB] text-[#062B22] rounded-2xl border border-[#D6AD4F]/55 overflow-hidden grid grid-cols-1 lg:grid-cols-2 items-center shadow-sm">
          <div className="p-6 sm:p-10 lg:p-16 space-y-5 sm:space-y-6">
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#063B2E]">
              <Scissors className="w-4 h-4 text-[#C9A45C]" />
              <span>Studio d'application & Coiffure Femme</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display leading-tight text-[#062B22] text-balance">
              {language === 'ar' ? 'ورشة الحلاقة والتجميل النسائي' : 'Atelier Coiffure Femme'}
            </h2>

            <p className="text-sm text-[#5C6660] leading-relaxed">
              {language === 'ar'
                ? 'اكتشفوا فضاءنا المخصص لجمال المرأة. تقدم لكم مدرباتنا ومتربصاتنا خدمات احترافية: تصفيف الشعر، قصات عصرية، صبغة، بالياج، خصلات، عناية بالشعر وتسريحات أنيقة في إطار راقٍ بمستغانم.'
                : 'Découvrez notre espace dédié à la beauté féminine. Nos formatrices et étudiantes vous proposent des prestations professionnelles : brushing, coupes tendance, coloration, balayage, mèches, soins capillaires et coiffures élégantes, dans un cadre chic et raffiné à Mostaganem.'}
            </p>

            <div className="pt-2 flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4">
              <button
                onClick={() => onOpenBooking()}
                className="w-full sm:w-auto px-6 py-3 bg-[#063B2E] hover:bg-[#0A4F3E] text-[#FAF6ED] hover:text-[#E5BD5B] border border-[#D6AD4F]/60 font-bold text-xs uppercase tracking-wider rounded transition-colors shadow-xs text-center cursor-pointer"
              >
                {t('bookAppointment')}
              </button>
              <button
                onClick={() => onNavigate('salon')}
                className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-[#F3F7F5] text-[#063B2E] text-xs font-bold uppercase tracking-wider rounded border border-[#063B2E]/35 transition-colors shadow-xs text-center cursor-pointer"
              >
                {language === 'ar' ? 'اكتشف خدماتنا' : 'Découvrir nos prestations'}
              </button>
            </div>
          </div>

          <div className="h-64 sm:h-80 lg:h-full relative overflow-hidden bg-neutral-100">
            <img
              src="/src/assets/images/women_hair_salon_1794580429739.jpg"
              alt="Atelier Coiffure Femme de l'école Benzaza"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE OUR SCHOOL — Deep Emerald & Gold Showcase Band */}
      <section className="relative bg-gradient-to-br from-[#021510] via-[#062B22] to-[#063B2E] text-[#FAF6ED] py-14 sm:py-20 border-y border-[#D6AD4F]/50 overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(214, 173, 79, 0.12) 0%, transparent 70%)',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16 space-y-3">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#E5BD5B]">
              L'Engagement Benzaza
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#FAF6ED] font-display text-balance">
              {t('whyChooseTitle')}
            </h2>
            <p className="text-sm text-[#EAE2CF]/85">
              {t('whyChooseSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8">
            <div className="bg-[#042119]/90 p-6 rounded-xl border border-[#D6AD4F]/30 hover:border-[#D6AD4F]/70 space-y-3 shadow-lg transition-colors">
              <div className="w-12 h-12 rounded-lg bg-[#063B2E] text-[#E5BD5B] flex items-center justify-center font-bold border border-[#D6AD4F]/55 font-mono">
                01
              </div>
              <h3 className="text-base font-bold text-[#FAF6ED] font-display">
                {t('whyReason1Title')}
              </h3>
              <p className="text-xs text-[#EAE2CF]/80 leading-relaxed">
                {t('whyReason1Desc')}
              </p>
            </div>

            <div className="bg-[#042119]/90 p-6 rounded-xl border border-[#D6AD4F]/30 hover:border-[#D6AD4F]/70 space-y-3 shadow-lg transition-colors">
              <div className="w-12 h-12 rounded-lg bg-[#063B2E] text-[#E5BD5B] flex items-center justify-center font-bold border border-[#D6AD4F]/55 font-mono">
                02
              </div>
              <h3 className="text-base font-bold text-[#FAF6ED] font-display">
                {t('whyReason2Title')}
              </h3>
              <p className="text-xs text-[#EAE2CF]/80 leading-relaxed">
                {t('whyReason2Desc')}
              </p>
            </div>

            <div className="bg-[#042119]/90 p-6 rounded-xl border border-[#D6AD4F]/30 hover:border-[#D6AD4F]/70 space-y-3 shadow-lg transition-colors">
              <div className="w-12 h-12 rounded-lg bg-[#063B2E] text-[#E5BD5B] flex items-center justify-center font-bold border border-[#D6AD4F]/55 font-mono">
                03
              </div>
              <h3 className="text-base font-bold text-[#FAF6ED] font-display">
                {t('whyReason3Title')}
              </h3>
              <p className="text-xs text-[#EAE2CF]/80 leading-relaxed">
                {t('whyReason3Desc')}
              </p>
            </div>

            <div className="bg-[#042119]/90 p-6 rounded-xl border border-[#D6AD4F]/30 hover:border-[#D6AD4F]/70 space-y-3 shadow-lg transition-colors">
              <div className="w-12 h-12 rounded-lg bg-[#063B2E] text-[#E5BD5B] flex items-center justify-center font-bold border border-[#D6AD4F]/55 font-mono">
                04
              </div>
              <h3 className="text-base font-bold text-[#FAF6ED] font-display">
                {t('whyReason4Title')}
              </h3>
              <p className="text-xs text-[#EAE2CF]/80 leading-relaxed">
                {t('whyReason4Desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="bg-white text-[#062B22] py-12 sm:py-20 border-b border-[#E8DEC8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-3">
            <div className="text-xs font-bold uppercase tracking-widest text-[#063B2E]">
              {t('testimonialsTitle')}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#062B22] text-balance">
              {t('testimonialsSubtitle')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((test) => (
              <div
                key={test.id}
                className="bg-[#FAF7F2] p-5 sm:p-6 rounded-xl border border-[#E8DEC8] hover:border-[#063B2E]/35 flex flex-col justify-between space-y-4 shadow-xs transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-[#D6AD4F]">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#D6AD4F]" />
                    ))}
                  </div>
                  <p className="text-xs text-[#5C6660] leading-relaxed italic">
                    "{test.comment[language] || test.comment.fr}"
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E8DEC8]">
                  <h4 className="text-sm font-bold text-[#062B22]">{test.name}</h4>
                  <p className="text-[11px] text-[#063B2E] font-semibold mt-0.5">
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
        <div className="bg-gradient-to-br from-[#063B2E] via-[#062B22] to-[#021510] text-[#FAF6ED] border border-[#D6AD4F]/55 rounded-2xl p-6 sm:p-10 lg:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 sm:gap-8 shadow-lg">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2 text-xs font-bold text-[#E5BD5B] uppercase tracking-wider">
              <MapPin className="w-4 h-4 text-[#E5BD5B] shrink-0" />
              <span>Implantation au cœur de Mostaganem</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#FAF6ED] font-display">
              Venez visiter nos laboratoires pédagogiques
            </h3>
            <p className="text-xs text-[#EAE2CF]/85 leading-relaxed">
              Située à {settings.address}, notre école vous accueille du Samedi au Jeudi pour découvrir nos installations et vous inscrire directement.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 w-full lg:w-auto shrink-0">
            <button
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#D6AD4F] via-[#E5BD5B] to-[#C89B3C] hover:from-[#E5BD5B] hover:via-[#F3D784] hover:to-[#D6AD4F] text-[#05261D] text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-md text-center cursor-pointer"
            >
              Plan d’accès & Horaires
            </button>
            <a
              href={`https://wa.me/${settings.whatsapp.replace(/\+/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-6 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <span>Discuter sur WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

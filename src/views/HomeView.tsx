import React from 'react';
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

  const featuredCourses = courses.slice(0, 3);
  const popularProducts = products.filter((p) => p.isPopular).slice(0, 3);

  return (
    <div className="space-y-24 pb-20">
      
      {/* 1. HERO SECTION — Luxury & Spatial Balance */}
      <section className="relative min-h-[580px] lg:min-h-[640px] flex items-center bg-[#141414] text-white overflow-hidden">
        {/* Background photo with measured scrim for 4.5:1 WCAG contrast */}
        <div className="absolute inset-0">
          <img
            src="/src/assets/images/hero_chef_kitchen_1794418831073.jpg"
            alt="Chef Exécutif dans la cuisine de l'école Benzaza à Oran"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-65"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#121212]/95 via-[#141414]/80 to-[#141414]/40 rtl:bg-gradient-to-l" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-black/30" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-8 py-20 lg:py-28 z-10 w-full">
          <div className="max-w-2xl space-y-6">
            
            {/* Quiet unboxed kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#C9A45C]">
              <span>{t('heroBadge')}</span>
              <span aria-hidden="true">·</span>
              <span>Fondée par Chef Benzaza</span>
            </div>

            {/* Headline with text-wrap: balance */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.15] font-display text-balance">
              {t('heroTitle')}
            </h1>

            {/* Slogan & Subtitle */}
            <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
              {t('heroSubtitle')}
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onOpenRegistration()}
                className="px-6 py-3.5 bg-[#C9A45C] hover:bg-[#DFC283] text-[#171717] font-bold text-xs uppercase tracking-wider rounded-md transition-all shadow-lg shadow-[#C9A45C]/25 whitespace-nowrap"
              >
                {t('registerNow')}
              </button>

              <button
                onClick={() => onNavigate('courses')}
                className="px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white border border-white/20 font-semibold text-xs uppercase tracking-wider rounded-md transition-all backdrop-blur-xs whitespace-nowrap"
              >
                {t('discoverCourses')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Full-width KPI strip below hero */}
      <section className="-mt-16 relative z-20 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 sm:p-8 bg-[#1B1B1B] border border-[#2e2e2e] rounded-xl shadow-xl">
          <div className="text-center sm:text-left rtl:sm:text-right p-3">
            <span className="block text-2xl sm:text-3xl font-bold font-mono text-[#C9A45C] tabular-nums">
              {t('heroStat1Number')}
            </span>
            <span className="text-xs text-neutral-400 font-medium mt-1 block">
              {t('heroStat1Label')}
            </span>
          </div>

          <div className="text-center sm:text-left rtl:sm:text-right p-3 border-l rtl:border-l-0 rtl:border-r border-[#2e2e2e]">
            <span className="block text-2xl sm:text-3xl font-bold font-mono text-[#C9A45C] tabular-nums">
              {t('heroStat2Number')}
            </span>
            <span className="text-xs text-neutral-400 font-medium mt-1 block">
              {t('heroStat2Label')}
            </span>
          </div>

          <div className="text-center sm:text-left rtl:sm:text-right p-3 border-t sm:border-t-0 sm:border-l rtl:sm:border-l-0 rtl:sm:border-r border-[#2e2e2e]">
            <span className="block text-2xl sm:text-3xl font-bold font-mono text-[#C9A45C] tabular-nums">
              {t('heroStat3Number')}
            </span>
            <span className="text-xs text-neutral-400 font-medium mt-1 block">
              {t('heroStat3Label')}
            </span>
          </div>

          <div className="text-center sm:text-left rtl:sm:text-right p-3 border-t sm:border-t-0 sm:border-l rtl:sm:border-l-0 rtl:sm:border-r border-[#2e2e2e]">
            <span className="block text-2xl sm:text-3xl font-bold font-mono text-[#C9A45C] tabular-nums">
              {t('heroStat4Number')}
            </span>
            <span className="text-xs text-neutral-400 font-medium mt-1 block">
              {t('heroStat4Label')}
            </span>
          </div>
        </div>
      </section>

      {/* 2. FEATURED COURSES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-[#C9A45C] mb-2">
              Diplômes & Certifications
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#171717] font-display text-balance">
              {t('featuredCoursesTitle')}
            </h2>
            <p className="text-sm text-neutral-600 mt-1 max-w-xl">
              {t('featuredCoursesSubtitle')}
            </p>
          </div>
          <button
            onClick={() => onNavigate('courses')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C9A45C] hover:text-[#8C6B28] uppercase tracking-wider transition-colors shrink-0"
          >
            <span>{t('allCourses')}</span>
            <ChevronRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl border border-[#E6DFD3] shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col group"
            >
              {/* Image with zoom effect */}
              <div className="relative h-56 overflow-hidden bg-neutral-200">
                <img
                  src={course.image}
                  alt={course.title[language] || course.title.fr}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3 bg-[#171717]/90 text-[#C9A45C] text-xs font-mono font-bold px-2.5 py-1 rounded backdrop-blur-xs">
                  {course.priceDZD} {t('dzd')}
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-neutral-500 mb-2">
                    <Clock className="w-3.5 h-3.5 text-[#C9A45C]" />
                    <span>{course.duration[language] || course.duration.fr}</span>
                  </div>
                  <h3 className="text-base font-bold text-[#171717] font-display group-hover:text-[#8C6B28] transition-colors">
                    {course.title[language] || course.title.fr}
                  </h3>
                  <p className="text-xs text-neutral-600 line-clamp-2 mt-2 leading-relaxed">
                    {course.shortDesc[language] || course.shortDesc.fr}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F1ECE1] flex items-center justify-between gap-3">
                  <button
                    onClick={() => onNavigate('courses')}
                    className="text-xs font-semibold text-neutral-700 hover:text-black transition-colors"
                  >
                    {t('viewDetails')}
                  </button>

                  <button
                    onClick={() => onOpenRegistration(course.id)}
                    className="px-3.5 py-2 bg-[#171717] hover:bg-[#C9A45C] hover:text-[#171717] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors whitespace-nowrap"
                  >
                    {t('registerShort')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. POPULAR BOUTIQUE CREATIONS */}
      <section className="bg-[#FAF7F2] border-y border-[#EAE3D6] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-[#C9A45C] mb-2">
                Ateliers Culinaires & Pâtisserie
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#171717] font-display text-balance">
                {t('popularProductsTitle')}
              </h2>
              <p className="text-sm text-neutral-600 mt-1 max-w-xl">
                {t('popularProductsSubtitle')}
              </p>
            </div>
            <button
              onClick={() => onNavigate('store')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C9A45C] hover:text-[#8C6B28] uppercase tracking-wider transition-colors shrink-0"
            >
              <span>{t('filterAll')}</span>
              <ChevronRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {popularProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl border border-[#E6DFD3] shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col group"
              >
                <div className="relative h-60 overflow-hidden bg-neutral-100">
                  <img
                    src={product.image}
                    alt={product.name[language] || product.name.fr}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 bg-white/90 text-neutral-800 text-[11px] font-semibold px-2 py-0.5 rounded shadow-sm">
                    {product.stock > 0 ? (
                      <span className="text-emerald-700">En stock ({product.stock})</span>
                    ) : (
                      <span className="text-red-700">Épuisé</span>
                    )}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-[#171717] font-display">
                      {product.name[language] || product.name.fr}
                    </h3>
                    <p className="text-xs text-neutral-600 line-clamp-2 mt-2 leading-relaxed">
                      {product.description[language] || product.description.fr}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#F1ECE1] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase text-neutral-400 block">Prix atelier</span>
                      <span className="text-base font-bold font-mono text-[#171717] tabular-nums">
                        {product.priceDZD} {t('dzd')}
                      </span>
                    </div>

                    <button
                      onClick={() => addToCart(product, 1)}
                      disabled={product.stock <= 0}
                      className="px-4 py-2 bg-[#C9A45C] hover:bg-[#DFC283] text-[#171717] text-xs font-bold uppercase tracking-wider rounded transition-colors flex items-center gap-1.5 shadow-sm"
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
        <div className="bg-[#171717] text-white rounded-2xl border border-[#2d2a24] overflow-hidden grid grid-cols-1 lg:grid-cols-2 items-center">
          <div className="p-8 sm:p-12 lg:p-16 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#C9A45C]">
              <Scissors className="w-4 h-4" />
              <span>Studio d'application & Coiffure</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display leading-tight text-white text-balance">
              {t('salonTitle')}
            </h2>

            <p className="text-sm text-neutral-300 leading-relaxed">
              {t('salonSubtitle')}. Bénéficiez de prestations haut de gamme (dégradé américain, rasage traditionnel, brushing glamour, soins kératine) dans notre salon chic à Oran.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => onOpenBooking()}
                className="px-6 py-3 bg-[#C9A45C] hover:bg-[#DFC283] text-[#171717] font-bold text-xs uppercase tracking-wider rounded transition-colors"
              >
                {t('bookAppointment')}
              </button>
              <button
                onClick={() => onNavigate('salon')}
                className="px-6 py-3 bg-[#262626] hover:bg-[#333] text-white text-xs font-semibold uppercase tracking-wider rounded border border-[#3a3a3a] transition-colors"
              >
                Découvrir la carte des soins
              </button>
            </div>
          </div>

          <div className="h-72 lg:h-full relative overflow-hidden bg-neutral-900">
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
          <div className="text-xs font-semibold uppercase tracking-widest text-[#C9A45C]">
            L'Engagement Benzaza
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#171717] font-display text-balance">
            {t('whyChooseTitle')}
          </h2>
          <p className="text-sm text-neutral-600">
            {t('whyChooseSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-xl border border-[#E6DFD3] space-y-3">
            <div className="w-12 h-12 rounded-lg bg-[#C9A45C]/15 text-[#8C6B28] flex items-center justify-center font-bold">
              01
            </div>
            <h3 className="text-base font-bold text-[#171717] font-display">
              {t('whyReason1Title')}
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              {t('whyReason1Desc')}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[#E6DFD3] space-y-3">
            <div className="w-12 h-12 rounded-lg bg-[#C9A45C]/15 text-[#8C6B28] flex items-center justify-center font-bold">
              02
            </div>
            <h3 className="text-base font-bold text-[#171717] font-display">
              {t('whyReason2Title')}
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              {t('whyReason2Desc')}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[#E6DFD3] space-y-3">
            <div className="w-12 h-12 rounded-lg bg-[#C9A45C]/15 text-[#8C6B28] flex items-center justify-center font-bold">
              03
            </div>
            <h3 className="text-base font-bold text-[#171717] font-display">
              {t('whyReason3Title')}
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              {t('whyReason3Desc')}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[#E6DFD3] space-y-3">
            <div className="w-12 h-12 rounded-lg bg-[#C9A45C]/15 text-[#8C6B28] flex items-center justify-center font-bold">
              04
            </div>
            <h3 className="text-base font-bold text-[#171717] font-display">
              {t('whyReason4Title')}
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              {t('whyReason4Desc')}
            </p>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="bg-[#171717] text-white py-20 border-y border-[#2d2a24]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-widest text-[#C9A45C]">
              {t('testimonialsTitle')}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white text-balance">
              {t('testimonialsSubtitle')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test) => (
              <div
                key={test.id}
                className="bg-[#202020] p-6 rounded-xl border border-[#333] flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-[#C9A45C]">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C9A45C]" />
                    ))}
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed italic">
                    "{test.comment[language] || test.comment.fr}"
                  </p>
                </div>

                <div className="pt-4 border-t border-[#333]">
                  <h4 className="text-sm font-bold text-white">{test.name}</h4>
                  <p className="text-[11px] text-[#C9A45C] mt-0.5">
                    {test.course[language] || test.course.fr}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. LOCATION & ACCESS BANNER (Oran, Algeria) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-[#FAF7F2] border border-[#E6DFD3] rounded-2xl p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#8C6B28] uppercase tracking-wider">
              <MapPin className="w-4 h-4 text-[#C9A45C]" />
              <span>Implantation au cœur d’Oran</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#171717] font-display">
              Venez visiter nos laboratoires pédagogiques
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Située à {settings.address}, notre école vous accueille du Samedi au Jeudi pour découvrir nos installations et vous inscrire directement.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3 bg-[#171717] hover:bg-[#C9A45C] hover:text-[#171717] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors"
            >
              Plan d’accès & Horaires
            </button>
            <a
              href={`https://wa.me/${settings.whatsapp.replace(/\+/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors flex items-center gap-2"
            >
              <span>Discuter sur WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight } from 'lucide-react';
import { Language } from '../types';

interface IntroSplashProps {
  onComplete: () => void;
  onStartFlight?: () => void;
}

export const IntroSplash: React.FC<IntroSplashProps> = ({ onComplete, onStartFlight }) => {
  const { language, setLanguage, isRtl } = useApp();
  const [phase, setPhase] = useState<'enter' | 'ready' | 'flying' | 'done'>('enter');
  const splashLogoRef = useRef<HTMLImageElement>(null);
  const [flyStyle, setFlyStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase('ready');
    }, 260);

    return () => clearTimeout(timer);
  }, []);

  const handleEnterSite = () => {
    if (phase === 'flying' || phase === 'done') return;

    onStartFlight?.();

    const targetEl = document.getElementById('header-brand-logo-img');
    const sourceEl = splashLogoRef.current;

    if (targetEl && sourceEl) {
      const targetRect = targetEl.getBoundingClientRect();
      const sourceRect = sourceEl.getBoundingClientRect();

      const deltaX = targetRect.left - sourceRect.left;
      const deltaY = targetRect.top - sourceRect.top;
      const scale = targetRect.height / sourceRect.height;

      setFlyStyle({
        transform: `translate3d(${deltaX}px, ${deltaY}px, 0) scale(${scale})`,
        transformOrigin: 'top left',
      });
    }

    setPhase('flying');

    setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 850);
  };

  if (phase === 'done') return null;

  const isFlying = phase === 'flying';

  return (
    <div
      className={`fixed inset-0 z-50 h-[100dvh] w-full flex items-center justify-center p-2.5 sm:p-6 lg:p-8 select-none overflow-hidden transition-colors duration-500 ease-out ${
        isFlying ? 'pointer-events-none' : ''
      }`}
      style={{
        backgroundColor: isFlying ? 'rgba(0, 59, 40, 0)' : '#003B28',
      }}
      aria-label="Page d'accueil Chef Benzaza"
    >
      {/* 1. Deep Emerald & Dark Forest Ambient Backdrop */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
          isFlying ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {/* Base vertical & radial deep emerald-to-forest gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 68% 58% at 50% 44%, #02573B 0%, #003B28 48%, #00291D 84%, #001B12 100%)',
          }}
        />

        {/* Soft misty depth shadows in corners */}
        <div
          className="absolute inset-0 opacity-75"
          style={{
            background:
              'radial-gradient(circle at 15% 18%, rgba(0, 20, 13, 0.55) 0%, transparent 45%), radial-gradient(circle at 86% 84%, rgba(0, 18, 12, 0.65) 0%, transparent 48%), radial-gradient(circle at 50% 38%, rgba(245, 212, 119, 0.07) 0%, transparent 55%)',
          }}
        />

        {/* Very subtle fine velvet texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.045] mix-blend-overlay"
          style={{
            backgroundImage:
              'radial-gradient(rgba(248, 244, 233, 0.9) 0.65px, transparent 0.65px)',
            backgroundSize: '18px 18px',
          }}
        />
      </div>

      {/* 2. Sweeping Champagne Gold Corner Ribbons (Top-Left & Bottom-Right) */}
      <div
        className={`absolute inset-0 z-20 pointer-events-none overflow-hidden transition-opacity duration-500 ${
          isFlying ? 'opacity-0' : 'opacity-100'
        }`}
        aria-hidden="true"
      >
        {/* Top-Left Diagonal Gold Ribbons */}
        <svg
          viewBox="0 0 420 260"
          fill="none"
          className="absolute -top-2 -left-2 w-44 sm:w-64 md:w-80 lg:w-[360px] h-auto"
        >
          <defs>
            <linearGradient id="ribbonTopGoldA" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#9C7525" />
              <stop offset="45%" stopColor="#F5D477" />
              <stop offset="100%" stopColor="#D6AD4F" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="ribbonTopGoldB" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D6AD4F" />
              <stop offset="55%" stopColor="#F5D477" />
              <stop offset="100%" stopColor="#9C7525" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M-20 185 C35 105, 130 35, 290 -10 L325 -10 C155 48, 52 122, -20 225 Z"
            fill="url(#ribbonTopGoldA)"
            opacity="0.92"
          />
          <path
            d="M-15 110 C42 62, 118 22, 210 -8 L235 -8 C135 28, 55 72, -15 134 Z"
            fill="url(#ribbonTopGoldB)"
            opacity="0.88"
          />
        </svg>

        {/* Bottom-Right Diagonal Gold Ribbons */}
        <svg
          viewBox="0 0 420 260"
          fill="none"
          className="absolute -bottom-2 -right-2 w-44 sm:w-64 md:w-80 lg:w-[360px] h-auto"
        >
          <defs>
            <linearGradient id="ribbonBotGoldA" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#9C7525" />
              <stop offset="45%" stopColor="#F5D477" />
              <stop offset="100%" stopColor="#D6AD4F" stopOpacity="0.25" />
            </linearGradient>
            <linearGradient id="ribbonBotGoldB" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#D6AD4F" />
              <stop offset="55%" stopColor="#F5D477" />
              <stop offset="100%" stopColor="#9C7525" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M440 75 C385 155, 290 225, 130 270 L95 270 C265 212, 368 138, 440 35 Z"
            fill="url(#ribbonBotGoldA)"
            opacity="0.92"
          />
          <path
            d="M435 150 C378 198, 302 238, 210 268 L185 268 C285 232, 365 188, 435 126 Z"
            fill="url(#ribbonBotGoldB)"
            opacity="0.88"
          />
        </svg>
      </div>

      {/* 3. Thin Rounded Gold Frame */}
      <div
        className={`relative z-10 w-full max-w-[1380px] h-full rounded-[22px] sm:rounded-[30px] border flex flex-col items-center justify-center px-4 py-14 sm:px-10 sm:py-16 overflow-hidden transition-all duration-500 ${
          isFlying ? 'border-transparent shadow-none' : 'border-[#D6AD4F]/75 shadow-[inset_0_0_50px_rgba(0,22,15,0.65)]'
        }`}
      >
        {/* Subtle Culinary Illustrations inside Frame */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
            isFlying ? 'opacity-0' : 'opacity-100'
          }`}
          aria-hidden="true"
        >
          {/* Left Illustration: Hand-drawn Style Emerald Chef Hat (Toque) */}
          <div className="animate-benzaza-float absolute left-2 sm:left-6 md:left-10 lg:left-14 top-14 sm:top-[15%] w-24 sm:w-44 md:w-56 lg:w-64 opacity-25 sm:opacity-45 md:opacity-55">
            <svg viewBox="0 0 260 240" fill="none" className="w-full h-auto -rotate-12">
              <path
                d="M68 158 C38 148, 24 114, 42 84 C54 64, 78 60, 92 66 C98 38, 134 24, 166 36 C192 46, 202 70, 198 84 C222 86, 236 112, 224 138 C214 156, 194 162, 182 162 Z"
                fill="#024D34"
                fillOpacity="0.45"
                stroke="#147D59"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              {/* Toque Pleats */}
              <path
                d="M94 68 C88 94, 90 128, 96 156 M126 38 C124 74, 126 116, 128 156 M162 42 C164 78, 162 118, 158 156 M195 86 C192 112, 184 136, 176 158"
                stroke="#168962"
                strokeWidth="1.35"
                strokeLinecap="round"
                opacity="0.7"
              />
              {/* Chef Hat Band */}
              <path
                d="M68 158 L182 162 L176 208 C142 216, 102 214, 72 204 Z"
                fill="#02452F"
                fillOpacity="0.55"
                stroke="#147D59"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <path
                d="M71 194 C106 203, 144 204, 177 196"
                stroke="#189369"
                strokeWidth="1.2"
                opacity="0.65"
              />
            </svg>
          </div>

          {/* Right Illustration: Crossed Whisk & Slotted Spatula */}
          <div className="animate-benzaza-float-delayed absolute right-2 sm:right-6 md:right-10 lg:right-14 top-16 sm:top-[15%] w-24 sm:w-44 md:w-56 lg:w-64 opacity-25 sm:opacity-45 md:opacity-55">
            <svg viewBox="0 0 260 250" fill="none" className="w-full h-auto rotate-6">
              {/* Slotted Spatula (angled down-left) */}
              <g transform="rotate(34 130 125)">
                <rect
                  x="112"
                  y="14"
                  width="36"
                  height="78"
                  rx="6"
                  fill="#024D34"
                  fillOpacity="0.5"
                  stroke="#147D59"
                  strokeWidth="1.8"
                />
                <line x1="121" y1="26" x2="121" y2="78" stroke="#00291D" strokeWidth="3.5" strokeLinecap="round" />
                <line x1="130" y1="24" x2="130" y2="80" stroke="#00291D" strokeWidth="3.5" strokeLinecap="round" />
                <line x1="139" y1="26" x2="139" y2="78" stroke="#00291D" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M126 92 L134 92 L133 136 L127 136 Z" fill="#024D34" fillOpacity="0.5" stroke="#147D59" strokeWidth="1.6" />
                <rect
                  x="123"
                  y="136"
                  width="14"
                  height="90"
                  rx="7"
                  fill="#02452F"
                  fillOpacity="0.55"
                  stroke="#147D59"
                  strokeWidth="1.8"
                />
                <circle cx="130" cy="214" r="3" stroke="#147D59" strokeWidth="1.4" />
              </g>

              {/* Wire Whisk (angled down-right) */}
              <g transform="rotate(-34 130 125)">
                <path
                  d="M130 128 C100 100, 96 42, 130 14 C164 42, 160 100, 130 128 Z"
                  stroke="#147D59"
                  strokeWidth="1.7"
                />
                <path
                  d="M130 128 C108 98, 106 46, 130 16 C154 46, 152 98, 130 128 Z"
                  stroke="#168962"
                  strokeWidth="1.4"
                />
                <path
                  d="M130 128 C118 96, 118 48, 130 18 C142 48, 142 96, 130 128 Z"
                  stroke="#189369"
                  strokeWidth="1.25"
                />
                <line x1="130" y1="18" x2="130" y2="128" stroke="#147D59" strokeWidth="1.2" />
                <rect
                  x="123"
                  y="128"
                  width="14"
                  height="94"
                  rx="7"
                  fill="#02452F"
                  fillOpacity="0.6"
                  stroke="#147D59"
                  strokeWidth="1.8"
                />
                <circle cx="130" cy="210" r="3" stroke="#147D59" strokeWidth="1.4" />
              </g>
            </svg>
          </div>

          {/* Bottom-Left Subtle Basil Leaves & Spice Corner Decoration */}
          <svg
            viewBox="0 0 280 180"
            fill="none"
            className="absolute bottom-0 left-0 w-40 sm:w-60 lg:w-72 h-auto opacity-55 sm:opacity-70"
          >
            <defs>
              <radialGradient id="leafGlow" cx="35%" cy="70%" r="65%">
                <stop offset="0%" stopColor="#1D6B42" stopOpacity="0.65" />
                <stop offset="100%" stopColor="#00291D" stopOpacity="0" />
              </radialGradient>
            </defs>
            <ellipse cx="75" cy="145" rx="95" ry="50" fill="url(#leafGlow)" />
            {/* Basil Leaves Cluster */}
            <path d="M24 166 C12 128, 34 88, 72 86 C76 116, 56 154, 24 166 Z" fill="#134E2E" stroke="#22794A" strokeWidth="1.2" opacity="0.85" />
            <path d="M24 166 C42 130, 58 106, 68 90" stroke="#2D8D58" strokeWidth="0.9" opacity="0.7" />
            <path d="M46 168 C48 134, 76 108, 114 114 C106 144, 80 166, 46 168 Z" fill="#185D37" stroke="#278250" strokeWidth="1.2" opacity="0.85" />
            <path d="M46 168 C70 144, 90 128, 108 117" stroke="#31965F" strokeWidth="0.9" opacity="0.7" />
            <path d="M10 142 C-4 118, 10 88, 42 78 C46 104, 34 132, 10 142 Z" fill="#0F4226" stroke="#1E6C42" strokeWidth="1.1" opacity="0.8" />
            {/* Scattered Peppercorns */}
            <circle cx="128" cy="158" r="4.2" fill="#0B3B24" stroke="#2A7A4E" strokeWidth="0.9" />
            <circle cx="146" cy="166" r="3" fill="#0E442A" stroke="#2A7A4E" strokeWidth="0.8" />
            <circle cx="164" cy="154" r="3.6" fill="#0B3B24" stroke="#2A7A4E" strokeWidth="0.9" />
            <circle cx="182" cy="168" r="2.4" fill="#124E31" />
          </svg>

          {/* Bottom-Right Spice Bowl & Peppercorns Image */}
          <img
            src="/pepper.png"
            alt="Bol d'épices et grains de poivre"
            referrerPolicy="no-referrer"
            className="absolute bottom-2 right-2 sm:bottom-4 sm:right-6 w-36 sm:w-52 lg:w-64 h-auto object-contain opacity-80 sm:opacity-90 pointer-events-none select-none"
          />
        </div>

        {/* 4. Top-Right Corner Language Selector (FR / AR) */}
        <div
          className={`absolute top-4 right-4 sm:top-6 sm:right-7 z-20 transition-all duration-300 ${
            isFlying ? 'opacity-0 -translate-y-2 pointer-events-none' : 'opacity-100'
          }`}
        >
          <div
            className="inline-flex items-center p-0.5 rounded-lg bg-[#00291D]/90 border border-[#D6AD4F]/75 shadow-[0_4px_16px_rgba(0,0,0,0.35)]"
            role="group"
            aria-label="Sélecteur de langue"
          >
            {(['fr', 'ar'] as Language[]).map((lang) => {
              const active = language === lang;
              return (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setLanguage(lang)}
                  className={`px-3 py-1.5 text-xs font-bold tracking-wider rounded-md transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5D477] ${
                    active
                      ? 'bg-gradient-to-br from-[#F5D477] via-[#D6AD4F] to-[#B8892D] text-[#00291D] shadow-xs'
                      : 'bg-[#00291D] text-[#F8F4E9] hover:text-[#F5D477]'
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              );
            })}
          </div>
        </div>

        {/* 5. Symmetrical Centered Branding & Main CTA */}
        <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center">
          <h1 className="sr-only">
            Chef Benzaza — Se réinventez chaque jour · Académie Professionnelle Mostaganem
          </h1>

          {/* Existing Original Chef Benzaza Logo (Crown + Monogram B + CHEF BENZAZA + SE RÉINVENTEZ CHAQUE JOUR) */}
          <div
            className={`w-full flex items-center justify-center transform transition-all duration-700 ease-out ${
              phase === 'enter'
                ? 'opacity-0 scale-95 translate-y-4'
                : 'opacity-100 scale-100 translate-y-0'
            }`}
          >
            <img
              ref={splashLogoRef}
              src="/logo.png"
              alt="Logo Officiel Chef Benzaza — Se réinventez chaque jour"
              style={{
                ...flyStyle,
                transition: isFlying ? 'transform 850ms cubic-bezier(0.16, 1, 0.3, 1)' : undefined,
              }}
              className={`block w-full max-w-[380px] sm:max-w-[580px] md:max-w-[740px] lg:max-w-[820px] h-auto max-h-[42dvh] sm:max-h-[54dvh] object-contain mx-auto drop-shadow-[0_12px_32px_rgba(214,173,79,0.32)] ${
                isFlying ? 'z-50' : ''
              }`}
            />
          </div>

          {/* Subtitle & Location Supporting Copy */}
          <div
            className={`w-full mt-5 sm:mt-8 space-y-2.5 sm:space-y-3.5 flex flex-col items-center text-center animate-benzaza-fade transition-all duration-400 ${
              isFlying ? 'opacity-0 translate-y-3 pointer-events-none' : 'opacity-100 translate-y-0'
            }`}
            style={{ animationDelay: '150ms' }}
          >
            <div className="flex items-center justify-center gap-2 sm:gap-5 w-full max-w-full px-1">
              <span
                className="w-5 sm:w-20 md:w-28 h-[1.5px] bg-gradient-to-r from-transparent to-[#D6AD4F] shrink-0"
                aria-hidden="true"
              />
              <span className="text-center text-xs sm:text-base md:text-lg lg:text-xl font-bold uppercase tracking-[0.12em] sm:tracking-[0.26em] text-[#F5D477] sm:whitespace-nowrap">
                {language === 'ar' ? 'الأكاديمية المهنية' : 'ACADÉMIE PROFESSIONNELLE'}
              </span>
              <span
                className="w-5 sm:w-20 md:w-28 h-[1.5px] bg-gradient-to-l from-transparent to-[#D6AD4F] shrink-0"
                aria-hidden="true"
              />
            </div>

            <p className="w-full text-center text-[13px] sm:text-base md:text-lg lg:text-xl text-[#F8F4E9] font-medium tracking-wide px-2">
              {language === 'ar'
                ? 'مستغانم، الجزائر · التميز من خلال التكوين'
                : "Mostaganem, Algérie · L'excellence par la formation"}
            </p>
          </div>

          {/* Centered Gold Gradient Main Button with Shimmer */}
          <div
            className={`w-full flex justify-center mt-6 sm:mt-10 animate-benzaza-fade transition-all duration-400 ${
              isFlying ? 'opacity-0 translate-y-4 scale-95 pointer-events-none' : 'opacity-100 translate-y-0 scale-100'
            }`}
            style={{ animationDelay: '280ms' }}
          >
            <button
              type="button"
              onClick={handleEnterSite}
              className="btn-gold-shimmer group relative overflow-hidden inline-flex items-center justify-center gap-3 px-8 py-4 sm:px-11 sm:py-[18px] rounded-xl bg-gradient-to-r from-[#D6AD4F] via-[#F5D477] to-[#D6AD4F] hover:from-[#F5D477] hover:via-[#FCE293] hover:to-[#D6AD4F] text-[#00291D] font-bold text-sm sm:text-base uppercase tracking-[0.14em] shadow-[0_10px_28px_rgba(0,0,0,0.45),0_0_22px_rgba(214,173,79,0.24)] hover:shadow-[0_14px_34px_rgba(0,0,0,0.5),0_0_28px_rgba(245,212,119,0.42)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5D477]"
            >
              <span className="whitespace-nowrap">
                {language === 'ar' ? 'زيارة الموقع' : 'VISITER LE SITE'}
              </span>
              <ArrowRight
                className={`w-4 h-4 sm:w-5 sm:h-5 text-[#00291D] transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 ${
                  isRtl ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

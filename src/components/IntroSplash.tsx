import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, Compass } from 'lucide-react';
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
    // Reveal logo and content smoothly on enter
    const timer = setTimeout(() => {
      setPhase('ready');
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  const handleEnterSite = () => {
    if (phase === 'flying' || phase === 'done') return;

    onStartFlight?.();

    // Measure target header logo position & current big logo position
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

    // Finish flight when logo reaches target location in top-left header
    setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 850);
  };

  if (phase === 'done') return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#FAF7F2] select-none overflow-y-auto py-14 sm:py-0 transition-opacity duration-500 ease-out ${
        phase === 'flying' ? 'bg-opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        backgroundColor: phase === 'flying' ? 'rgba(250, 247, 242, 0)' : '#FAF7F2',
        transition: 'background-color 500ms ease-out',
      }}
      aria-label="Animation d'accueil École Chef Benzaza"
    >
      {/* Ambient background solid dark gold subtle atmosphere */}
      <div
        className={`absolute inset-0 pointer-events-none overflow-hidden transition-opacity duration-400 ${
          phase === 'flying' ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#8C6B28]/10 rounded-full blur-[150px]" />
        <div className="absolute inset-0 bg-[#FAF7F2]" />
        
        {/* Decorative solid dark gold frames */}
        <div className="absolute inset-x-3 sm:inset-x-10 top-3 sm:top-10 bottom-3 sm:bottom-10 border border-[#8C6B28]/30 pointer-events-none rounded-2xl sm:rounded-3xl" />
        <div className="absolute inset-x-5 sm:inset-x-12 top-5 sm:top-12 bottom-5 sm:bottom-12 border border-[#8C6B28]/20 pointer-events-none rounded-xl sm:rounded-2xl" />
      </div>

      {/* Top Bar inside Splash: Language Selector */}
      <div
        className={`absolute top-4 right-4 sm:top-6 sm:right-6 rtl:right-auto rtl:left-4 sm:rtl:left-6 z-20 flex items-center gap-2 transition-all duration-300 ${
          phase === 'flying' ? 'opacity-0 translate-y-[-10px] pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="flex items-center bg-white/90 backdrop-blur-md rounded-md p-1 border border-[#E8DEC8] shadow-xs">
          {(['fr', 'ar'] as Language[]).map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`px-2.5 py-1 text-xs font-semibold rounded transition-colors ${
                language === lang
                  ? 'bg-[#8C6B28] text-white shadow-xs'
                  : 'text-[#7A6E63] hover:text-[#2D241E]'
              }`}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Main Staged Content */}
      <div className="relative z-10 flex flex-col items-center max-w-4xl px-4 text-center">
        
        {/* Animated Emblem Lockup */}
        <div className="relative group">
          {/* Subtle dark gold glow behind the logo */}
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-[#8C6B28]/15 rounded-full blur-3xl pointer-events-none transition-opacity duration-300 ${
              phase === 'flying' ? 'opacity-0' : 'opacity-100'
            }`}
          />

          {/* Logo with scale & brightness entrance and smooth FLIP translation to top-left header */}
          <div
            className={`transform transition-all duration-1000 ease-out ${
              phase === 'enter'
                ? 'opacity-0 scale-90 translate-y-6 filter brightness-95'
                : 'opacity-100 filter brightness-100'
            }`}
          >
            <div className="relative flex items-center justify-center p-0">
              <img
                ref={splashLogoRef}
                src="/logo.png"
                alt="Logo Officiel Chef Benzaza"
                style={{
                  ...flyStyle,
                  transition: phase === 'flying' ? 'transform 850ms cubic-bezier(0.16, 1, 0.3, 1)' : undefined,
                }}
                className={`w-[90vw] max-w-[500px] sm:max-w-[620px] md:max-w-[720px] h-auto max-h-[48vh] object-contain drop-shadow-[0_8px_25px_rgba(140,107,40,0.4)] ${
                  phase === 'flying' ? 'z-50 shadow-none' : ''
                }`}
              />
            </div>
          </div>
        </div>

        {/* Text Fade-In Subtitle */}
        <div
          className={`mt-6 space-y-2 transform transition-all duration-400 ease-out ${
            phase === 'enter'
              ? 'opacity-0 translate-y-4'
              : phase === 'flying'
              ? 'opacity-0 translate-y-4 pointer-events-none'
              : 'opacity-100 translate-y-0'
          }`}
        >
          <div className="flex items-center justify-center gap-2 sm:gap-3 text-[11px] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.25em] text-[#8C6B28] font-mono font-semibold">
            <span className="w-5 sm:w-8 h-[1px] bg-[#8C6B28] shrink-0" />
            <span>Académie Professionnelle</span>
            <span className="w-5 sm:w-8 h-[1px] bg-[#8C6B28] shrink-0" />
          </div>

          <p className="text-xs sm:text-sm text-[#5C4F44] font-medium tracking-wider px-2">
            {language === 'ar'
              ? 'مستغانم، الجزائر · التميز من خلال التكوين'
              : "Mostaganem, Algérie · L'excellence par la formation"}
          </p>
        </div>

        {/* MANDATORY VISIT BUTTON: Triggers smooth flight animation to header */}
        <div
          className={`mt-6 sm:mt-8 transform transition-all duration-400 ease-out ${
            phase === 'enter'
              ? 'opacity-0 translate-y-6 scale-95'
              : phase === 'flying'
              ? 'opacity-0 translate-y-6 scale-95 pointer-events-none'
              : 'opacity-100 translate-y-0 scale-100'
          }`}
        >
          <button
            onClick={handleEnterSite}
            className="group relative inline-flex items-center gap-2.5 sm:gap-3 px-6 py-3.5 sm:px-8 sm:py-4 bg-[#8C6B28] hover:bg-[#7A5B1D] text-white font-bold text-xs sm:text-sm uppercase tracking-widest rounded-xl transition-all duration-300 shadow-[0_4px_25px_rgba(140,107,40,0.35)] hover:shadow-[0_4px_35px_rgba(140,107,40,0.5)] hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Compass className="w-5 h-5 text-white group-hover:rotate-45 transition-transform duration-300" />
            <span>
              {language === 'ar' ? 'زيارة الموقع (دخول)' : 'Visiter le site'}
            </span>
            <ArrowRight className={`w-4 h-4 text-white group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform ${isRtl ? 'rotate-180' : ''}`} />

            {/* Solid dark gold breathing ring */}
            <span className="absolute -inset-1 rounded-xl bg-[#8C6B28]/25 -z-10 animate-ping opacity-25" />
          </button>
        </div>

      </div>
    </div>
  );
};

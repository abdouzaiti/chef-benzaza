import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, Sparkles, Compass } from 'lucide-react';
import { Language } from '../types';

interface IntroSplashProps {
  onComplete: () => void;
}

export const IntroSplash: React.FC<IntroSplashProps> = ({ onComplete }) => {
  const { language, setLanguage, t, isRtl } = useApp();
  const [phase, setPhase] = useState<'enter' | 'ready' | 'exit'>('enter');
  const [shimmerKey, setShimmerKey] = useState(0);

  useEffect(() => {
    // Reveal logo and content smoothly
    const timer = setTimeout(() => {
      setPhase('ready');
    }, 500);

    // Loop a gentle shimmer across the gold logo every 3 seconds
    const interval = setInterval(() => {
      setShimmerKey((prev) => prev + 1);
    }, 3200);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  const handleEnterSite = () => {
    setPhase('exit');
    setTimeout(() => {
      onComplete();
    }, 600);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#0C0C0C] select-none transition-all duration-700 ease-out ${
        phase === 'exit'
          ? 'opacity-0 pointer-events-none scale-105 filter blur-xs'
          : 'opacity-100 scale-100'
      }`}
      aria-label="Animation d'accueil École Chef Benzaza"
    >
      {/* Ambient background gold glow & subtle radial light */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#C9A45C]/15 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(12,12,12,0.96)_75%)]" />
        
        {/* Subtle decorative luxury frames */}
        <div className="absolute inset-x-6 sm:inset-x-10 top-6 sm:top-10 bottom-6 sm:bottom-10 border border-[#C9A45C]/15 pointer-events-none rounded-3xl" />
        <div className="absolute inset-x-8 sm:inset-x-12 top-8 sm:top-12 bottom-8 sm:bottom-12 border border-[#C9A45C]/10 pointer-events-none rounded-2xl" />
      </div>

      {/* Top Bar inside Splash: Language Selector */}
      <div className="absolute top-6 right-6 rtl:right-auto rtl:left-6 z-20 flex items-center gap-2">
        <div className="flex items-center bg-[#1c1c1c]/80 backdrop-blur-md rounded-md p-1 border border-[#333]">
          {(['fr', 'ar', 'en'] as Language[]).map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`px-2.5 py-1 text-xs font-semibold rounded transition-colors ${
                language === lang
                  ? 'bg-[#C9A45C] text-[#171717] shadow-sm'
                  : 'text-neutral-400 hover:text-white'
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
          {/* Ambient gold glow behind the lettering */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-[#C9A45C]/25 rounded-full blur-3xl pointer-events-none" />

          {/* Logo with scale & brightness entrance */}
          <div
            className={`transform transition-all duration-1000 ease-out ${
              phase === 'enter'
                ? 'opacity-0 scale-90 translate-y-6 filter brightness-75'
                : 'opacity-100 scale-100 translate-y-0 filter brightness-110'
            }`}
          >
            {/* Pure logo with no black band or box */}
            <div className="relative flex items-center justify-center p-0">
              <img
                src="/logo.png"
                alt="Logo Officiel Chef Benzaza"
                className="w-[90vw] max-w-[600px] sm:max-w-[720px] md:max-w-[820px] h-auto max-h-[52vh] object-contain drop-shadow-[0_8px_40px_rgba(201,164,92,0.65)]"
              />
            </div>
          </div>
        </div>

        {/* Text Fade-In Subtitle */}
        <div
          className={`mt-6 space-y-2 transform transition-all duration-700 delay-300 ease-out ${
            phase === 'enter'
              ? 'opacity-0 translate-y-4'
              : 'opacity-100 translate-y-0'
          }`}
        >
          <div className="flex items-center justify-center gap-3 text-xs uppercase tracking-[0.25em] text-[#C9A45C] font-mono">
            <span className="w-8 h-[1px] bg-[#C9A45C]/60" />
            <span>Académie Professionnelle</span>
            <span className="w-8 h-[1px] bg-[#C9A45C]/60" />
          </div>

          <p className="text-xs sm:text-sm text-neutral-300 font-light tracking-wider">
            {language === 'ar'
              ? 'وهران، الجزائر · التميز من خلال التكوين'
              : language === 'en'
              ? 'Oran, Algeria · Excellence through training'
              : "Oran, Algérie · L'excellence par la formation"}
          </p>
        </div>

        {/* MANDATORY VISIT BUTTON: Stays until user clicks to enter */}
        <div
          className={`mt-8 transform transition-all duration-700 delay-500 ease-out ${
            phase === 'enter' ? 'opacity-0 translate-y-6 scale-95' : 'opacity-100 translate-y-0 scale-100'
          }`}
        >
          <button
            onClick={handleEnterSite}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#C9A45C] via-[#DFC283] to-[#C9A45C] text-[#171717] font-bold text-sm uppercase tracking-widest rounded-xl transition-all duration-300 shadow-[0_0_25px_rgba(201,164,92,0.4)] hover:shadow-[0_0_40px_rgba(201,164,92,0.7)] hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Compass className="w-5 h-5 text-[#171717] group-hover:rotate-45 transition-transform duration-300" />
            <span>
              {language === 'ar' ? 'زيارة الموقع (دخول)' : 'Visiter le site'}
            </span>
            <ArrowRight className={`w-4 h-4 text-[#171717] group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform ${isRtl ? 'rotate-180' : ''}`} />

            {/* Subtle outer breathing ring */}
            <span className="absolute -inset-1 rounded-xl bg-[#C9A45C]/30 -z-10 animate-ping opacity-25" />
          </button>

          <p className="text-[11px] text-neutral-500 mt-3 font-mono">
            {language === 'ar'
              ? 'اضغط على الزر للدخول إلى الصفحة الرئيسية'
              : 'Cliquez pour accéder à la plateforme'}
          </p>
        </div>

      </div>

      {/* Global CSS keyframe for shimmer animation */}
      <style>{`
        @keyframes shimmerSweep {
          0% { transform: translateX(-150%); }
          100% { transform: translateX(150%); }
        }
      `}</style>
    </div>
  );
};

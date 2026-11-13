import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Language } from '../types';
import {
  ShoppingBag,
  Menu,
  X,
} from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onOpenRegistration: () => void;
  isLogoHidden?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenRegistration,
  isLogoHidden = false,
}) => {
  const { language, setLanguage, t, cartTotalQuantity, setIsCartOpen } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: t('navHome') },
    { id: 'courses', label: t('navCourses') },
    { id: 'store', label: t('navStore') },
    { id: 'salon', label: t('navSalon') },
    { id: 'gallery', label: t('navGallery') },
    { id: 'about', label: t('navAbout') },
    { id: 'contact', label: t('navContact') },
  ];

  const handleLangChange = (lang: Language) => {
    setLanguage(lang);
  };

  const handleNavClick = (viewId: string) => {
    onNavigate(viewId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Main Navigation Bar — Luxury Emerald & Gold */}
      <header className="sticky top-0 z-40 bg-[#063B2E]/95 backdrop-blur-md border-b border-[#D6AD4F]/75 text-[#FAF6ED] shadow-[0_6px_28px_rgba(2,20,15,0.35)]">
        <div className="relative w-full max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 h-[60px] sm:h-[68px] flex items-center justify-between gap-2 sm:gap-4 lg:gap-8">
          
          {/* Zone 1: Single brand logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 sm:gap-3 text-left rtl:text-right group min-w-0 shrink focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E5BD5B] rounded-md cursor-pointer"
            aria-label="Accueil École Chef Benzaza"
          >
            <img
              id="header-brand-logo-img"
              src="/logo.png"
              alt="Logo Officiel École Chef Benzaza"
              className={`h-9 sm:h-12 w-auto max-w-[96px] sm:max-w-none object-contain transition-all duration-300 group-hover:scale-105 drop-shadow-[0_2px_10px_rgba(214,173,79,0.3)] ${
                isLogoHidden ? 'opacity-0' : 'opacity-100'
              }`}
            />
          </button>

          {/* Zone 2: Concise single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-[13px] xl:text-sm font-medium tracking-wide text-[#F4EFE4]">
            {navLinks.map((link) => {
              const isActive = currentView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`group relative py-2 transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer focus:outline-none focus-visible:text-[#E5BD5B] ${
                    isActive
                      ? 'text-[#E5BD5B] font-semibold'
                      : 'text-[#F4EFE4]/90 hover:text-[#E5BD5B]'
                  }`}
                >
                  <span>{link.label}</span>
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-[1.5px] rounded-full bg-gradient-to-r from-[#D6AD4F] via-[#F3D784] to-[#D6AD4F] transition-transform duration-300 ease-out origin-center ${
                      isActive ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-80'
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Language Selector, Cart Button & Primary CTA */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Language Switcher */}
            <div className="inline-flex items-center h-9 sm:h-10 bg-[#042920] rounded-lg p-0.5 sm:p-1 border border-[#D6AD4F]/45 shrink-0">
              {(['fr', 'ar'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLangChange(lang)}
                  className={`h-full px-1.5 sm:px-2.5 flex items-center justify-center text-[11px] sm:text-xs font-semibold rounded-md transition-all duration-200 whitespace-nowrap cursor-pointer ${
                    language === lang
                      ? 'bg-gradient-to-br from-[#E5BD5B] to-[#C89B3C] text-[#05261D] shadow-xs font-bold'
                      : 'text-[#EAE2CF]/85 hover:text-[#E5BD5B]'
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Shopping Cart button with badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg text-[#FAF6ED] hover:text-[#E5BD5B] bg-[#042920]/75 hover:bg-[#084939] border border-[#D6AD4F]/45 hover:border-[#E5BD5B] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E5BD5B] shrink-0 cursor-pointer"
              aria-label={t('cart')}
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-[#E5BD5B]" />
              {cartTotalQuantity > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-br from-[#F0CE74] to-[#C89B3C] text-[#05261D] text-[10px] sm:text-[11px] font-bold w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center tabular-nums shadow-sm border border-[#063B2E]">
                  {cartTotalQuantity}
                </span>
              )}
            </button>

            {/* Primary Action Button — Gold luxury gradient with dark text */}
            <button
              onClick={onOpenRegistration}
              className="inline-flex items-center justify-center h-9 sm:h-10 px-2.5 sm:px-4.5 text-[11px] sm:text-xs font-bold uppercase tracking-wide sm:tracking-wider text-[#05261D] bg-gradient-to-r from-[#D6AD4F] via-[#E8C56B] to-[#C89B3C] hover:from-[#E5BD5B] hover:via-[#F3D784] hover:to-[#D6AD4F] rounded-lg transition-all duration-200 shadow-[0_2px_12px_rgba(214,173,79,0.28)] hover:shadow-[0_4px_18px_rgba(229,189,91,0.4)] hover:-translate-y-0.5 whitespace-nowrap shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F3D784]"
            >
              {t('registerShort')}
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg text-[#E5BD5B] hover:text-[#F3D784] bg-[#042920]/75 hover:bg-[#084939] border border-[#D6AD4F]/45 transition-colors focus:outline-none shrink-0 cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Curved Gold Decorative Detail along bottom edge */}
        <div className="pointer-events-none absolute left-0 right-0 -bottom-[7px] flex justify-center overflow-hidden" aria-hidden="true">
          <svg
            viewBox="0 0 1440 14"
            fill="none"
            preserveAspectRatio="none"
            className="w-full h-[10px] sm:h-[12px]"
          >
            <defs>
              <linearGradient id="navGoldCurve" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#D6AD4F" stopOpacity="0" />
                <stop offset="22%" stopColor="#D6AD4F" stopOpacity="0.55" />
                <stop offset="50%" stopColor="#F3D784" stopOpacity="0.95" />
                <stop offset="78%" stopColor="#D6AD4F" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#D6AD4F" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0 3 Q360 12 720 4 T1440 3"
              stroke="url(#navGoldCurve)"
              strokeWidth="1.25"
              fill="none"
            />
            <circle cx="720" cy="4.2" r="2.2" fill="#E5BD5B" fillOpacity="0.9" />
          </svg>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#052E24] border-b border-[#D6AD4F]/60 px-4 pt-3 pb-6 shadow-2xl max-h-[calc(100vh-60px)] sm:max-h-[calc(100vh-68px)] overflow-y-auto animate-in fade-in duration-150">
            <nav className="flex flex-col gap-1.5">
              {navLinks.map((link) => {
                const isActive = currentView === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`text-left rtl:text-right px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#084536] text-[#E5BD5B] font-semibold border border-[#D6AD4F]/50'
                        : 'text-[#F4EFE4] hover:bg-[#084536]/60 hover:text-[#E5BD5B]'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
              <div className="pt-3 mt-2 border-t border-[#D6AD4F]/25 flex flex-col gap-2.5">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenRegistration();
                  }}
                  className="w-full py-3 text-center text-xs font-bold uppercase tracking-wider text-[#05261D] bg-gradient-to-r from-[#D6AD4F] via-[#E8C56B] to-[#C89B3C] hover:from-[#E5BD5B] hover:via-[#F3D784] hover:to-[#D6AD4F] rounded-lg shadow-md"
                >
                  {t('registerNow')}
                </button>
                <button
                  onClick={() => handleNavClick('admin')}
                  className="w-full py-2.5 text-center text-xs font-medium text-[#E7E0D0] hover:text-[#E5BD5B] bg-[#04241C] border border-[#D6AD4F]/35 rounded-lg transition-colors"
                >
                  {t('navAdmin')}
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

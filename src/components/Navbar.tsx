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
      {/* Main Navigation Bar — 3 Zones Contract */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#EADFC7] text-[#2D241E] shadow-xs">
        <div className="w-full max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 h-[60px] sm:h-[64px] flex items-center justify-between gap-2 sm:gap-4 lg:gap-8">
          
          {/* Zone 1: Single brand logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 sm:gap-3 text-left rtl:text-right group min-w-0 shrink focus:outline-none cursor-pointer"
            aria-label="Accueil École Chef Benzaza"
          >
            <img
              id="header-brand-logo-img"
              src="/logo.png"
              alt="Logo Officiel École Chef Benzaza"
              className={`h-9 sm:h-12 w-auto max-w-[96px] sm:max-w-none object-contain transition-all group-hover:scale-105 drop-shadow-[0_2px_8px_rgba(140,107,40,0.35)] ${
                isLogoHidden ? 'opacity-0' : 'opacity-100 duration-300'
              }`}
            />
          </button>

          {/* Zone 2: Concise single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-sm font-medium text-[#5C4F44]">
            {navLinks.map((link) => {
              const isActive = currentView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative py-1.5 transition-colors whitespace-nowrap shrink-0 hover:text-[#C9A45C] cursor-pointer ${
                    isActive ? 'text-[#8C6B28] font-bold' : 'text-[#5C4F44]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C9A45C] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Language Selector, Cart Button & Primary CTA */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Language Switcher */}
            <div className="inline-flex items-center h-9 sm:h-10 bg-[#FBF8F1] rounded-md p-0.5 sm:p-1 border border-[#E8DEC8] shrink-0">
              {(['fr', 'ar'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLangChange(lang)}
                  className={`h-full px-1.5 sm:px-2.5 flex items-center justify-center text-[11px] sm:text-xs font-semibold rounded transition-colors whitespace-nowrap cursor-pointer ${
                    language === lang
                      ? 'bg-[#C9A45C] text-white shadow-xs'
                      : 'text-[#7A6E63] hover:text-[#2D241E]'
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Shopping Cart button with badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-md text-[#5C4F44] hover:text-[#8C6B28] hover:bg-[#FBF8F1] border border-[#EADFC7] transition-colors focus:outline-none shrink-0 cursor-pointer"
              aria-label={t('cart')}
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-[#C9A45C]" />
              {cartTotalQuantity > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#C9A45C] text-white text-[10px] sm:text-[11px] font-bold w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center tabular-nums shadow-xs">
                  {cartTotalQuantity}
                </span>
              )}
            </button>

            {/* Primary Action Button — visible across mobile, tablet, and desktop */}
            <button
              onClick={onOpenRegistration}
              className="inline-flex items-center justify-center h-9 sm:h-10 px-2.5 sm:px-4 text-[11px] sm:text-xs font-bold uppercase tracking-wide sm:tracking-wider text-white bg-[#C9A45C] hover:bg-[#DFC283] rounded-md transition-all shadow-sm shadow-[#C9A45C]/20 whitespace-nowrap shrink-0 cursor-pointer"
            >
              {t('registerShort')}
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-md text-[#5C4F44] hover:text-[#2D241E] hover:bg-[#FBF8F1] border border-[#EADFC7] focus:outline-none shrink-0 cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#C9A45C]" /> : <Menu className="w-5 h-5 text-[#C9A45C]" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-[#EADFC7] px-4 pt-3 pb-6 shadow-lg max-h-[calc(100vh-60px)] sm:max-h-[calc(100vh-64px)] overflow-y-auto animate-in fade-in duration-150">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = currentView === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`text-left rtl:text-right px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#FBF8F1] text-[#8C6B28] font-bold border border-[#EADFC7]'
                        : 'text-[#5C4F44] hover:bg-[#FBF8F1]'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
              <div className="pt-3 mt-2 border-t border-[#EADFC7] flex flex-col gap-2.5">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenRegistration();
                  }}
                  className="w-full py-3 text-center text-xs font-bold uppercase tracking-wider text-white bg-[#C9A45C] hover:bg-[#DFC283] rounded-md shadow-xs"
                >
                  {t('registerNow')}
                </button>
                <button
                  onClick={() => handleNavClick('admin')}
                  className="w-full py-2.5 text-center text-xs font-medium text-[#7A6E63] hover:text-[#2D241E] bg-[#FBF8F1] border border-[#EADFC7] rounded-md"
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

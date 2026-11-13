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
        <div className="w-[987px] max-w-full mx-auto px-4 sm:px-8 h-[60px] flex items-center justify-between gap-8">
          
          {/* Zone 1: Single brand logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left rtl:text-right group shrink-0 focus:outline-none"
            aria-label="Accueil École Chef Benzaza"
          >
            <img
              id="header-brand-logo-img"
              src="/logo.png"
              alt="Logo Officiel École Chef Benzaza"
              className={`h-11 sm:h-12 w-auto object-contain transition-all group-hover:scale-105 drop-shadow-[0_2px_8px_rgba(140,107,40,0.35)] ${
                isLogoHidden ? 'opacity-0' : 'opacity-100 duration-300'
              }`}
            />
          </button>

          {/* Zone 2: 4-5 concise single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#5C4F44]">
            {navLinks.map((link) => {
              const isActive = currentView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative py-1.5 transition-colors whitespace-nowrap shrink-0 hover:text-[#C9A45C] ${
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
          <div className="flex items-center gap-3.5 shrink-0">
            {/* Language Switcher */}
            <div className="flex items-center bg-[#FBF8F1] rounded-md p-1 border border-[#E8DEC8]">
              {(['fr', 'ar'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLangChange(lang)}
                  className={`px-2 py-0.5 text-xs font-semibold rounded transition-colors whitespace-nowrap ${
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
              className="relative p-2.5 rounded-md text-[#5C4F44] hover:text-[#8C6B28] hover:bg-[#FBF8F1] border border-[#EADFC7] transition-colors focus:outline-none"
              aria-label={t('cart')}
            >
              <ShoppingBag className="w-5 h-5 text-[#C9A45C]" />
              {cartTotalQuantity > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C9A45C] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center tabular-nums shadow-xs">
                  {cartTotalQuantity}
                </span>
              )}
            </button>

            {/* Primary Action Button */}
            <button
              onClick={onOpenRegistration}
              className="hidden sm:inline-flex items-center px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#C9A45C] hover:bg-[#DFC283] rounded-md transition-all shadow-sm shadow-[#C9A45C]/20 whitespace-nowrap shrink-0"
            >
              {t('registerShort')}
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-[#5C4F44] hover:text-[#2D241E] hover:bg-[#FBF8F1] border border-[#EADFC7] focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#C9A45C]" /> : <Menu className="w-6 h-6 text-[#C9A45C]" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-[#EADFC7] px-4 pt-3 pb-6 shadow-lg animate-in fade-in duration-150">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = currentView === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`text-left rtl:text-right px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
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
                  className="w-full py-2.5 text-center text-xs font-bold uppercase tracking-wider text-white bg-[#C9A45C] hover:bg-[#DFC283] rounded-md shadow-xs"
                >
                  {t('registerNow')}
                </button>
                <button
                  onClick={() => handleNavClick('admin')}
                  className="w-full py-2 text-center text-xs font-medium text-[#7A6E63] hover:text-[#2D241E] bg-[#FBF8F1] border border-[#EADFC7] rounded-md"
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

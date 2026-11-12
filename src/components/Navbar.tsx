import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Language } from '../types';
import {
  ShoppingBag,
  Menu,
  X,
  Phone,
  ShieldCheck,
  GraduationCap,
} from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onOpenRegistration: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenRegistration,
}) => {
  const { language, setLanguage, t, isRtl, cartTotalQuantity, setIsCartOpen, settings } = useApp();
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
      {/* Top micro-bar with contact info in Oran */}
      <div className="bg-[#171717] text-[#C9A45C] text-xs py-1.5 px-4 sm:px-8 border-b border-[#2b2b2b]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 text-neutral-300">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A45C]"></span>
              <span className="text-[#F8F5EF] font-medium">{t('locationName')}</span>
              <span className="hidden md:inline text-neutral-400">| {settings.address}</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`tel:${settings.phone}`}
              className="hidden sm:flex items-center gap-1.5 text-neutral-300 hover:text-[#C9A45C] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#C9A45C]" />
              <span className="tabular-nums font-mono">{settings.phone}</span>
            </a>
            <button
              onClick={() => handleNavClick('admin')}
              className="flex items-center gap-1 text-neutral-400 hover:text-white transition-colors"
              title={t('navAdmin')}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#C9A45C]" />
              <span className="text-[11px] uppercase tracking-wider">{t('navAdmin')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar — 3 Zones Contract */}
      <header className="sticky top-0 z-40 bg-[#171717]/95 backdrop-blur-md border-b border-[#2d2a24] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-8">
          
          {/* Zone 1: Single brand logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left rtl:text-right group shrink-0 focus:outline-none"
            aria-label="Accueil École Chef Benzaza"
          >
            <img
              src="/logo.png"
              alt="Logo Officiel École Chef Benzaza"
              className="h-14 sm:h-16 w-auto object-contain transition-transform group-hover:scale-105 drop-shadow-[0_2px_8px_rgba(201,164,92,0.3)]"
            />
          </button>

          {/* Zone 2: 4-5 concise single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-neutral-300">
            {navLinks.map((link) => {
              const isActive = currentView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative py-1.5 transition-colors whitespace-nowrap shrink-0 hover:text-[#C9A45C] ${
                    isActive ? 'text-[#C9A45C] font-semibold' : 'text-neutral-300'
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
            <div className="flex items-center bg-[#242424] rounded-md p-1 border border-[#333333]">
              {(['fr', 'ar', 'en'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLangChange(lang)}
                  className={`px-2 py-0.5 text-xs font-semibold rounded transition-colors whitespace-nowrap ${
                    language === lang
                      ? 'bg-[#C9A45C] text-[#171717] shadow-sm'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Shopping Cart button with badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-md text-neutral-300 hover:text-white hover:bg-[#242424] border border-transparent hover:border-[#333333] transition-colors focus:outline-none"
              aria-label={t('cart')}
            >
              <ShoppingBag className="w-5 h-5 text-[#C9A45C]" />
              {cartTotalQuantity > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C9A45C] text-[#171717] text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center tabular-nums">
                  {cartTotalQuantity}
                </span>
              )}
            </button>

            {/* Primary Action Button */}
            <button
              onClick={onOpenRegistration}
              className="hidden sm:inline-flex items-center px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#171717] bg-[#C9A45C] hover:bg-[#DFC283] rounded-md transition-all shadow-sm shadow-[#C9A45C]/20 whitespace-nowrap shrink-0"
            >
              {t('registerShort')}
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-neutral-300 hover:text-white hover:bg-[#242424] focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#171717] border-b border-[#2d2a24] px-4 pt-3 pb-6 animate-in fade-in duration-150">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = currentView === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`text-left rtl:text-right px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#C9A45C]/15 text-[#C9A45C] font-semibold'
                        : 'text-neutral-300 hover:bg-[#242424]'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
              <div className="pt-3 mt-2 border-t border-[#2d2a24] flex flex-col gap-2.5">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenRegistration();
                  }}
                  className="w-full py-2.5 text-center text-xs font-bold uppercase tracking-wider text-[#171717] bg-[#C9A45C] rounded-md"
                >
                  {t('registerNow')}
                </button>
                <button
                  onClick={() => handleNavClick('admin')}
                  className="w-full py-2 text-center text-xs font-medium text-neutral-400 hover:text-white bg-[#242424] rounded-md"
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

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MercyMedLogo } from './MercyMedLogo';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { MessageSquare, Menu, X, Settings2 } from 'lucide-react';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenBooking: (doctorId?: string, serviceId?: string) => void;
  onOpenAdmin: () => void;
}

export const Header: React.FC<HeaderProps & { onNavigatePage?: (page: 'welcome' | 'services' | 'admin') => void; currentPage?: string }> = ({
  currentLang,
  onLanguageChange,
  onOpenBooking,
  onOpenAdmin,
  onNavigatePage,
  currentPage = 'welcome',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[currentLang];

  const navLinks = [
    { href: 'home', label: currentLang === 'ru' ? 'Главная' : currentLang === 'ky' ? 'Башкы бет' : 'Welcome' },
    { href: 'services', label: currentLang === 'ru' ? 'Услуги и Прайс-лист' : currentLang === 'ky' ? 'Кызматтар жана Баалар' : 'Services & Pricing' },
    { href: '#team', label: t.nav.team },
    { href: '#contact', label: t.nav.contact },
  ];

  const handleNavClick = (target: string) => {
    setMobileMenuOpen(false);
    if (target === 'services') {
      if (onNavigatePage) onNavigatePage('services');
      else window.location.hash = '#/services';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'home') {
      if (onNavigatePage) onNavigatePage('welcome');
      else window.location.hash = '';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Anchors like #team or #contact
      if (currentPage !== 'welcome' && onNavigatePage) {
        onNavigatePage('welcome');
        setTimeout(() => {
          const el = document.querySelector(target);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const el = document.querySelector(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Single Brand Wordmark / Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
            }}
            className="flex items-center focus:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-500 rounded-md whitespace-nowrap shrink-0"
            aria-label="MercyMed Home"
          >
            <MercyMedLogo size="md" showTagline={false} />
          </a>

          {/* Zone 2: Clean 4–5 single-line navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-600">
            {navLinks.map((link) => (
              <button
                key={link.href}
                type="button"
                onClick={() => handleNavClick(link.href)}
                className={`transition-colors hover:underline underline-offset-8 decoration-amber-500 decoration-2 whitespace-nowrap shrink-0 cursor-pointer ${
                  (link.href === 'services' && currentPage === 'services') || (link.href === 'home' && currentPage === 'welcome')
                    ? 'text-stone-900 font-bold decoration-[#EE5A24]'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Zone 3: Language Toggle & 1 Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Language Switcher */}
            <div className="flex items-center bg-stone-100 p-0.5 rounded-lg border border-stone-200/80 text-xs font-semibold">
              {(['en', 'ru', 'ky'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => onLanguageChange(lang)}
                  className={`px-2.5 py-1 rounded-md transition-all uppercase whitespace-nowrap ${
                    currentLang === lang
                      ? 'bg-white text-stone-900 shadow-xs font-bold'
                      : 'text-stone-500 hover:text-stone-900'
                  }`}
                  aria-label={`Switch to ${lang}`}
                >
                  {lang === 'ky' ? 'KG' : lang}
                </button>
              ))}
            </div>

            {/* Quick Staff Demo Button */}
            <button
              type="button"
              onClick={onOpenAdmin}
              title={t.nav.staffPortal}
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-lg border border-stone-200 transition-colors whitespace-nowrap"
            >
              <Settings2 className="w-3.5 h-3.5 text-stone-500" />
              <span>{t.nav.staffPortal}</span>
            </button>

            {/* Primary Action Button */}
            <button
              type="button"
              onClick={() => onOpenBooking()}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-linear-to-r from-[#EE5A24] to-[#F58220] hover:from-[#EA3725] hover:to-[#EE5A24] rounded-lg shadow-sm hover:shadow transition-all active:scale-[0.98] whitespace-nowrap shrink-0"
            >
              <MessageSquare className="w-4 h-4 fill-white/20" />
              <span>{t.nav.bookCta}</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-500"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 shadow-xl animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.href}
                type="button"
                onClick={() => handleNavClick(link.href)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-medium transition-colors cursor-pointer ${
                  (link.href === 'services' && currentPage === 'services') || (link.href === 'home' && currentPage === 'welcome')
                    ? 'bg-stone-100 text-stone-900 font-bold'
                    : 'text-stone-700 hover:bg-stone-100 hover:text-stone-900'
                }`}
              >
                {link.label}
              </button>
            ))}

            <div className="pt-3 mt-2 border-t border-stone-200 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg text-sm font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-200 transition-colors"
              >
                <Settings2 className="w-4 h-4" />
                <span>{t.nav.staffPortal}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

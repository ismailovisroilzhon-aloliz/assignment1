/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MercyMedLogo } from './MercyMedLogo';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { MapPin, Phone, MessageSquare, Heart, Shield } from 'lucide-react';

interface FooterProps {
  currentLang: Language;
  onOpenBooking: () => void;
  onOpenAdmin: () => void;
  onNavigatePage?: (page: 'welcome' | 'services' | 'admin') => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentLang,
  onOpenBooking,
  onOpenAdmin,
  onNavigatePage,
}) => {
  const t = TRANSLATIONS[currentLang];

  const handleLinkClick = (target: string) => {
    if (target === 'services') {
      if (onNavigatePage) onNavigatePage('services');
      else window.location.hash = '#/services';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'home') {
      if (onNavigatePage) onNavigatePage('welcome');
      else window.location.hash = '';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (target === '#team' || target === '#contact') {
        if (onNavigatePage) onNavigatePage('welcome');
        setTimeout(() => {
          const el = document.querySelector(target);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        // #about or #outreach (located on services page)
        if (onNavigatePage) onNavigatePage('services');
        setTimeout(() => {
          const el = document.querySelector(target);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          
          {/* Col 1: Brand & Mission */}
          <div className="lg:col-span-5 space-y-4">
            {/* Brand Logo perfectly matched to dark footer */}
            <div className="inline-flex items-center">
              <MercyMedLogo size="md" showTagline={false} lightText={true} />
            </div>

            {/* CSS selector 2 target: shortened to leave only the most essential data */}
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-md font-medium">
              Evidence-based pediatric and family medicine in Bishkek. Compassionate outpatient care for children and adults.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-stone-400">
              <span className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-emerald-400" />
                Evidence-Based Protocol
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-[#EE5A24]" />
                Holistic Body & Spirit
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Medical Center
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('#about')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  {t.nav.about}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('services')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  {t.nav.services}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('#team')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  {t.nav.team}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('#outreach')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  {t.nav.outreach}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('#contact')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  {t.nav.contact}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Inquiries */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Direct Contact
            </h4>
            
            <p className="text-xs text-stone-400 leading-relaxed">
              Tunguch microdistrict, near Ayu Grand & Ala-Too International University, Bishkek, Kyrgyzstan
            </p>

            <div className="pt-1 flex flex-col gap-2">
              <button
                type="button"
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-linear-to-r from-[#EE5A24] to-[#F58220] hover:from-[#EA3725] hover:to-[#EE5A24] text-white text-xs font-bold transition-all shadow-xs"
              >
                <MessageSquare className="w-4 h-4 fill-white/20" />
                <span>{t.nav.bookCta}</span>
              </button>

              <button
                type="button"
                onClick={onOpenAdmin}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium transition-colors"
              >
                <span>{t.nav.staffPortal}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Credits & Prototype Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} MercyMed Clinic. All rights reserved.
          </div>

          <div className="text-center sm:text-right text-[11px] text-stone-500">
            <span>Client Prototype for Dr. Lukas Meyer-Landolt & MercyMed</span>
            <span className="mx-2">·</span>
            <span>AUCA COM360 Project (Isroilzhon Ismailov)</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

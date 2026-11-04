/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { Truck, MapPin, Heart, Users2, Check, ArrowRight } from 'lucide-react';

interface MobileClinicsSectionProps {
  currentLang: Language;
  onOpenBooking: () => void;
}

export const MobileClinicsSection: React.FC<MobileClinicsSectionProps> = ({
  currentLang,
  onOpenBooking,
}) => {
  const t = TRANSLATIONS[currentLang];

  return (
    <section id="outreach" className="py-16 md:py-24 bg-white border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#EE5A24] mb-3">
            <Truck className="w-4 h-4" />
            <span>{t.outreach.badge}</span>
          </div>
          <h2 
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight mb-4"
            style={{ textWrap: 'balance' }}
          >
            {t.outreach.title}
          </h2>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
            {t.outreach.subtitle}
          </p>
        </div>

        {/* 2-Column Content: Outreach Mission Story & Field Operations */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
          
          {/* Narrative Column */}
          <div className="lg:col-span-7 space-y-6">
            <p className="text-base text-stone-700 leading-relaxed">
              {t.outreach.storyP1}
            </p>
            <p className="text-base text-stone-700 leading-relaxed">
              {t.outreach.storyP2}
            </p>

            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-stone-50 border border-stone-200">
                <Heart className="w-5 h-5 text-[#EE5A24] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-stone-900">Free Care & Medication</h4>
                  <p className="text-xs text-stone-600 mt-1">Directly supplying donated and subsidized medications to vulnerable families.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-stone-50 border border-stone-200">
                <Users2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-stone-900">Multidisciplinary Team</h4>
                  <p className="text-xs text-stone-600 mt-1">Pediatricians, family physicians, nurses, and sonographers travelling together.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Regional Reach Card */}
          <div className="lg:col-span-5">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-stone-900 to-stone-800 text-white shadow-xl">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-700">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                  Regional Footprint
                </span>
                <span className="text-xs text-stone-400">Since 2013</span>
              </div>

              <h3 className="text-xl font-bold mb-4">
                Active in All 7 Oblasts
              </h3>
              
              <ul className="space-y-2.5 text-xs sm:text-sm text-stone-300 mb-8">
                {['Chuy & Bishkek outskirts', 'Naryn mountain villages', 'Issyk-Kul rural districts', 'Osh & Jalal-Abad regions', 'Talas & Batken communities'].map((region, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{region}</span>
                  </li>
                ))}
              </ul>

              <div className="p-4 rounded-xl bg-white/10 border border-white/15">
                <p className="text-xs text-stone-200 mb-3 leading-relaxed">
                  {t.outreach.inviteNotice}
                </p>
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="w-full py-2.5 px-4 text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <span>{t.outreach.inviteBtn}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

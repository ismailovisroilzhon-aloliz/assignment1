/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { Building2, GraduationCap, CheckCircle2, ArrowRight, MessageSquare } from 'lucide-react';

interface CorporateAndEducationSectionProps {
  currentLang: Language;
  onOpenBooking: () => void;
}

export const CorporateAndEducationSection: React.FC<CorporateAndEducationSectionProps> = ({
  currentLang,
  onOpenBooking,
}) => {
  const t = TRANSLATIONS[currentLang];

  return (
    <section className="py-16 md:py-24 bg-stone-50 border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section 1: For Corporate Clients & Embassies */}
        <div className="mb-20">
          <div className="max-w-3xl mb-10">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#EE5A24] mb-3">
              <Building2 className="w-4 h-4" />
              <span>{t.corporate.badge}</span>
            </div>
            <h2 
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight mb-4"
              style={{ textWrap: 'balance' }}
            >
              {t.corporate.title}
            </h2>
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
              {t.corporate.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {t.corporate.offerings.map((item, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-white border border-stone-200 hover:border-amber-300 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#EE5A24] flex items-center justify-center font-bold mb-4">
                    0{index + 1}
                  </div>
                  <h3 className="text-lg font-bold text-stone-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-start">
            <button
              type="button"
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#EE5A24] hover:bg-[#EA3725] rounded-xl shadow-xs transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{t.corporate.ctaBtn}</span>
            </button>
          </div>
        </div>

        {/* Section 2: Medical Education & Training */}
        <div className="pt-12 border-t border-stone-200/90">
          <div className="max-w-3xl mb-10">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 mb-3">
              <GraduationCap className="w-4 h-4" />
              <span>{t.education.badge}</span>
            </div>
            <h2 
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight mb-4"
              style={{ textWrap: 'balance' }}
            >
              {t.education.title}
            </h2>
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
              {t.education.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.education.initiatives.map((item, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-white border border-stone-200 hover:border-amber-300 shadow-2xs hover:shadow-xs transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold mb-4">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-stone-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

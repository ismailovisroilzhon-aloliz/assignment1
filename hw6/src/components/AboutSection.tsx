/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { Heart, Stethoscope, Compass, Users, CheckCircle2, Award } from 'lucide-react';

interface AboutSectionProps {
  currentLang: Language;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang];

  return (
    <section id="about" className="py-16 md:py-24 bg-white border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#EE5A24] mb-3">
            <Award className="w-4 h-4" />
            <span>{t.about.badge}</span>
          </div>
          <h2 
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight mb-4"
            style={{ textWrap: 'balance' }}
          >
            {t.about.title}
          </h2>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
            {t.about.subtitle}
          </p>
        </div>

        {/* 2-Column Story & Evidence-Based Medicine Deep Dive */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-16">
          
          {/* History Card */}
          <div className="p-8 rounded-2xl bg-stone-50 border border-stone-200/80 flex flex-col justify-between h-full">
            <div>
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-[#EE5A24] flex items-center justify-center mb-6">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-4">
                {t.about.historyTitle}
              </h3>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed mb-4">
                {t.about.historyP1}
              </p>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                {t.about.historyP2}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
              <span className="font-semibold text-stone-700">Outreach Roots</span>
              <span>All 7 Oblasts of Kyrgyzstan</span>
            </div>
          </div>

          {/* Evidence-Based Medicine Card */}
          <div className="p-8 rounded-2xl bg-stone-50 border border-stone-200/80 flex flex-col justify-between h-full">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-[#F58220] flex items-center justify-center mb-6">
                <Stethoscope className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-4">
                {t.about.ebmTitle}
              </h3>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed mb-4">
                {t.about.ebmP1}
              </p>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                {t.about.ebmP2}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
              <span className="font-semibold text-stone-700">Clinical Protocol</span>
              <span>International Cochrane & WHO Guidelines</span>
            </div>
          </div>

        </div>

        {/* Brand Values Row (From Logo Guidelines) */}
        <div>
          <h3 className="text-lg font-bold text-stone-900 mb-6 flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#EE5A24]" />
            <span>{t.about.valuesTitle}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {t.about.values.map((v, i) => (
              <div 
                key={v.title}
                className="p-5 rounded-xl bg-white border border-stone-200 hover:border-amber-400 hover:shadow-xs transition-all"
              >
                <div className="text-xs font-bold text-[#EE5A24] mb-1">
                  0{i + 1}.
                </div>
                <h4 className="text-base font-bold text-stone-900 mb-2">
                  {v.title}
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

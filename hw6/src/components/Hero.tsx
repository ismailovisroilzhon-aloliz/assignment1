/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { 
  MessageSquare, 
  MapPin, 
  CalendarCheck,
  CheckCircle2,
  Stethoscope
} from 'lucide-react';

interface HeroProps {
  currentLang: Language;
  onOpenBooking: () => void;
  onNavigateToServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  currentLang,
  onOpenBooking,
  onNavigateToServices,
}) => {
  const t = TRANSLATIONS[currentLang];

  // 3 distinct high-res clinic scenes with public asset paths
  const bgImages = [
    {
      url: '/assets/hero/hero_clinic_interior_1793717940316.jpg',
      titleEn: 'Warm Outpatient Reception & Triage',
      titleRu: 'Светлый холл и регистратура клиники',
      titleKy: 'Клиниканын жарык каттоо бөлмөсү',
    },
    {
      url: '/assets/hero/hero_pediatric_consultation_1793717963186.jpg',
      titleEn: 'Compassionate Pediatric & Family Consultation',
      titleRu: 'Педиатрический и семейный прием',
      titleKy: 'Педиатриялык жана үй-бүлөлүк кабыл алуу',
    },
    {
      url: '/assets/hero/hero_diagnostics_care_1793717982588.jpg',
      titleEn: 'Modern Ultrasound & Clinical Diagnostics',
      titleRu: 'Современный кабинет УЗИ и диагностики',
      titleKy: 'Заманбап УЗИ жана диагностика кабинети',
    },
  ];

  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  // Auto-advance loop every 4 seconds (within user requested 3-5s window)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % bgImages.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [bgImages.length]);

  return (
    <section 
      className="relative isolate overflow-hidden pt-10 pb-20 md:pt-16 md:pb-32 border-b border-[#e6e3e7] bg-stone-100"
      style={{ borderColor: '#e6e3e7' }}
    >
      
      {/* Dynamic 3-Image Cycling Loop clearly visible in isolated stacking context */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {bgImages.map((img, index) => {
          const isActive = index === currentBgIndex;
          return (
            <div
              key={img.url}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={img.url}
                alt={img.titleEn}
                className="w-full h-full object-cover object-center filter blur-[1px] brightness-[0.98] transform scale-102 transition-transform duration-[4000ms] ease-out"
              />
            </div>
          );
        })}
      </div>

      {/* Gentle readability gradient: ensures crystal clear text on left while clinic photos shine through */}
      <div 
        className="absolute inset-0 z-1 bg-gradient-to-r from-stone-50/92 via-stone-50/75 to-stone-50/20 md:to-transparent pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-2">
        
        {/* Top Clean Subtitle & Location Tag */}
        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-semibold text-stone-700 mb-6">
          <span className="text-[#EE5A24] font-bold tracking-wide uppercase">
            {t.hero.kicker}
          </span>
          <span className="text-stone-300" aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1 text-stone-600 font-medium">
            <MapPin className="w-3.5 h-3.5 text-stone-400" />
            {t.hero.taglineBadge}
          </span>
        </div>

        {/* Hero Value Statement */}
        <div className="max-w-3xl">
          <h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-stone-900 leading-[1.15] mb-6"
            style={{ textWrap: 'balance' }}
          >
            {t.hero.title}
          </h1>

          <p className="text-base sm:text-lg text-stone-800 leading-relaxed mb-8 max-w-2xl font-normal">
            {t.hero.subtitle}
          </p>

          {/* Primary Action Buttons: Prominent Noticeable Button to Services Page */}
          <div className="flex flex-wrap items-center gap-4 mb-4">
            
            {/* Noticeable Button to Services Page */}
            <button
              type="button"
              onClick={onNavigateToServices}
              className="inline-flex items-center justify-center gap-3 px-7 py-4 text-sm sm:text-base font-extrabold text-white bg-linear-to-r from-[#EE5A24] via-[#F58220] to-[#FDB913] hover:from-[#EA3725] hover:to-[#EE5A24] rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all active:scale-[0.98] cursor-pointer ring-4 ring-orange-500/20"
            >
              <Stethoscope className="w-5 h-5 text-white" />
              <span>Explore All Medical Services & Price Guide →</span>
            </button>

            {/* Quick WhatsApp Action */}
            <button
              type="button"
              onClick={onOpenBooking}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 text-sm sm:text-base font-bold text-stone-800 bg-white/90 backdrop-blur-xs hover:bg-white border border-stone-300 rounded-2xl transition-colors shadow-xs cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-[#EE5A24]" />
              <span>{t.hero.primaryBtn}</span>
            </button>

          </div>

          {/* Reassurance Micro-Copy */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-stone-700 pt-1">
            <div className="flex items-center gap-1.5 text-stone-900 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-[#EE5A24] shrink-0" />
              <span>{t.hero.reassuranceNotice}</span>
            </div>
            <div className="flex items-center gap-1.5 text-stone-700">
              <CalendarCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{t.hero.reassuranceProcess}</span>
            </div>
          </div>

          {/* Active 3-Image Loop Indicator Pills */}
          <div className="flex items-center gap-2.5 mt-8 bg-white/85 backdrop-blur-xs px-3.5 py-1.5 rounded-full inline-flex border border-stone-200/80 shadow-2xs">
            {bgImages.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentBgIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentBgIndex
                    ? 'w-7 bg-[#EE5A24]'
                    : 'w-2 bg-stone-300 hover:bg-stone-400'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
            <span className="text-[11px] font-semibold text-stone-800 ml-1">
              {currentLang === 'ru'
                ? bgImages[currentBgIndex].titleRu
                : currentLang === 'ky'
                  ? bgImages[currentBgIndex].titleKy
                  : bgImages[currentBgIndex].titleEn}
            </span>
          </div>
        </div>

        {/* Clean Credential Proof Strip */}
        <div className="mt-12 pt-8 border-t border-stone-200/90 grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 bg-white/75 backdrop-blur-xs rounded-2xl p-6">
          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-extrabold text-stone-900 tabular-nums">
              10+ Years
            </span>
            <span className="text-xs sm:text-sm font-medium text-stone-700 mt-1">
              {t.hero.stats.outreach}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-extrabold text-stone-900 tabular-nums">
              10 Specialists
            </span>
            <span className="text-xs sm:text-sm font-medium text-stone-700 mt-1">
              {t.hero.stats.specialists}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-extrabold text-stone-900 tabular-nums">
              6 Languages
            </span>
            <span className="text-xs sm:text-sm font-medium text-stone-700 mt-1">
              KY · RU · EN · DE · FR · ZH
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#EE5A24]">
              Direct Chat
            </span>
            <span className="text-xs sm:text-sm font-medium text-stone-700 mt-1">
              {t.hero.stats.queues}
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};

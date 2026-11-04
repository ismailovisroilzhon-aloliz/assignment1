/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Doctor, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { DOCTORS } from '../data/doctors';
import { Users, Globe, Briefcase, Calendar, Award, CheckCircle2, Shield } from 'lucide-react';

interface TeamSectionProps {
  currentLang: Language;
  onBookWithDoctor: (doctorId: string) => void;
  doctorsList?: Doctor[];
}

export const TeamSection: React.FC<TeamSectionProps> = ({
  currentLang,
  onBookWithDoctor,
  doctorsList = DOCTORS,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const t = TRANSLATIONS[currentLang];

  const filterTabs = [
    { id: 'all', label: t.team.filterAll },
    { id: 'pediatrics', label: t.team.filterPediatrics },
    { id: 'adult', label: t.team.filterAdult },
    { id: 'women', label: t.team.filterWomen },
    { id: 'diagnostics', label: t.team.filterDiagnostics },
  ];

  const filteredDoctors = doctorsList.filter((doc) => {
    if (filterCategory === 'all') return true;
    return doc.category === filterCategory;
  });

  return (
    <section id="team" className="py-16 md:py-24 bg-stone-100 border-b border-stone-200/80">
      {/* Container targeted by CSS selector 3: border-color: #4e4068 */}
      <div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-b border-[#4e4068]/20 pt-4 pb-4"
        style={{ borderColor: '#4e4068' }}
      >
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#EE5A24] mb-3">
            <Users className="w-4 h-4" />
            <span>{t.team.badge}</span>
          </div>
          <h2 
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight mb-4"
            style={{ textWrap: 'balance' }}
          >
            {t.team.title}
          </h2>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
            Real human faces, world-class training, and evidence-based clinical leadership. Our doctors consult in 6 languages and exchange international medical knowledge daily.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl mb-12 overflow-x-auto scrollbar-none w-fit">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilterCategory(tab.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                filterCategory === tab.id
                  ? 'bg-white text-stone-900 shadow-xs font-bold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Doctor Grid (Div 3 child) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDoctors.map((doc, idx) => {
            const name = currentLang === 'ru' ? doc.nameRu : currentLang === 'ky' ? doc.nameKy : doc.name;
            const title = currentLang === 'ru' ? doc.titleRu : currentLang === 'ky' ? doc.titleKy : doc.title;
            const specialty = currentLang === 'ru' ? doc.specialtyRu : currentLang === 'ky' ? doc.specialtyKy : doc.specialty;
            const bio = currentLang === 'ru' ? doc.bioRu : currentLang === 'ky' ? doc.bioKy : doc.bio;
            const experience = currentLang === 'ru' ? doc.experienceRu : currentLang === 'ky' ? doc.experienceKy : doc.experience;

            return (
              <div
                key={doc.id}
                className={`p-6 rounded-3xl bg-white border border-stone-200/90 hover:border-amber-400 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group ${
                  idx === 0 ? 'border-amber-400/80 ring-1 ring-amber-400/20' : ''
                }`}
              >
                <div>
                  {/* Doctor Real Photo with Visual Prominence */}
                  <div className="flex items-start gap-4 mb-5">
                    <div className="relative shrink-0">
                      <img
                        src={doc.image}
                        alt={doc.name}
                        referrerPolicy="no-referrer"
                        className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover object-top border-2 border-white shadow-md group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          // Fallback if image path has issue
                          const target = e.currentTarget;
                          target.style.display = 'none';
                        }}
                      />
                      {doc.isAvailableToday && (
                        <div 
                          className="absolute -bottom-1.5 -right-1.5 bg-emerald-600 text-white p-1 rounded-full border-2 border-white shadow-xs"
                          title="In Clinic Today"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0">
                      <span className="text-[11px] font-bold text-[#EE5A24] uppercase tracking-wider block mb-0.5">
                        {doc.isAvailableToday ? '● In Clinic Today' : 'Scheduled Appointments'}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-stone-900 leading-snug group-hover:text-[#EE5A24] transition-colors">
                        {name}
                      </h3>
                      <p className="text-xs text-stone-600 mt-0.5">
                        {title}
                      </p>
                      
                      {/* Education badge for authority bias */}
                      {doc.education && (
                        <div className="mt-2 text-[11px] font-medium text-stone-500 bg-white/90 px-2 py-1 rounded-md border border-stone-200/70 inline-block line-clamp-1">
                          {doc.education}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Specialty Focus Tag */}
                  <div className="mb-3 text-xs font-semibold text-stone-700 bg-stone-200/50 px-3 py-1 rounded-lg inline-block">
                    {specialty}
                  </div>

                  {/* Concise 2-sentence bio */}
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6">
                    {bio}
                  </p>

                  {/* Authority & Experience Metadata */}
                  <div className="space-y-2 pt-3 border-t border-stone-200/70 text-xs text-stone-500 mb-6">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span>
                        <strong className="text-stone-800">{t.team.experienceLabel}:</strong> {experience}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Globe className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span>
                        <strong className="text-stone-800">{t.team.languagesLabel}:</strong> {doc.languages.join(' · ')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Action: Direct Booking with WhatsApp reassurance */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => onBookWithDoctor(doc.id)}
                    className="w-full py-3 px-4 text-xs font-bold text-stone-900 bg-white hover:bg-[#EE5A24] hover:text-white border border-stone-300 hover:border-[#EE5A24] rounded-xl shadow-2xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Consultation with {doc.name.split(' ')[1] || 'Doctor'}</span>
                  </button>
                  <span className="text-[10px] text-stone-400 text-center block mt-1.5">
                    Schedule and details confirmed directly on WhatsApp
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

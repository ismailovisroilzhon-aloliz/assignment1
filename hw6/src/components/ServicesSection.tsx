/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Language, MedicalService } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { MEDICAL_SERVICES } from '../data/services';
import { fuzzySearchServices } from '../utils/fuzzySearch';
import { 
  Activity, 
  Search, 
  Check, 
  QrCode, 
  ArrowRight,
  Tag,
  Sparkles,
  X
} from 'lucide-react';

interface ServicesSectionProps {
  currentLang: Language;
  onSelectService: (serviceId: string) => void;
  onViewPriceList: () => void;
  servicesList?: MedicalService[];
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  currentLang,
  onSelectService,
  onViewPriceList,
  servicesList = MEDICAL_SERVICES,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const t = TRANSLATIONS[currentLang];

  const categories = [
    { id: 'all', label: t.services.allCategory },
    { id: 'consultation', label: t.services.consultationCat },
    { id: 'diagnostics', label: t.services.diagnosticsCat },
    { id: 'maternity', label: t.services.maternityCat },
    { id: 'documents', label: t.services.documentsCat },
  ];

  // Apply resilient fuzzy matching with typo tolerance
  const searchedServices = searchQuery.trim()
    ? fuzzySearchServices(servicesList, searchQuery, currentLang)
    : servicesList;

  // Filter by category if one is active
  const filteredServices = searchedServices.filter((service) => {
    return selectedCategory === 'all' || service.category === selectedCategory;
  });

  return (
    <section 
      id="services" 
      className="py-16 md:py-24 bg-stone-50 border-b border-[#e3e3e7]"
      style={{ borderColor: '#e3e3e7' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#EE5A24] mb-3">
              <Activity className="w-4 h-4" />
              <span>{t.services.badge}</span>
            </div>
            <h2 
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight mb-4"
              style={{ textWrap: 'balance' }}
            >
              {t.services.title}
            </h2>
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
              {t.services.subtitle}
            </p>
          </div>

          {/* Quick Price List Anchor */}
          <button
            type="button"
            onClick={onViewPriceList}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-stone-300 hover:border-stone-900 text-stone-800 font-bold text-xs shadow-2xs transition-colors shrink-0 cursor-pointer"
          >
            <Tag className="w-4 h-4 text-[#EE5A24]" />
            <span>Open Complete Price Schedule (Прайс-лист)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Filter Controls & Resilient Fuzzy Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-200/80 rounded-xl overflow-x-auto scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Typo-Tolerant Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search (e.g. 'ultrsound', 'астма', 'uzi')..."
              className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm bg-white border border-stone-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#EE5A24]/40 focus:border-[#EE5A24] transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Search Feedback: Closest Match Notice */}
        {searchQuery.trim() !== '' && (
          <div className="mb-6 flex items-center justify-between p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#EE5A24] shrink-0" />
              <span>
                Matching closest services for <strong>"{searchQuery}"</strong> (with automatic typo tolerance):
              </span>
            </div>
            <span className="font-semibold text-stone-600">
              {filteredServices.length} {filteredServices.length === 1 ? 'match' : 'matches'}
            </span>
          </div>
        )}

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service, idx) => {
            const title = currentLang === 'ru' ? service.titleRu : currentLang === 'ky' ? service.titleKy : service.title;
            const desc = currentLang === 'ru' ? service.descriptionRu : currentLang === 'ky' ? service.descriptionKy : service.description;
            const badge = currentLang === 'ru' ? service.badgeRu : currentLang === 'ky' ? service.badgeKy : service.badge;
            const features = service.keyFeatures[currentLang] || service.keyFeatures.en;

            return (
              <div
                key={service.id}
                className={`p-6 rounded-3xl bg-white border border-stone-200/90 hover:border-amber-400 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group ${
                  searchQuery && idx === 0 ? 'ring-2 ring-[#EE5A24]/30 border-[#EE5A24]' : ''
                }`}
              >
                <div>
                  {/* Category Tag & Badge */}
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-3">
                    <span className="font-semibold uppercase tracking-wider text-amber-800 text-[11px]">
                      {service.category}
                    </span>
                    {badge && (
                      <span className="text-[11px] font-bold text-stone-700 bg-stone-100 px-2.5 py-0.5 rounded-md">
                        {badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-stone-900 mb-2 group-hover:text-[#EE5A24] transition-colors">
                    {title}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                    {desc}
                  </p>

                  {/* Symptom Tags for Clarity */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {service.symptoms.map((sym, i) => (
                      <span key={i} className="text-[10px] font-medium text-stone-500 bg-stone-100 px-2 py-0.5 rounded-md">
                        {sym}
                      </span>
                    ))}
                  </div>

                  {/* Key Highlights */}
                  <ul className="space-y-2 mb-6">
                    {features.map((feature, idx2) => (
                      <li key={idx2} className="flex items-start gap-2 text-xs text-stone-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-stone-400 block font-semibold">
                      Exact Fee
                    </span>
                    <span className="text-sm font-extrabold text-stone-900 tabular-nums">
                      {service.priceEstimate}
                    </span>
                    <span className="text-[10px] text-stone-400 block font-mono">
                      WhatsApp scheduling
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectService(service.id)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-stone-900 hover:bg-[#EE5A24] rounded-xl transition-colors cursor-pointer"
                  >
                    <span>{t.services.bookThisService}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Partnered Lab Feature */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-stone-200/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <QrCode className="w-8 h-8 text-stone-700 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-stone-900">
                Partnered Laboratory Room (Express Plus)
              </h4>
              <p className="text-xs text-stone-600 mt-0.5">
                Convenient on-site collection room. Patients receive partner terms and secure results delivered via private SMS/QR code lookup.
              </p>
            </div>
          </div>

          <div className="text-xs font-mono text-stone-500 whitespace-nowrap bg-stone-100 px-3 py-1.5 rounded-lg">
            Turnaround: 1 Business Day
          </div>
        </div>

      </div>
    </section>
  );
};

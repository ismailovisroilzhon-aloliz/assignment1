/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Language, MedicalService } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { MEDICAL_SERVICES } from '../data/services';
import { Search, ShieldCheck, Clock, ArrowRight, MessageSquare, Check, Sparkles } from 'lucide-react';

interface PriceListSectionProps {
  currentLang: Language;
  onBookService: (serviceId: string) => void;
  servicesList?: MedicalService[];
}

export const PriceListSection: React.FC<PriceListSectionProps> = ({
  currentLang,
  onBookService,
  servicesList = MEDICAL_SERVICES,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const t = TRANSLATIONS[currentLang];

  const categories = [
    { id: 'all', label: 'All Procedures (Все услуги)' },
    { id: 'consultation', label: 'Doctor Consultations' },
    { id: 'diagnostics', label: 'Diagnostics & Ultrasound' },
    { id: 'maternity', label: 'Maternal & Doula Care' },
    { id: 'documents', label: 'Official Certificates' },
  ];

  const filteredItems = servicesList.filter((item) => {
    const matchesCat = categoryFilter === 'all' || item.category === categoryFilter;
    const title = currentLang === 'ru' ? item.titleRu : currentLang === 'ky' ? item.titleKy : item.title;
    const desc = currentLang === 'ru' ? item.descriptionRu : currentLang === 'ky' ? item.descriptionKy : item.description;

    const matchesSearch =
      searchTerm.trim() === '' ||
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.symptoms.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesCat && matchesSearch;
  });

  return (
    <section id="pricelist" className="py-16 md:py-24 bg-white border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Radical Transparency Guarantee (Прайс-лист)</span>
          </div>
          <h2 
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight mb-4"
            style={{ textWrap: 'balance' }}
          >
            Clear, Itemized Medical Pricing
          </h2>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
            No surprise fees, no hidden registration charges, and no unnecessary laboratory tests. You see exactly what you pay before stepping into the doctor's office.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl overflow-x-auto scrollbar-none">
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCategoryFilter(c.id)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                  categoryFilter === c.id
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search price list (e.g. УЗИ, ЭКГ, кашель)..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#EE5A24]/40 focus:border-[#EE5A24]"
            />
          </div>
        </div>

        {/* Price List Table */}
        <div className="border border-stone-200 rounded-2xl overflow-hidden shadow-2xs bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-stone-50 text-[11px] font-bold uppercase tracking-wider text-stone-500 border-b border-stone-200">
                  <th className="py-4 px-6">Medical Service / Consultation</th>
                  <th className="py-4 px-4">Duration</th>
                  <th className="py-4 px-4">Standard Clinical Fee</th>
                  <th className="py-4 px-6 text-right">Booking Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-150 text-xs sm:text-sm">
                {filteredItems.map((item) => {
                  const title =
                    currentLang === 'ru' ? item.titleRu : currentLang === 'ky' ? item.titleKy : item.title;
                  const desc =
                    currentLang === 'ru'
                      ? item.descriptionRu
                      : currentLang === 'ky'
                        ? item.descriptionKy
                        : item.description;

                  return (
                    <tr key={item.id} className="hover:bg-amber-50/20 transition-colors group">
                      <td className="py-4 px-6">
                        <div className="font-bold text-stone-900 mb-1 group-hover:text-[#EE5A24] transition-colors">
                          {title}
                        </div>
                        <p className="text-xs text-stone-500 line-clamp-2 max-w-xl">
                          {desc}
                        </p>
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap text-stone-600 font-mono text-xs">
                        <span className="inline-flex items-center gap-1 bg-stone-100 px-2 py-1 rounded-md text-[11px]">
                          <Clock className="w-3.5 h-3.5 text-stone-400" />
                          Consultation & Care
                        </span>
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="font-extrabold text-stone-900 tabular-nums text-sm sm:text-base">
                          {item.priceEstimate}
                        </span>
                        <span className="text-[11px] text-stone-400 block font-normal">
                          Fixed line-item
                        </span>
                      </td>

                      <td className="py-4 px-6 text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => onBookService(item.id)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-stone-900 hover:bg-[#EE5A24] rounded-xl transition-colors cursor-pointer"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Book Slot</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Reassurance Footer */}
        <div className="mt-8 p-4 rounded-xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-stone-600 gap-3">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span><strong>Transparent Scheduling:</strong> Submit your request online, and our receptionist will confirm your visit details and timing directly via WhatsApp.</span>
          </div>
          <span className="font-mono text-stone-400 shrink-0">
            Payment accepted: Cash, Elcard, MBank, Visa
          </span>
        </div>

      </div>
    </section>
  );
};

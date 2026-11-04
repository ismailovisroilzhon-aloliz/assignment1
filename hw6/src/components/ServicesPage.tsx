/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Language, MedicalService } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { ServicesSection } from './ServicesSection';
import { PriceListSection } from './PriceListSection';
import { AboutSection } from './AboutSection';
import { CorporateAndEducationSection } from './CorporateAndEducationSection';
import { MobileClinicsSection } from './MobileClinicsSection';
import { ArrowLeft, Stethoscope, Tag, Compass, Building2, Truck, MessageSquare } from 'lucide-react';

interface ServicesPageProps {
  currentLang: Language;
  onBackToWelcome: () => void;
  onOpenBooking: (doctorId?: string, serviceId?: string) => void;
  services: MedicalService[];
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  currentLang,
  onBackToWelcome,
  onOpenBooking,
  services,
}) => {
  const t = TRANSLATIONS[currentLang];

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      
      {/* Top Breadcrumb & Page Banner */}
      <div className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-b border-stone-200 py-3.5 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          
          <button
            type="button"
            onClick={onBackToWelcome}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Welcome Page</span>
          </button>

          {/* Quick Anchor Navigation */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
            <button
              type="button"
              onClick={() => handleScrollToSection('services')}
              className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold whitespace-nowrap cursor-pointer"
            >
              Services Catalog
            </button>
            <button
              type="button"
              onClick={() => handleScrollToSection('pricelist')}
              className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold whitespace-nowrap cursor-pointer"
            >
              Price List (Прайс-лист)
            </button>
            <button
              type="button"
              onClick={() => handleScrollToSection('about')}
              className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold whitespace-nowrap cursor-pointer"
            >
              Evidence-Based Care
            </button>
            <button
              type="button"
              onClick={() => handleScrollToSection('outreach')}
              className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold whitespace-nowrap cursor-pointer"
            >
              Mobile Outreaches
            </button>
          </div>

          {/* WhatsApp Direct CTA */}
          <button
            type="button"
            onClick={() => onOpenBooking()}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#EE5A24] hover:bg-[#EA3725] text-white font-bold text-xs shadow-xs transition-colors cursor-pointer whitespace-nowrap"
          >
            <MessageSquare className="w-3.5 h-3.5 fill-white/20" />
            <span>Book via WhatsApp</span>
          </button>

        </div>
      </div>

      {/* Hero Intro Header for Services */}
      <div className="bg-gradient-to-b from-white to-stone-50 py-12 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#EE5A24] block mb-2">
              Comprehensive Clinical Guide
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mb-4">
              Medical Services, Line-Item Pricing & Clinical Protocols
            </h1>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              Explore our full catalog of outpatient medical care, diagnostics, maternal services, and transparent fees. Every consultation is conducted by experienced Swiss and Kyrgyz physicians without unnecessary polypharmacy.
            </p>
          </div>
        </div>
      </div>

      {/* 1. Services Catalog with Typo-Tolerant Search */}
      <ServicesSection
        currentLang={currentLang}
        servicesList={services}
        onSelectService={(serviceId) => onOpenBooking(undefined, serviceId)}
        onViewPriceList={() => handleScrollToSection('pricelist')}
      />

      {/* 2. Full Searchable Price List (Прайс-лист) */}
      <PriceListSection
        currentLang={currentLang}
        servicesList={services}
        onBookService={(serviceId) => onOpenBooking(undefined, serviceId)}
      />

      {/* 3. Evidence-Based Medicine & Clinic History */}
      <AboutSection currentLang={currentLang} />

      {/* 4. Corporate Partnerships & Medical Education */}
      <CorporateAndEducationSection
        currentLang={currentLang}
        onOpenBooking={() => onOpenBooking()}
      />

      {/* 5. Mobile Clinics & Regional Charitable Outreach */}
      <MobileClinicsSection
        currentLang={currentLang}
        onOpenBooking={() => onOpenBooking()}
      />

    </div>
  );
};

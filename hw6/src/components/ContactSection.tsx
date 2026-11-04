/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { 
  MapPin, 
  Clock, 
  Phone, 
  MessageSquare, 
  HelpCircle, 
  ChevronDown, 
  Car, 
  Bus, 
  ExternalLink,
  Navigation
} from 'lucide-react';

interface ContactSectionProps {
  currentLang: Language;
  onOpenBooking: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  currentLang,
  onOpenBooking,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const t = TRANSLATIONS[currentLang];

  // Coordinates for MercyMed in Tunguch near Ayu Grand & Ala-Too University
  const googleMapEmbedUrl = "https://maps.google.com/maps?q=Ayu+Grand+Comfort+Mall,+Ankara+Street,+Bishkek,+Kyrgyzstan&t=&z=15&ie=UTF8&iwloc=&output=embed";

  return (
    <section id="contact" className="py-16 md:py-24 bg-stone-50 border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#EE5A24] mb-3">
            <MapPin className="w-4 h-4" />
            <span>{t.contact.badge}</span>
          </div>
          <h2 
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight mb-4"
            style={{ textWrap: 'balance' }}
          >
            {t.contact.title}
          </h2>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
            {t.contact.subtitle}
          </p>
        </div>

        {/* 2-Column Contact Info & Real Interactive Google Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Address */}
            <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#EE5A24] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-stone-900 mb-1">
                    {t.contact.addressLabel}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {t.contact.addressVal}
                  </p>
                  <p className="text-[11px] text-stone-400 mt-2">
                    Directly opposite Ayu Grand Mall & Ala-Too International University
                  </p>
                </div>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-stone-900 mb-1">
                    {t.contact.hoursLabel}
                  </h3>
                  <div className="text-xs sm:text-sm text-stone-600 whitespace-pre-line leading-relaxed font-mono">
                    {t.contact.hoursVal}
                  </div>
                  <span className="text-[11px] text-stone-400 italic mt-2 block">
                    {t.contact.hoursDisclaimer}
                  </span>
                </div>
              </div>
            </div>

            {/* Receptionist Connection */}
            <div className="p-6 rounded-2xl bg-stone-900 text-white shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">
                    Direct Clinic Reception (WhatsApp)
                  </h3>
                  <p className="text-xs text-stone-300 mb-4 leading-relaxed">
                    Fastest way to book or ask a question. Receptionist answers directly within 15 minutes.
                  </p>
                  <button
                    type="button"
                    onClick={onOpenBooking}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-linear-to-r from-[#EE5A24] to-[#F58220] hover:from-[#EA3725] hover:to-[#EE5A24] text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 fill-white/20" />
                    <span>Message Receptionist on WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Real Google Maps Component with Indicator */}
          <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-white border border-stone-200 shadow-2xs">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-[#EE5A24]" />
                  <span>Real Google Maps: MercyMed Center Location</span>
                </h3>
                <span className="text-xs font-semibold text-stone-500">
                  Tunguch · Eastern Bishkek
                </span>
              </div>

              {/* Embedded Real Google Maps Iframe with Center Pin */}
              <div className="relative h-80 w-full rounded-2xl border border-stone-200 overflow-hidden mb-6 shadow-xs">
                <iframe
                  title="MercyMed Medical Center Google Map Location"
                  src={googleMapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />

                {/* Floating Pin Indicator Overlay */}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-stone-200 text-[11px] font-bold text-stone-800 shadow-sm flex items-center gap-2 pointer-events-none">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EE5A24] animate-pulse" />
                  <span>MercyMed Clinic (Near Ayu Grand)</span>
                </div>
              </div>

              {/* Transit & Parking Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-stone-50 border border-stone-200">
                  <Car className="w-4 h-4 text-[#EE5A24] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-800 block">By Automobile</strong>
                    <span className="text-stone-500">Free patient parking directly in front of the medical clinic entrance.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-stone-50 border border-stone-200">
                  <Bus className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-800 block">Public Minibus & Bus</strong>
                    <span className="text-stone-500">Direct stops on Ankara St. within 3 minutes walking distance.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-500">
              <span>Coordinates: 42.8584° N, 74.6889° E</span>
              <div className="flex items-center gap-3">
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Ayu+Grand+Comfort+Mall+Bishkek" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-[#EE5A24] font-bold hover:underline inline-flex items-center gap-1"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <span>·</span>
                <a 
                  href="https://2gis.kg/bishkek" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-stone-700 font-bold hover:underline inline-flex items-center gap-1"
                >
                  <span>2GIS Bishkek</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* FAQ Accordion Section */}
        <div className="pt-12 border-t border-stone-200/90 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#EE5A24] mb-2">
              <HelpCircle className="w-4 h-4" />
              <span>{t.faq.badge}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
              {t.faq.title}
            </h2>
          </div>

          <div className="space-y-3">
            {t.faq.items.map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-xl border border-stone-200 bg-white overflow-hidden transition-all shadow-2xs"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-stone-900 hover:text-[#EE5A24] transition-colors"
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-stone-400 transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180 text-[#EE5A24]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 bg-stone-50/50">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

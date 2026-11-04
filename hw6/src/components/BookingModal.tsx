/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Language, BookingFormData, Doctor, MedicalService } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { DOCTORS } from '../data/doctors';
import { MEDICAL_SERVICES } from '../data/services';
import { X, MessageSquare, Check, ShieldCheck, Copy, ExternalLink, AlertTriangle } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  initialDoctorId?: string;
  initialServiceId?: string;
  onBookingSubmitted?: (booking: BookingFormData) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  initialDoctorId,
  initialServiceId,
  onBookingSubmitted,
}) => {
  const t = TRANSLATIONS[currentLang];

  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    dateOfBirth: '',
    phone: '',
    doctorId: initialDoctorId || '',
    serviceId: initialServiceId || '',
    preferredDate: '',
    preferredTime: 'morning',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    if (initialDoctorId) {
      setFormData((prev) => ({ ...prev, doctorId: initialDoctorId }));
    }
  }, [initialDoctorId]);

  useEffect(() => {
    if (initialServiceId) {
      setFormData((prev) => ({ ...prev, serviceId: initialServiceId }));
    }
  }, [initialServiceId]);

  if (!isOpen) return null;

  // Selected Doctor & Service for formatting
  const selectedDoctor = DOCTORS.find((d) => d.id === formData.doctorId);
  const selectedService = MEDICAL_SERVICES.find((s) => s.id === formData.serviceId);

  const doctorName = selectedDoctor 
    ? (currentLang === 'ru' ? selectedDoctor.nameRu : currentLang === 'ky' ? selectedDoctor.nameKy : selectedDoctor.name)
    : (formData.doctorId === '' ? t.bookingModal.doctorAny : 'General Doctor');

  const serviceName = selectedService
    ? (currentLang === 'ru' ? selectedService.titleRu : currentLang === 'ky' ? selectedService.titleKy : selectedService.title)
    : 'General Consultation';

  // Construct structured WhatsApp message for reception
  const waMessage = 
`*MercyMed Clinic Appointment Request*
• Patient Name: ${formData.fullName.trim() || '[Name not provided]'}
• Date of Birth: ${formData.dateOfBirth.trim() || '[DOB not provided]'}
• Phone: ${formData.phone.trim() || '[Phone not provided]'}
• Doctor: ${doctorName}
• Service: ${serviceName}
• Preferred Date: ${formData.preferredDate || 'Earliest available'}
• Preferred Time: ${formData.preferredTime}
${formData.notes ? `• Patient Notes: ${formData.notes.trim()}` : ''}
_(Sent via MercyMed official web portal prototype)_`;

  const waEncodedUrl = `https://wa.me/?text=${encodeURIComponent(waMessage)}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      setValidationError('Please enter both Full Name and Phone Number to request an appointment.');
      return;
    }
    setValidationError(null);
    setSubmitted(true);
    if (onBookingSubmitted) {
      onBookingSubmitted(formData);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(waMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="px-6 py-4 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-100 text-[#EE5A24] flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-stone-900 leading-tight">
                {t.bookingModal.title}
              </h2>
              <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full inline-block mt-0.5">
                Interactive Prototype · WhatsApp Flow
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition-colors"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto space-y-5">
          
          {/* PRD Prototype Boundary Banner */}
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              {t.bookingModal.prototypeNotice}
            </p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {validationError && (
                <div className="p-3 rounded-lg bg-red-50 text-red-700 text-xs font-semibold">
                  {validationError}
                </div>
              )}

              {/* Full Name & DOB */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {t.bookingModal.nameLabel} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder={t.bookingModal.namePlaceholder}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#EE5A24]/40 focus:border-[#EE5A24]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {t.bookingModal.dobLabel}
                  </label>
                  <input
                    type="text"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    placeholder={t.bookingModal.dobPlaceholder}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#EE5A24]/40 focus:border-[#EE5A24]"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {t.bookingModal.phoneLabel} <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder={t.bookingModal.phonePlaceholder}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#EE5A24]/40 focus:border-[#EE5A24]"
                />
              </div>

              {/* Doctor Selection */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {t.bookingModal.doctorLabel}
                </label>
                <select
                  value={formData.doctorId}
                  onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#EE5A24]/40 focus:border-[#EE5A24]"
                >
                  <option value="">{t.bookingModal.doctorAny}</option>
                  {DOCTORS.map((doc) => {
                    const docTitle = currentLang === 'ru' ? doc.titleRu : currentLang === 'ky' ? doc.titleKy : doc.title;
                    const docName = currentLang === 'ru' ? doc.nameRu : currentLang === 'ky' ? doc.nameKy : doc.name;
                    return (
                      <option key={doc.id} value={doc.id}>
                        {docName} ({docTitle})
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* Service Selection */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {t.bookingModal.serviceLabel}
                </label>
                <select
                  value={formData.serviceId}
                  onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#EE5A24]/40 focus:border-[#EE5A24]"
                >
                  <option value="">General Consultation / Check-up</option>
                  {MEDICAL_SERVICES.map((serv) => {
                    const servTitle = currentLang === 'ru' ? serv.titleRu : currentLang === 'ky' ? serv.titleKy : serv.title;
                    return (
                      <option key={serv.id} value={serv.id}>
                        {servTitle} ({serv.priceEstimate})
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* Date & Time Preferences */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {t.bookingModal.dateLabel}
                  </label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#EE5A24]/40 focus:border-[#EE5A24]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {t.bookingModal.timeLabel}
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#EE5A24]/40 focus:border-[#EE5A24]"
                  >
                    <option value="morning">{t.bookingModal.timeMorning}</option>
                    <option value="afternoon">{t.bookingModal.timeAfternoon}</option>
                    <option value="late">{t.bookingModal.timeLate}</option>
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {t.bookingModal.notesLabel}
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder={t.bookingModal.notesPlaceholder}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#EE5A24]/40 focus:border-[#EE5A24]"
                />
              </div>

              {/* Form Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-xl transition-colors"
                >
                  {t.bookingModal.cancelBtn}
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-linear-to-r from-[#EE5A24] to-[#F58220] hover:from-[#EA3725] hover:to-[#EE5A24] rounded-xl shadow-xs transition-all"
                >
                  <MessageSquare className="w-4 h-4 fill-white/20" />
                  <span>{t.bookingModal.submitBtn}</span>
                </button>
              </div>
            </form>
          ) : (
            /* Confirmation and WhatsApp Launch View */
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-emerald-950">
                    {t.bookingModal.successTitle}
                  </h3>
                  <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                    {t.bookingModal.successDesc}
                  </p>
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-stone-700 block mb-1.5">
                  {t.bookingModal.whatsappPreviewHeader}
                </span>
                <pre className="p-4 rounded-xl bg-stone-900 text-stone-200 text-xs font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto border border-stone-800">
                  {waMessage}
                </pre>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={waEncodedUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors flex-1"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>{t.bookingModal.openNowBtn}</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied!' : t.bookingModal.copyBtn}</span>
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-3 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-700 font-semibold text-xs transition-colors"
                >
                  {t.bookingModal.cancelBtn}
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

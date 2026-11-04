/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'en' | 'ru' | 'ky';

export interface Doctor {
  id: string;
  name: string;
  nameRu: string;
  nameKy: string;
  title: string;
  titleRu: string;
  titleKy: string;
  specialty: string;
  specialtyRu: string;
  specialtyKy: string;
  category: 'pediatrics' | 'adult' | 'women' | 'diagnostics';
  languages: string[];
  bio: string;
  bioRu: string;
  bioKy: string;
  experience: string;
  experienceRu: string;
  experienceKy: string;
  image: string;
  education?: string;
  isAvailableToday?: boolean;
}

export interface MedicalService {
  id: string;
  title: string;
  titleRu: string;
  titleKy: string;
  category: 'consultation' | 'diagnostics' | 'preventative' | 'maternity' | 'documents';
  description: string;
  descriptionRu: string;
  descriptionKy: string;
  priceEstimate: string;
  exactPriceKgs: number;
  durationMinutes: number;
  badge?: string;
  badgeRu?: string;
  badgeKy?: string;
  symptoms: string[];
  keyFeatures: {
    en: string[];
    ru: string[];
    ky: string[];
  };
}

export interface ClinicAnnouncement {
  id: string;
  title: string;
  titleRu: string;
  titleKy: string;
  date: string;
  tag: string;
  tagRu: string;
  tagKy: string;
  content: string;
  contentRu: string;
  contentKy: string;
  active: boolean;
}

export interface BookingFormData {
  fullName: string;
  dateOfBirth: string;
  phone: string;
  doctorId: string;
  serviceId: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
}

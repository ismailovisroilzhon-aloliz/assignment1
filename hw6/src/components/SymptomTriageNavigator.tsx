/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Language, MedicalService, Doctor } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { DOCTORS } from '../data/doctors';
import { MEDICAL_SERVICES } from '../data/services';
import { 
  HeartHandshake, 
  Clock, 
  DollarSign, 
  MessageSquare, 
  Check, 
  HelpCircle,
  ArrowRight
} from 'lucide-react';

interface SymptomTriageNavigatorProps {
  currentLang: Language;
  onOpenBooking: (doctorId?: string, serviceId?: string) => void;
}

interface SymptomOption {
  id: string;
  labelEn: string;
  labelRu: string;
  labelKy: string;
  icon: string;
  recommendedDoctorId: string;
  serviceId: string;
  clarityNoteEn: string;
  clarityNoteRu: string;
  clarityNoteKy: string;
}

export const SymptomTriageNavigator: React.FC<SymptomTriageNavigatorProps> = ({
  currentLang,
  onOpenBooking,
}) => {
  const t = TRANSLATIONS[currentLang];

  const symptomOptions: SymptomOption[] = [
    {
      id: 'fever-cough',
      labelEn: 'Child Fever or Cough',
      labelRu: 'Температура или кашель у ребенка',
      labelKy: 'Баланын дене табы же жөтөлү',
      icon: '🤒',
      recommendedDoctorId: 'dr-lukas-meyer-landolt',
      serviceId: 'pediatric-consultation',
      clarityNoteEn: 'Careful clinical check without unnecessary antibiotics or cocktail vitamins. Fast relief guidance.',
      clarityNoteRu: 'Осмотр без назначения лишних антибиотиков и фуфломицинов. Рациональное лечение вирусных инфекций.',
      clarityNoteKy: 'Ашыкча антибиотиктерсиз жана пайдасыз витаминдерсиз текшерүү. Сасык тумоону далилдүү дарылоо.',
    },
    {
      id: 'infant-checkup',
      labelEn: 'Infant Growth & Milestones',
      labelRu: 'Плановый осмотр малыша (0–12 мес)',
      labelKy: 'Ымыркайды пландуу кароо (0–12 ай)',
      icon: '👶',
      recommendedDoctorId: 'dr-jonathan-williams',
      serviceId: 'pediatric-consultation',
      clarityNoteEn: 'Growth curves, nutrition, motor milestones, and gentle parent reassurance.',
      clarityNoteRu: 'Контроль набора веса, моторного развития, сна и прикорма в спокойной атмосфере.',
      clarityNoteKy: 'Салмакты, боюнун өсүшүн жана тамактануусун көзөмөлдөө.',
    },
    {
      id: 'pregnancy-doula',
      labelEn: 'Pregnancy & Birth Support (Doula)',
      labelRu: 'Беременность и подготовка к родам',
      labelKy: 'Кош бойлуулук жана төрөткө даярдык',
      icon: '🤰',
      recommendedDoctorId: 'mahabat-alieva',
      serviceId: 'maternity-doula',
      clarityNoteEn: 'Comfortable physiological birth coaching, partner preparation, and postpartum recovery.',
      clarityNoteRu: 'Мягкая подготовка к родам, техники дыхания, партнерские роды и послеродовой уход.',
      clarityNoteKy: 'Төрөткө жеңил даярдануу, дем алуу көнүгүүлөрү жана төрөттөн кийинки кам көрүү.',
    },
    {
      id: 'back-joint-pain',
      labelEn: 'Back Pain & Posture Issues',
      labelRu: 'Боль в спине, шее или суставах',
      labelKy: 'Белдин, моюндун же муундун оорушу',
      icon: '⚡',
      recommendedDoctorId: 'madison-smith',
      serviceId: 'physical-therapy',
      clarityNoteEn: 'Detailed musculoskeletal assessment and active exercise therapy without passive dependency.',
      clarityNoteRu: 'Оценка биомеханики позвоночника, снятие мышечных зажимов и индивидуальный комплекс ЛФК.',
      clarityNoteKy: 'Омуртканы түздөө, ооруну басуу жана атайын дарылоо көнүгүүлөрү.',
    },
    {
      id: 'breathing-asthma',
      labelEn: 'Prolonged Cough or Asthma',
      labelRu: 'Затяжной кашель или одышка',
      labelKy: 'Созулган жөтөл же дем кыгуу',
      icon: '🫁',
      recommendedDoctorId: 'dr-nasyikat-dononbaeva',
      serviceId: 'pulmonology-care',
      clarityNoteEn: 'Specialist diagnosis of lingering airway reactivity following international GINA standards.',
      clarityNoteRu: 'Пульмонологический осмотр, исключение бронхоспазма и подбор базисной терапии.',
      clarityNoteKy: 'Өпкөнү жана дем алуу органдарын текшерүү, дарылоо планын түзүү.',
    },
    {
      id: 'ultrasound-check',
      labelEn: 'Ultrasound Scan (Abdomen/Kidneys)',
      labelRu: 'УЗИ внутренних органов или почек',
      labelKy: 'Ички органдардын же бөйрөктүн УЗИси',
      icon: '🔍',
      recommendedDoctorId: 'dr-nargiza-islamova',
      serviceId: 'ultrasound-diagnostics',
      clarityNoteEn: 'High-resolution sonography with instant visual protocol and doctor explanation.',
      clarityNoteRu: 'Высокоточное УЗИ на современном аппарате с выдачей фотопротокола в день обращения.',
      clarityNoteKy: 'Заманбап аппарат менен жогорку тактыктагы УЗИ изилдөөсү.',
    },
    {
      id: 'lab-bloodwork',
      labelEn: 'Lab Tests & Bloodwork',
      labelRu: 'Сдать анализы крови или мочи',
      labelKy: 'Кан жана заара анализдерин тапшыруу',
      icon: '🩸',
      recommendedDoctorId: 'dr-irina-pak',
      serviceId: 'partner-laboratory-express',
      clarityNoteEn: 'Procedural room inside the clinic (Express Plus partner) with private QR smartphone results.',
      clarityNoteRu: 'Процедурный кабинет в клинике (партнер Express Plus), результаты онлайн по личному QR-коду.',
      clarityNoteKy: 'Клиникадагы процедуралык бөлмө, жыйынтыктар телефонго жеке QR-код менен жөнөтүлөт.',
    },
    {
      id: 'school-travel-cert',
      labelEn: 'School Form or Travel Certificate',
      labelRu: 'Справка в школу, вуз или для полета',
      labelKy: 'Мектепке, ЖОЖго же учууга справка',
      icon: '📋',
      recommendedDoctorId: 'dr-irina-pak',
      serviceId: 'medical-certificates',
      clarityNoteEn: 'Bilingual certified documentation for schools, AUCA, and airline fit-to-fly clearance.',
      clarityNoteRu: 'Официальное заключение на русском или английском для школ, АУЦА и авиаперелетов.',
      clarityNoteKy: 'Орус жана англис тилдеринде расмий берилүүчү медициналык справкалар.',
    },
  ];

  const [activeSymptomId, setActiveSymptomId] = useState<string>(symptomOptions[0].id);

  const selectedSymptom = symptomOptions.find((s) => s.id === activeSymptomId) || symptomOptions[0];
  const matchedDoctor = DOCTORS.find((d) => d.id === selectedSymptom.recommendedDoctorId);
  const matchedService = MEDICAL_SERVICES.find((s) => s.id === selectedSymptom.serviceId);

  const doctorName = matchedDoctor
    ? currentLang === 'ru'
      ? matchedDoctor.nameRu
      : currentLang === 'ky'
        ? matchedDoctor.nameKy
        : matchedDoctor.name
    : 'MercyMed Specialist';

  const doctorTitle = matchedDoctor
    ? currentLang === 'ru'
      ? matchedDoctor.titleRu
      : currentLang === 'ky'
        ? matchedDoctor.titleKy
        : matchedDoctor.title
    : '';

  const serviceTitle = matchedService
    ? currentLang === 'ru'
      ? matchedService.titleRu
      : currentLang === 'ky'
        ? matchedService.titleKy
        : matchedService.title
    : '';

  const clarityNote =
    currentLang === 'ru'
      ? selectedSymptom.clarityNoteRu
      : currentLang === 'ky'
        ? selectedSymptom.clarityNoteKy
        : selectedSymptom.clarityNoteEn;

  return (
    <div className="w-full bg-white/98 backdrop-blur-md rounded-3xl border border-stone-200/90 shadow-xl shadow-stone-900/8 p-6 sm:p-8 -mt-8 sm:-mt-12 md:-mt-14 relative z-20 transition-all duration-300">
      
      {/* Reassurance Header */}
      <div className="max-w-2xl mb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-[#EE5A24] block mb-1">
          {t.hero.symptomTitle}
        </span>
        <p className="text-xs sm:text-sm text-stone-600">
          {t.hero.symptomSubtitle}
        </p>
      </div>

      {/* Symptom Selection Buttons */}
      <div className="flex flex-wrap gap-2 mb-8">
        {symptomOptions.map((opt) => {
          const label =
            currentLang === 'ru' ? opt.labelRu : currentLang === 'ky' ? opt.labelKy : opt.labelEn;
          const isActive = opt.id === activeSymptomId;

          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => setActiveSymptomId(opt.id)}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'bg-stone-900 text-white shadow-xs scale-[1.02]'
                  : 'bg-stone-100/80 text-stone-700 hover:bg-stone-200/70 border border-stone-200/60'
              }`}
            >
              <span>{opt.icon}</span>
              <span>{label}</span>
            </button>
          );
        })}
      </div>

      {/* Resolved Triage Recommendation Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-stone-50 to-amber-50/40 border border-stone-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        
        {/* Doctor and Service Identity */}
        <div className="flex items-start gap-4">
          {matchedDoctor?.image && (
            <div className="relative shrink-0">
              <img
                src={matchedDoctor.image}
                alt={doctorName}
                referrerPolicy="no-referrer"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-white shadow-sm"
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white" title="Accepting patients" />
            </div>
          )}

          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 mb-1">
              <span className="font-semibold text-[#EE5A24]">{serviceTitle}</span>
              <span>·</span>
              <span className="inline-flex items-center gap-1 font-mono text-stone-700 font-bold">
                <Clock className="w-3.5 h-3.5 text-stone-400" />
                Direct Scheduling via WhatsApp
              </span>
            </div>

            <h4 className="text-base sm:text-lg font-bold text-stone-900">
              {doctorName}
            </h4>
            <p className="text-xs text-stone-600 mb-2">
              {doctorTitle} · {matchedDoctor?.experience}
            </p>

            <p className="text-xs text-stone-700 leading-relaxed max-w-lg bg-white/70 p-2.5 rounded-xl border border-stone-200/60">
              {clarityNote}
            </p>
          </div>
        </div>

        {/* Pricing and Action Control */}
        <div className="flex flex-col items-start md:items-end gap-3 shrink-0 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-stone-200">
          <div className="text-left md:text-right">
            <span className="text-[11px] uppercase tracking-wider text-stone-500 block font-semibold">
              Exact Consultation Fee
            </span>
            <span className="text-xl sm:text-2xl font-black text-stone-900 tabular-nums">
              {matchedService?.priceEstimate}
            </span>
            <span className="text-[11px] text-stone-400 block mt-0.5">
              Zero hidden charges · Direct doctor review
            </span>
          </div>

          <button
            type="button"
            onClick={() => onOpenBooking(matchedDoctor?.id, matchedService?.id)}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-linear-to-r from-[#EE5A24] to-[#F58220] hover:from-[#EA3725] hover:to-[#EE5A24] text-white font-bold text-xs sm:text-sm shadow-xs hover:shadow transition-all w-full md:w-auto cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 fill-white/20" />
            <span>Book with {doctorName.split(' ')[1] || 'Doctor'}</span>
          </button>
        </div>

      </div>

      {/* Psychological Reassurance Notice */}
      <div className="mt-4 pt-4 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-stone-500 gap-2">
        <div className="flex items-center gap-1.5 text-stone-600 font-medium">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{t.hero.reassuranceNotice}</span>
        </div>
        <span className="text-stone-400 text-[11px]">
          {t.hero.reassuranceProcess}
        </span>
      </div>

    </div>
  );
};

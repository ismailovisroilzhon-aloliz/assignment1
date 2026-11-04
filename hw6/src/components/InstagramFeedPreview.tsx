/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { Instagram, Play, ExternalLink, Heart, MessageCircle } from 'lucide-react';

interface InstagramFeedPreviewProps {
  currentLang: Language;
}

export const InstagramFeedPreview: React.FC<InstagramFeedPreviewProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang];

  const posts = [
    {
      id: 'p1',
      title: 'Pediatric Advice: What to do when your toddler has a sudden high fever',
      titleRu: 'Советы педиатра: что делать при высокой температуре у ребенка',
      titleKy: 'Педиатрдын кеңеши: баланын дене табы көтөрүлгөндө эмне кылуу керек',
      doctor: 'Dr. Lukas Meyer-Landolt',
      likes: '342',
      comments: '28',
      duration: '1:45 min',
      category: 'Evidence-Based Tips',
    },
    {
      id: 'p2',
      title: 'Doula Care: 3 essential breathing exercises for physiological labor',
      titleRu: 'Советы доулы: 3 дыхательных упражнения для мягких родов',
      titleKy: 'Доуланын кеңеши: жеңил төрөт үчүн 3 дем алуу көнүгүүсү',
      doctor: 'Mahabat Alieva (Doula)',
      likes: '489',
      comments: '41',
      duration: '2:10 min',
      category: 'Maternal Health',
    },
    {
      id: 'p3',
      title: 'Rational Prescribing: Why antibiotics do NOT work for common viral colds',
      titleRu: 'Рациональная медицина: почему антибиотики не лечат обычную простуду',
      titleKy: 'Далилдүү медицина: антибиотиктер эмне үчүн жөнөкөй сасык тумоону айыктырбайт',
      doctor: 'Dr. Jonathan Williams',
      likes: '512',
      comments: '37',
      duration: '1:30 min',
      category: 'Patient Education',
    },
    {
      id: 'p4',
      title: 'Mobile Clinic Highlights: Medical outreach mission to Naryn villages',
      titleRu: 'Кадры выездной клиники: благотворительный выезд врачей в Нарын',
      titleKy: 'Көчмө клиниканын кадрлары: Нарын облусундагы айылдарга медициналык жардам',
      doctor: 'MercyMed Team',
      likes: '620',
      comments: '53',
      duration: '3:05 min',
      category: 'Outreach Heart',
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-stone-100 border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#EE5A24] mb-2">
              <Instagram className="w-4 h-4" />
              <span>Community & Patient Education</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              Latest Video Tips from Our Doctors
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Active health education reels prepared by our videographer nurse and medical specialists.
            </p>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-colors shrink-0 w-fit"
          >
            <Instagram className="w-4 h-4 text-[#EE5A24]" />
            <span>Follow @mercymed.kg</span>
            <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
          </a>
        </div>

        {/* Video Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post) => {
            const title = currentLang === 'ru' ? post.titleRu : currentLang === 'ky' ? post.titleKy : post.title;

            return (
              <div
                key={post.id}
                className="group rounded-2xl bg-white border border-stone-200 overflow-hidden hover:shadow-md hover:border-amber-300 transition-all flex flex-col justify-between"
              >
                {/* Media Preview Box */}
                <div className="relative aspect-4/3 bg-gradient-to-br from-stone-800 to-stone-900 flex items-center justify-center p-4 text-center overflow-hidden">
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#F58220_1px,transparent_1px)] [background-size:12px_12px]" />
                  
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-xs text-white flex items-center justify-center group-hover:scale-110 group-hover:bg-[#EE5A24] transition-all shadow-md">
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                    </div>
                    <span className="text-[11px] font-mono text-white/80 mt-2 bg-black/40 px-2 py-0.5 rounded-md">
                      {post.duration}
                    </span>
                  </div>

                  <span className="absolute top-3 left-3 text-[10px] font-bold text-amber-300 bg-black/50 px-2 py-0.5 rounded-md">
                    {post.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-stone-900 line-clamp-2 mb-2 leading-snug">
                      {title}
                    </h3>
                    <p className="text-[11px] font-medium text-[#EE5A24]">
                      {post.doctor}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-stone-200/70 flex items-center justify-between text-[11px] text-stone-500">
                    <span className="flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500/20" />
                      {post.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-3.5 h-3.5 text-stone-400" />
                      {post.comments}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

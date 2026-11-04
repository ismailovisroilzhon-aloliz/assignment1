/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MedicalService } from '../types';

/**
 * Calculates Levenshtein edit distance between two strings
 */
function levenshteinDistance(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;

  const d: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) d[i][0] = i;
  for (let j = 0; j <= n; j++) d[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(
        d[i - 1][j] + 1, // deletion
        d[i][j - 1] + 1, // insertion
        d[i - 1][j - 1] + cost // substitution
      );
    }
  }

  return d[m][n];
}

/**
 * Calculates similarity ratio between 0 and 1
 */
function stringSimilarity(s1: string, s2: string): number {
  const longer = s1.length > s2.length ? s1 : s2;
  const shorter = s1.length > s2.length ? s2 : s1;
  const longerLength = longer.length;
  if (longerLength === 0) return 1.0;

  const distance = levenshteinDistance(longer, shorter);
  return (longerLength - distance) / longerLength;
}

/**
 * Cleans and tokenizes text
 */
function cleanText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[.,/#!$%^&*;:{}=\-_`~()?"'«»]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export interface MatchResult {
  service: MedicalService;
  score: number;
  matchedReason: string;
}

/**
 * Fuzzy search across medical services
 * Matches query against titles, descriptions, symptoms, and categories across languages.
 * Even with typos, returns closest matches sorted by best match.
 */
export function fuzzySearchServices(
  services: MedicalService[],
  query: string,
  lang: 'en' | 'ru' | 'ky'
): MedicalService[] {
  const cleanedQuery = cleanText(query);
  if (!cleanedQuery) return services;

  const queryTokens = cleanedQuery.split(' ').filter(Boolean);

  const scoredResults: MatchResult[] = services.map((service) => {
    let bestScore = 0;
    let matchReason = '';

    const title = cleanText(
      lang === 'ru' ? service.titleRu : lang === 'ky' ? service.titleKy : service.title
    );
    const desc = cleanText(
      lang === 'ru' ? service.descriptionRu : lang === 'ky' ? service.descriptionKy : service.description
    );
    const allTitles = cleanText(`${service.title} ${service.titleRu} ${service.titleKy}`);
    const symptoms = service.symptoms.map(cleanText);
    const category = cleanText(service.category);

    // 1. Direct exact or substring match in active language title
    if (title.includes(cleanedQuery)) {
      bestScore = Math.max(bestScore, 100);
      matchReason = 'Title match';
    } else if (allTitles.includes(cleanedQuery)) {
      bestScore = Math.max(bestScore, 90);
      matchReason = 'Cross-language title match';
    }

    // 2. Exact match in symptoms
    for (const sym of symptoms) {
      if (sym.includes(cleanedQuery) || cleanedQuery.includes(sym)) {
        bestScore = Math.max(bestScore, 85);
        matchReason = `Symptom match (${sym})`;
      }
    }

    // 3. Exact match in description or category
    if (desc.includes(cleanedQuery)) {
      bestScore = Math.max(bestScore, 75);
      matchReason = 'Description match';
    } else if (category.includes(cleanedQuery)) {
      bestScore = Math.max(bestScore, 70);
      matchReason = 'Category match';
    }

    // 4. Token-by-token fuzzy Levenshtein comparison against words in title & symptoms
    const targetWords = [...title.split(' '), ...allTitles.split(' '), ...symptoms];

    for (const qToken of queryTokens) {
      for (const tWord of targetWords) {
        if (!tWord || tWord.length < 2) continue;

        // Substring check
        if (tWord.includes(qToken) || qToken.includes(tWord)) {
          const ratio = Math.min(qToken.length, tWord.length) / Math.max(qToken.length, tWord.length);
          const score = 65 + ratio * 20;
          if (score > bestScore) {
            bestScore = score;
            matchReason = `Similar to "${tWord}"`;
          }
          continue;
        }

        // Levenshtein fuzzy distance
        const sim = stringSimilarity(qToken, tWord);
        // Allow up to 2 typos for medium words, or similarity >= 0.58
        if (sim >= 0.58) {
          const score = 40 + sim * 40;
          if (score > bestScore) {
            bestScore = score;
            matchReason = `Closest match for typo in "${tWord}"`;
          }
        }
      }
    }

    return {
      service,
      score: bestScore,
      matchedReason: matchReason,
    };
  });

  // Filter items with meaningful match
  const filtered = scoredResults
    .filter((r) => r.score >= 45)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.service);

  // If strict threshold yielded nothing, return top 3 closest items so user is never left without guidance!
  if (filtered.length === 0 && scoredResults.length > 0) {
    const fallback = [...scoredResults]
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((r) => r.service);
    return fallback;
  }

  return filtered;
}

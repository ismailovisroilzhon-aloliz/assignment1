/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'icon-only' | 'stacked';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  lightText?: boolean;
}

export const MercyMedLogo: React.FC<LogoProps> = ({
  className = '',
  variant = 'full',
  size = 'md',
  showTagline = false,
  lightText = false,
}) => {
  const iconDimensions = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  }[size];

  const textSize = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  }[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Authentic Geometric Emblem matching MercyMed Brand Book */}
      <svg
        className={`${iconDimensions} shrink-0 drop-shadow-xs transition-transform duration-200 hover:scale-105`}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="MercyMed Emblem"
      >
        <defs>
          <linearGradient id="mercyGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EA3725" />
            <stop offset="100%" stopColor="#EE5A24" />
          </linearGradient>
          <linearGradient id="mercyGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EE5A24" />
            <stop offset="100%" stopColor="#F58220" />
          </linearGradient>
          <linearGradient id="mercyGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F58220" />
            <stop offset="100%" stopColor="#FDB913" />
          </linearGradient>
        </defs>

        {/* Outer Square Container Base */}
        <rect width="100" height="100" rx="8" fill="#E52421" />

        {/* Left vertical pillar facet */}
        <polygon points="12,12 36,12 36,88 12,88" fill="#EA3725" opacity="0.95" />

        {/* Diagonal chevron layer 1 */}
        <polygon points="28,12 50,44 72,12 88,12 50,68 12,12" fill="url(#mercyGradient1)" />

        {/* Diagonal chevron layer 2 (progression toward healing) */}
        <polygon points="36,36 50,56 64,36 78,36 50,78 22,36" fill="url(#mercyGradient2)" />

        {/* Lower central chevron layer 3 */}
        <polygon points="36,54 50,74 64,54 74,54 50,88 26,54" fill="url(#mercyGradient3)" />

        {/* Right side facet connecting towards sun circle */}
        <polygon points="64,12 88,12 88,88 64,88" fill="#EE5A24" opacity="0.85" />

        {/* Warm Golden Sun / Holistic Health Circle in Lower Right */}
        <circle cx="75" cy="73" r="18" fill="#FFF200" opacity="0.95" />
        <circle cx="75" cy="73" r="13" fill="#FFDE00" />
      </svg>

      {variant !== 'icon-only' && (
        <div className={`flex ${variant === 'stacked' ? 'flex-col items-start' : 'flex-col justify-center'}`}>
          <div className={`font-extrabold tracking-tight leading-none ${textSize} flex items-center`}>
            {/* MERCY with medical cross embedded in the R */}
            <span className={`${lightText ? 'text-white' : 'text-slate-800'} tracking-tight flex items-center`}>
              M
              E
              <span className="relative inline-flex items-center justify-center">
                R
                <span
                  className={`absolute text-[0.45em] ${lightText ? 'text-amber-400' : 'text-red-600'} font-black`}
                  style={{ top: '35%', left: '46%', transform: 'translate(-50%, -50%)' }}
                  aria-hidden="true"
                >
                  +
                </span>
              </span>
              CY
            </span>
            {/* MED in vibrant brand red/orange */}
            <span className="text-[#EE5A24] tracking-tight ml-0.5">MED</span>
          </div>

          {showTagline && (
            <span className={`text-[11px] font-medium ${lightText ? 'text-stone-300' : 'text-slate-500'} tracking-wide mt-0.5 uppercase`}>
              Medical Center · Bishkek
            </span>
          )}
        </div>
      )}
    </div>
  );
};

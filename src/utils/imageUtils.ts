import React from 'react';

export const handleImageError = (
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  category?: string,
  fallbackLabel?: string
) => {
  const target = e.currentTarget;
  // Prevent infinite loop if fallback also fails
  if (target.dataset.failed) return;
  target.dataset.failed = 'true';

  const label = fallbackLabel || 'আমারদোকান';
  
  // Use SVG data URI placeholder with clean UTF-8 text
  target.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect width="400" height="400" fill="%230f172a"/><circle cx="200" cy="170" r="70" fill="%23047857" opacity="0.4"/><path d="M170 160 L200 130 L230 160 L200 190 Z" fill="%2334d399"/><text x="200" y="270" font-family="sans-serif" font-size="18" font-weight="bold" fill="%23ffffff" text-anchor="middle">${encodeURIComponent(label)}</text><text x="200" y="300" font-family="sans-serif" font-size="13" fill="%2310b981" text-anchor="middle">আমারদোকান এআই ভেরিফাইড</text></svg>`;
};

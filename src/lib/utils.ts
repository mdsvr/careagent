import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Return Tailwind color class based on score 0-10 */
export function getScoreColor(score: number): string {
  if (score >= 8.5) return 'score-excellent';
  if (score >= 6.5) return 'score-good';
  return 'score-poor';
}

/** Return background CSS classes for score card */
export function getScoreBg(score: number): string {
  if (score >= 8.5) return 'bg-score-excellent border';
  if (score >= 6.5) return 'bg-score-good border';
  return 'bg-score-poor border';
}

/** Return hex color for recharts elements */
export function getScoreHex(score: number): string {
  if (score >= 8.5) return '#10b981';
  if (score >= 6.5) return '#f59e0b';
  return '#ef4444';
}

/** Format a score as "X.X / 10" */
export function formatScore(score: number): string {
  return `${score.toFixed(1)} / 10`;
}

/** Clamp value between min and max */
export function clamp(val: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, val));
}

/** Capitalise first letter */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/** Format relative date label */
export function relativeDate(label: string): string {
  return label;
}

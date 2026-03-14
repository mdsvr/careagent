'use client';

import { cn } from '@/lib/utils';

interface ScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  showLabel?: boolean;
  className?: string;
}

export function ScoreRing({ score, size = 80, strokeWidth = 7, label, showLabel = true, className }: ScoreRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(1, score / 10);
  const offset = circumference * (1 - pct);

  const color =
    score >= 8.5 ? '#10b981' :
    score >= 6.5 ? '#f59e0b' :
                   '#ef4444';

  const trackColor = 'hsl(220 20% 18%)';

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: 'rotate(-90deg)' }}
      >
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />
        {/* Fill */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transition: 'stroke-dashoffset 1s ease-out',
            filter: `drop-shadow(0 0 4px ${color}55)`,
          }}
        />
      </svg>
      {showLabel && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-black text-sm leading-none" style={{ color }}>
            {score.toFixed(1)}
          </span>
          {label && (
            <span className="text-[9px] text-muted-foreground mt-0.5 font-medium">{label}</span>
          )}
        </div>
      )}
    </div>
  );
}

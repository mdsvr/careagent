'use client';

import { type LucideIcon } from 'lucide-react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: string;
  delta: string;
  up: boolean;
  icon: LucideIcon;
  className?: string;
  delay?: number;
}

export function StatCard({ label, value, delta, up, icon: Icon, className, delay = 0 }: StatCardProps) {
  return (
    <div
      className={cn(
        'glass rounded-2xl p-5 flex flex-col gap-3 group hover:border-primary/30 transition-all duration-300',
        'animate-slide-in-right',
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between">
        <p className="metric-label">{label}</p>
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          <Icon className="w-4 h-4 text-primary" />
        </div>
      </div>
      <div>
        <p className="metric-value text-3xl">{value}</p>
        <div className={cn('metric-delta flex items-center gap-1', up ? 'text-emerald-400' : 'text-red-400')}>
          {up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {delta}
        </div>
      </div>
    </div>
  );
}

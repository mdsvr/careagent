'use client';

import { UserCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScoreRing } from '@/components/ScoreRing';
import type { Consultant } from '@/lib/data';

interface TopConsultantsCardProps {
  consultants: Consultant[];
}

export function TopConsultantsCard({ consultants }: TopConsultantsCardProps) {
  return (
    <Card className="col-span-3 glass border-border/50 rounded-2xl h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <UserCheck className="w-4 h-4 text-primary" aria-hidden="true" />
          Top HR Consultants
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 flex-1 overflow-auto pr-2">
        {consultants.map((hr, i) => (
          <div
            key={hr.id}
            className="flex items-center gap-3 group animate-slide-in-right"
            style={{ animationDelay: `${i * 60}ms` }}
            role="listitem"
          >
            <div className="relative shrink-0">
              <div
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-violet-600 flex items-center justify-center font-bold text-white text-sm shadow-md"
                aria-hidden="true"
              >
                {hr.avatar}
              </div>
              {i === 0 && (
                <div
                  className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center text-[9px] font-black text-yellow-900"
                  title="Rank 1"
                >
                  1
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{hr.name}</p>
              <p className="text-xs text-muted-foreground">{hr.sessions} sessions · {hr.role}</p>
            </div>
            <div className="text-right shrink-0">
              <ScoreRing score={hr.score} size={44} strokeWidth={4} label={`Score: ${hr.score}/10`} showLabel={true} />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScoreRing } from '@/components/ScoreRing';
import {
  AlertTriangle, CheckCircle2, Filter, Search,
  Calendar, Clock, ChevronRight
} from 'lucide-react';
import { consultations } from '@/lib/data';
import type { ConsultationStatus } from '@/lib/data';
import { cn } from '@/lib/utils';
import { useConsultations } from '@/hooks/useConsultations';

const FILTERS: ConsultationStatus[] = ['Reviewed', 'Flagged'];

const TONE_BADGE: Record<string, string> = {
  Positive: 'badge-success',
  Neutral:  'badge-neutral',
  Negative: 'badge-danger',
};

export default function ConsultationsPage() {
  const {
    filter, setFilter,
    searchQuery, setSearchQuery,
    filteredData,
    totalCount, reviewedCount, flaggedCount
  } = useConsultations({ initialData: consultations });

  return (
    <div className="page-container" role="main" aria-label="Consultations History">
      {/* Header */}
      <header className="flex items-start justify-between flex-wrap gap-4">
        <div className="section-header mb-0">
          <h1 className="section-title">Consultations</h1>
          <p className="section-sub">{totalCount} sessions analyzed — sorted by recency.</p>
        </div>
        {/* Stats strip */}
        <div className="flex items-center gap-3" aria-label="Consultation Status Summary">
          <span className="badge-success" aria-label={`${reviewedCount} Reviewed`}>{reviewedCount} Reviewed</span>
          <span className="badge-warning" aria-label={`${flaggedCount} Flagged`}>{flaggedCount} Flagged</span>
        </div>
      </header>

      {/* Toolbar */}
      <section className="flex items-center gap-3 flex-wrap" aria-label="Filter and Search Controls">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" aria-hidden="true" />
          <input
            type="text"
            placeholder="Search by HR, candidate, or ID…"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-secondary/60 border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary/50 placeholder:text-muted-foreground/60 transition-colors"
            aria-label="Search Consultations"
          />
        </div>
        {/* Filter */}
        <nav className="flex items-center gap-1.5" aria-label="Status Filters">
          <Filter className="w-3.5 h-3.5 text-muted-foreground" aria-hidden="true" />
          {(['All', ...FILTERS] as const).map(f => (
            <Button
              key={f}
              variant={filter === f ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(f)}
              className={cn('text-xs h-8 rounded-lg transition-all', filter !== f && 'bg-secondary/40 border-border')}
              aria-pressed={filter === f}
            >
              {f}
            </Button>
          ))}
        </nav>
      </section>

      {/* Table / List */}
      <section aria-label="Consultations List">
        <Card className="glass border-border/50 rounded-2xl overflow-hidden">
          <CardContent className="p-0">
            {filteredData.length === 0 ? (
              <div className="p-16 text-center text-muted-foreground text-sm flex flex-col items-center gap-2" role="status" aria-live="polite">
                <Search className="w-8 h-8 opacity-20" aria-hidden="true" />
                No sessions match this filter.
              </div>
            ) : (
              <div className="divide-y divide-border/40" role="list">
                {filteredData.map((item, i) => (
                  <article
                    key={item.id}
                    className="flex items-center gap-4 px-5 py-3.5 hover:bg-accent/40 transition-colors cursor-pointer group animate-slide-in-right"
                    style={{ animationDelay: `${i * 40}ms` }}
                    role="listitem"
                    tabIndex={0}
                    aria-label={`Consultation ${item.id} between ${item.hr} and ${item.candidate}`}
                  >
                    {/* Avatar */}
                    <div
                      className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/80 to-violet-700 flex items-center justify-center font-bold text-white text-sm shrink-0 shadow-md"
                      aria-hidden="true"
                    >
                      {item.hr.charAt(0)}
                    </div>

                    {/* Main info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <span className="font-semibold text-sm">{item.id}</span>
                        {item.status === 'Flagged' ? (
                          <span className="badge-danger text-[10px]" title="Risk Flagged">
                            <AlertTriangle className="w-2.5 h-2.5" aria-hidden="true" />Flagged
                          </span>
                        ) : (
                          <span className="badge-success text-[10px]" title="Session Reviewed">
                            <CheckCircle2 className="w-2.5 h-2.5" aria-hidden="true" />Reviewed
                          </span>
                        )}
                        <span className={cn(TONE_BADGE[item.tone], 'text-[10px]')}>{item.tone}</span>
                        {item.flags > 0 && (
                          <span className="badge-warning text-[10px]">{item.flags} Risk Flag{item.flags > 1 ? 's' : ''}</span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        HR: <span className="text-foreground font-medium">{item.hr}</span>
                        {' → '}
                        Candidate: <span className="text-foreground font-medium">{item.candidate}</span>
                      </p>
                    </div>

                    {/* Meta */}
                    <div className="flex items-center gap-5 shrink-0 text-xs text-muted-foreground">
                      <div className="hidden sm:flex items-center gap-1" aria-label={`Duration: ${item.duration}`}>
                        <Clock className="w-3 h-3" aria-hidden="true" />{item.duration}
                      </div>
                      <div className="hidden md:flex items-center gap-1" aria-label={`Date: ${item.date}`}>
                        <Calendar className="w-3 h-3" aria-hidden="true" />{item.date}
                      </div>
                    </div>

                    {/* Score Ring */}
                    <div className="flex items-center gap-2">
                      <ScoreRing score={item.score} size={48} strokeWidth={5} label={`Score: ${item.score}/10`} showLabel={false} />
                      <ChevronRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-muted-foreground transition-colors" aria-hidden="true" />
                    </div>
                  </article>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

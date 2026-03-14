'use client';

import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from '@/components/StatCard';
import {
  Star, Activity, UserCheck, Zap,
  AlertTriangle, ShieldCheck, TrendingUp
} from 'lucide-react';
import { weeklyData, platformStats, topConsultants, consultations } from '@/lib/data';
import { TopConsultantsCard } from '@/components/dashboard/TopConsultantsCard';
import { EthicsGovernanceCard } from '@/components/dashboard/EthicsGovernanceCard';

// Dynamically import Recharts to reduce initial bundle size
const ScoreTrendChart = dynamic(
  () => import('@/components/charts/ScoreTrendChart').then((mod) => mod.ScoreTrendChart),
  { ssr: false, loading: () => <div className="w-full h-full skeleton rounded-lg" /> }
);
const ToneDistributionChart = dynamic(
  () => import('@/components/charts/ToneDistributionChart').then((mod) => mod.ToneDistributionChart),
  { ssr: false, loading: () => <div className="w-full h-full skeleton rounded-lg" /> }
);

const ICON_MAP = { star: Star, activity: Activity, 'user-check': UserCheck, zap: Zap } as const;

export default function Dashboard() {
  const flaggedToday = useMemo(() => consultations.filter(c => c.status === 'Flagged' && c.date.startsWith('Today')), []);

  const ethicsItems = useMemo(() => [
    { label: 'PII Scrubbing',         status: 'Active',            ok: true  },
    { label: 'AI Transparency Mode',   status: 'Enabled',           ok: true  },
    { label: 'Bias Audit',             status: 'Passed — Today',    ok: true  },
    { label: 'Data Sovereignty',        status: 'AES-256 Encrypted', ok: true  },
    { label: 'Sustainability Mode',     status: 'Green Compute ON',  ok: true  },
    { label: 'GDPR Compliance',         status: 'Configured',        ok: true  },
  ], []);

  return (
    <div className="page-container" role="main" aria-label="Dashboard Overview">
      {/* Header */}
      <header className="flex items-start justify-between flex-wrap gap-4">
        <div className="section-header mb-0">
          <h1 className="section-title">Overview</h1>
          <p className="section-sub">Real-time HR consultation performance across the JSO platform.</p>
        </div>
        <div className="badge-success gap-1.5 px-3 py-1.5" role="status" aria-label="JSO Phase-2 Compliance Status">
          <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
          JSO Phase-2 — Ethics Compliant
        </div>
      </header>

      {/* Alert Banner */}
      {flaggedToday.length > 0 && (
        <section
          className="flex items-center gap-3 p-4 rounded-2xl border border-yellow-500/25 bg-yellow-500/8 animate-slide-in-right"
          aria-live="polite"
        >
          <div className="w-9 h-9 rounded-xl bg-yellow-500/15 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5 text-yellow-400" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-semibold text-yellow-300">
              {flaggedToday.length} Consultation{flaggedToday.length > 1 ? 's' : ''} Flagged Today
            </p>
            <p className="text-xs text-muted-foreground">
              {flaggedToday.map(c => `${c.id} (${c.hr})`).join(', ')} — review recommended.
            </p>
          </div>
        </section>
      )}

      {/* KPI Cards */}
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4" aria-label="Key Performance Indicators">
        {platformStats.map((stat, i) => {
          const Icon = ICON_MAP[stat.icon as keyof typeof ICON_MAP] ?? Star;
          return (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              delta={stat.delta}
              up={stat.up}
              icon={Icon}
              delay={i * 75}
            />
          );
        })}
      </section>

      {/* Score Trend + Top Consultants */}
      <section className="grid gap-5 lg:grid-cols-7" aria-label="Score Trends and Top Consultants">
        <Card className="col-span-4 glass border-border/50 rounded-2xl overflow-hidden flex flex-col h-[360px]">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Activity className="w-4 h-4 text-primary" aria-hidden="true" />
              Score Trends — This Week
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 pl-1 pb-4">
             <ScoreTrendChart data={weeklyData} />
          </CardContent>
        </Card>

        <TopConsultantsCard consultants={topConsultants} />
      </section>

      {/* Tone Distribution + Ethics */}
      <section className="grid gap-5 lg:grid-cols-7" aria-label="Tone Distribution and Ethics">
        <Card className="col-span-4 glass border-border/50 rounded-2xl overflow-hidden flex flex-col h-[300px]">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="w-4 h-4 text-primary" aria-hidden="true" />
              Tone Distribution — This Week
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 pl-1 pb-4">
             <ToneDistributionChart data={weeklyData} />
          </CardContent>
        </Card>

        <EthicsGovernanceCard items={ethicsItems} />
      </section>
    </div>
  );
}

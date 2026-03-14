import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auditLog } from "@/lib/data";
import { ShieldCheck, Eye, Leaf, Database, Users, Clock, Lock } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Admin & Governance' };

export default function AdminPage() {
  return (
    <main className="page-container" aria-label="Admin and Governance Dashboard">
      <header className="section-header">
        <h1 className="section-title">Admin & Governance</h1>
        <p className="section-sub">Platform security, AI transparency, data sovereignty, and sustainability controls.</p>
      </header>

      {/* Status banner */}
      <section 
        className="flex items-center gap-3 p-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/8 glass"
        aria-label="System Status"
        role="status"
      >
        <Lock className="w-5 h-5 text-emerald-400 shrink-0" aria-hidden="true" />
        <div>
          <p className="text-sm font-semibold text-emerald-300">All systems operational — last audit passed today at 08:00 UTC</p>
          <p className="text-xs text-muted-foreground">PII scrubbing active · AES-256 encryption · Bias monitoring enabled</p>
        </div>
      </section>

      {/* RBAC + PII */}
      <div className="grid gap-5 md:grid-cols-2">
        <Card className="glass border-border/50 rounded-2xl">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Users className="w-4 h-4 text-primary" />
              Role-Based Access Control
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-0">
            {[
              { role: 'Super Admin',                   desc: 'Full platform + audit logs',        badge: 'badge-info'    },
              { role: 'HR Consultant (HR Dashboard)',   desc: 'Own sessions + coaching tips',      badge: 'badge-neutral' },
              { role: 'Job Seeker (User Dashboard)',    desc: 'Personal summaries only',           badge: 'badge-neutral' },
              { role: 'Licensing Admin',               desc: 'Audit logs + licence scores',        badge: 'badge-warning' },
            ].map((r, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-border/30 last:border-0">
                <div>
                  <p className="text-sm font-medium">{r.role}</p>
                  <p className="text-xs text-muted-foreground">{r.desc}</p>
                </div>
                <span className={r.badge}>Scoped</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="glass border-indigo-500/20 rounded-2xl">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Database className="w-4 h-4 text-indigo-400" />
              Data Privacy & PII Protection
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: 'PII Scrubbing',        val: 'Active — names & IDs removed pre-LLM' },
              { label: 'Storage',              val: 'AES-256 Encrypted AWS S3 buckets' },
              { label: 'Retention Policy',     val: '90-day auto-purge on consent withdrawal' },
              { label: 'GDPR Compliance',      val: 'Enabled — Right to erasure supported' },
              { label: 'Data Residency',       val: 'EU-West (Ireland) primary region' },
            ].map((item, i) => (
              <div key={i} className="flex gap-2 text-xs">
                <span className="text-emerald-400 font-mono shrink-0 mt-0.5">✓</span>
                <span><span className="text-foreground font-medium">{item.label}:</span> <span className="text-muted-foreground">{item.val}</span></span>
              </div>
            ))}
            <div className="mt-2 p-3 bg-secondary/60 rounded-xl border border-border font-mono text-xs">
              <span className="text-emerald-400">● System Status: Secure</span><br />
              <span className="text-muted-foreground">Last Audit: Today, 08:00 UTC</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Transparency + Sustainability */}
      <div className="grid gap-5 md:grid-cols-2">
        <Card className="glass border-emerald-500/15 rounded-2xl">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Eye className="w-4 h-4 text-emerald-400" />
              AI Transparency & Decision Audit
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-xs text-muted-foreground">All agent decisions are fully traceable. No black-box outputs.</p>
            <div className="bg-secondary/60 rounded-xl p-3 space-y-2">
              {[
                'Agent 1 → Processes transcript: extracts speaker lines & word count',
                'Agent 2 → NLP cue detection: tone %, risk flags, 4 metric scores',
                'Agent 3 → Dynamic coaching & candidate tips from score profile',
                'Agent 4 → Weighted final score + ethics note + full trace',
              ].map((trace, i) => (
                <div key={i} className="flex gap-2 text-xs font-mono">
                  <span className="text-primary shrink-0">▸</span>
                  <span className="text-muted-foreground">{trace}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 p-3 rounded-xl border border-emerald-500/15 bg-card/50">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <p className="text-xs text-muted-foreground"><strong className="text-foreground">AI is advisory only.</strong> Human HR managers retain final authority on all employment decisions.</p>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-green-500/15 rounded-2xl">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Leaf className="w-4 h-4 text-green-400" />
              Sustainability & Environment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: 'Serverless Architecture', val: 'Vercel Edge + Next.js API Routes — no idle servers' },
              { label: 'Compute Efficiency',      val: 'Mocked LLM avoids unnecessary GPU cycles in dev' },
              { label: 'Green Cloud',             val: 'Google Cloud & AWS regions with high renewable energy' },
              { label: 'Data Minimisation',       val: 'Only necessary transcript segments processed' },
              { label: 'Batch Preference',        val: 'Batch over real-time processing where possible' },
            ].map((item, i) => (
              <div key={i} className="flex gap-2 text-xs">
                <span className="shrink-0">🌱</span>
                <span><span className="text-foreground font-medium">{item.label}:</span> <span className="text-muted-foreground">{item.val}</span></span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Audit Log */}
      <section aria-label="Platform Audit Log">
        <Card className="glass border-border/50 rounded-2xl overflow-hidden">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Clock className="w-4 h-4 text-primary" aria-hidden="true" />
              Platform Audit Log
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/30" role="list">
              {auditLog.map((entry, i) => (
                <article key={i} className="flex items-center gap-4 px-6 py-3 hover:bg-accent/30 transition-colors" role="listitem">
                  <div 
                    className={`w-2 h-2 rounded-full shrink-0 ${entry.level === 'ok' ? 'bg-emerald-400 shadow-[0_0_6px_#10b981]' : 'bg-yellow-400 shadow-[0_0_6px_#f59e0b]'}`} 
                    aria-label={`Status: ${entry.level}`}
                  />
                  <time className="text-[11px] text-muted-foreground font-mono shrink-0 w-44">{entry.time}</time>
                  <p className="text-sm text-foreground/80">{entry.event}</p>
                </article>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

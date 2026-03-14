import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Moon, Shield, Globe, Sliders } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Settings' };

const ToggleRow = ({ label, desc, enabled = true }: { label: string; desc: string; enabled?: boolean }) => (
  <div className="flex items-center justify-between py-3.5 border-b border-border/30 last:border-0">
    <div>
      <p className="text-sm font-medium" id={`label-${label.replace(/\s+/g, '-')}`}>{label}</p>
      <p className="text-xs text-muted-foreground mt-0.5" id={`desc-${label.replace(/\s+/g, '-')}`}>{desc}</p>
    </div>
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      aria-labelledby={`label-${label.replace(/\s+/g, '-')}`}
      aria-describedby={`desc-${label.replace(/\s+/g, '-')}`}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 ${enabled ? 'bg-primary' : 'bg-secondary'}`}
    >
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`} aria-hidden="true" />
    </button>
  </div>
);

export default function SettingsPage() {
  return (
    <main className="page-container max-w-3xl" aria-label="Platform Settings">
      <header className="section-header">
        <h1 className="section-title">Settings</h1>
        <p className="section-sub">Manage platform preferences, notifications, and security configuration.</p>
      </header>

      <div className="space-y-5">
        {/* Display */}
        <section aria-labelledby="display-settings">
          <Card className="glass border-border/50 rounded-2xl">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base" id="display-settings">
                <Moon className="w-4 h-4 text-primary" aria-hidden="true" />
                Display & Appearance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ToggleRow label="Dark Mode" desc="Use the dark theme across the platform." enabled={true} />
              <ToggleRow label="Compact Layout" desc="Reduce spacing for denser information display." enabled={false} />
              <ToggleRow label="Animate UI" desc="Enable transitions and entry animations." enabled={true} />
            </CardContent>
          </Card>
        </section>

        {/* Notifications */}
        <section aria-labelledby="notification-settings">
          <Card className="glass border-border/50 rounded-2xl">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base" id="notification-settings">
                <Bell className="w-4 h-4 text-primary" aria-hidden="true" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ToggleRow label="Flag Alerts"       desc="Notify when a session is risk-flagged by Agent 2." enabled={true}  />
              <ToggleRow label="Weekly Summary"    desc="Receive a weekly digest of platform-wide scores."  enabled={true}  />
              <ToggleRow label="Audit Reminders"   desc="Alert when a scheduled bias audit is due."         enabled={false} />
              <ToggleRow label="Pipeline Errors"   desc="Alert on orchestration or API errors."             enabled={true}  />
            </CardContent>
          </Card>
        </section>

        {/* Agent Pipeline */}
        <section aria-labelledby="pipeline-settings">
          <Card className="glass border-border/50 rounded-2xl">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base" id="pipeline-settings">
                <Sliders className="w-4 h-4 text-primary" aria-hidden="true" />
                Agent Pipeline Config
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ToggleRow label="Live Mode (Vertex AI)"    desc="Use Google Vertex AI Gemini instead of mock pipeline."  enabled={false} />
              <ToggleRow label="PII Scrubbing"           desc="Strip names and identifiers before LLM ingestion."       enabled={true}  />
              <ToggleRow label="Ethics Note in Output"   desc="Append governance note to every analysis result."        enabled={true}  />
              <ToggleRow label="Agent Decision Trace"    desc="Include per-agent trace in JSON output."                 enabled={true}  />
            </CardContent>
          </Card>
        </section>

        {/* Privacy */}
        <section aria-labelledby="privacy-settings">
          <Card className="glass border-border/50 rounded-2xl">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base" id="privacy-settings">
                <Shield className="w-4 h-4 text-primary" aria-hidden="true" />
                Privacy & Compliance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ToggleRow label="GDPR Mode"           desc="Enable right-to-erasure controls and consent logging."  enabled={true}  />
              <ToggleRow label="Data Retention"      desc="Auto-purge transcripts after 90 days."                  enabled={true}  />
              <ToggleRow label="Anonymised Exports"  desc="Strip PII from any downloaded reports."                 enabled={true}  />
            </CardContent>
          </Card>
        </section>

        {/* Region */}
        <section aria-labelledby="platform-region">
          <Card className="glass border-border/50 rounded-2xl">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base" id="platform-region">
                <Globe className="w-4 h-4 text-primary" aria-hidden="true" />
                Platform & Region
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: 'Data Region',     value: 'EU-West (Ireland)' },
                { label: 'AI Provider',     value: 'Google Vertex AI (Mock in dev)' },
                { label: 'Storage',         value: 'AWS S3 — AES-256' },
                { label: 'Platform',        value: 'Vercel Edge Network' },
                { label: 'App Version',     value: 'CARE Agent v2.0.0 — JSO Phase-2' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between text-sm py-1 border-b border-border/30 last:border-0">
                  <span className="text-muted-foreground text-xs">{item.label}</span>
                  <span className="font-mono text-xs text-foreground/80">{item.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}

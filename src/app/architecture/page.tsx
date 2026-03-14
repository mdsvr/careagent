import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Brain, Sparkles, BarChart2, ArrowRight, Globe, Server, Shield, Users, Leaf } from 'lucide-react';

const agents = [
    { id: 1, name: 'Transcript Processor', icon: FileText, color: 'from-blue-600 to-blue-800', desc: 'Cleans input, splits speaker lines (HR vs Candidate), counts words and diarized turns.', output: 'Structured text object' },
    { id: 2, name: 'Consultation Analyzer', icon: Brain, color: 'from-violet-600 to-violet-800', desc: 'Applies NLP-style keyword detection to compute tone (positive/neutral/negative %) and 4 metric scores. Identifies risk flags like interruptions and talk-time imbalance.', output: 'Scores + tone + risk flags' },
    { id: 3, name: 'Insight Generator', icon: Sparkles, color: 'from-indigo-600 to-indigo-800', desc: 'Dynamically generates session summary, HR coaching tips, and candidate action items based on the score profile from Agent 2.', output: 'HR tips + candidate advice' },
    { id: 4, name: 'Dashboard Reporter', icon: BarChart2, color: 'from-emerald-600 to-emerald-800', desc: 'Computes weighted final score (Pro 30%, Engage 25%, Advice 25%, Comms 20%), appends ethics note and agent trace, returns full JSON.', output: 'Final ConsultationInsights JSON' },
];

const techStack = [
    { category: 'Frontend', items: ['Next.js 14 App Router', 'React 18', 'TailwindCSS', 'Recharts', 'Framer Motion', 'Lucide React'] },
    { category: 'Backend / API', items: ['Next.js API Routes (serverless)', 'Node.js runtime', 'TypeScript'] },
    { category: 'AI / LLM Layer', items: ['Google Vertex AI (Gemini — production)', 'Anthropic Claude Opus 4.6 (alternative)', 'Mock pipeline (prototype)'] },
    { category: 'Storage & DB', items: ['Supabase PostgreSQL (consultation records)', 'AWS S3 (encrypted transcript storage)', 'In-memory mock (prototype)'] },
    { category: 'DevOps / Hosting', items: ['Vercel (deployment)', 'Google Cloud Functions (event triggers)', 'GitHub Actions (CI/CD)'] },
    { category: 'Security', items: ['AES-256 S3 encryption', 'PII scrubbing middleware', 'Supabase Row-Level Security', 'JWT + OAuth2 (MCP auth)'] },
];

const dashboardMap = [
    { dashboard: 'User Dashboard (Job Seeker)', agent: 'Agent 3 + 4', example: 'Job seekers see their personal session summary, candidate actionables, and professionalism score after each HR consultation.' },
    { dashboard: 'HR Consultant Dashboard', agent: 'Agent 2 + 3', example: 'HR advisors see their individual engagement scores, coaching tips, risk flags, and tone analysis trend over their sessions.' },
    { dashboard: 'Super Admin Dashboard', agent: 'All Agents', example: 'Super Admins see platform-wide analytics: avg scores, tone distributions, flagged sessions, audit logs, and ethical compliance status.' },
    { dashboard: 'Licensing Dashboard', agent: 'Agent 4', example: 'Licensing managers see the final composite scores per licence holder to assess certification renewal eligibility.' },
];

const ethicsPillars = [
    { icon: Shield, color: 'text-indigo-400', label: 'Governance', desc: 'Full agent decision trace logged. AI acts as advisory layer — humans retain final authority.' },
    { icon: Users, color: 'text-blue-400', label: 'Workers', desc: 'HR consultants are coached, not penalised. Scores trigger growth conversations, not punitive actions.' },
    { icon: Globe, color: 'text-violet-400', label: 'Community', desc: 'Promotes fair hiring by flagging bias-risk signals and ensuring diverse candidate engagement.' },
    { icon: Leaf, color: 'text-green-400', label: 'Environment', desc: 'Serverless architecture on Vercel eliminates idle compute. Green cloud regions selected.' },
    { icon: Shield, color: 'text-emerald-400', label: 'Customers', desc: 'PII scrubbed before AI processing. AES-256 storage. GDPR-compliant right to erasure.' },
    { icon: BarChart2, color: 'text-yellow-400', label: 'Sustainability', desc: "Designed for underserved job seekers via JSO's mission, with fair scoring models and inclusive feedback." },
];

export default function ArchitecturePage() {
    return (
        <main className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl mx-auto" aria-labelledby="architecture-title">
            <header>
                <h1 id="architecture-title" className="text-3xl font-bold tracking-tight">Agent Architecture</h1>
                <p className="text-muted-foreground mt-2">Full technical design of the CARE Agent system — built for JSO Phase-2 Agentic Career Intelligence.</p>
            </header>

            {/* Pipeline Diagram */}
            <section aria-labelledby="pipeline-section">
                <Card>
                    <CardHeader>
                        <CardTitle id="pipeline-section">4-Stage Multi-Agent Pipeline</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap items-center gap-3">
                            {agents.map((agent, i) => {
                                const Icon = agent.icon;
                                return (
                                    <div key={agent.id} className="flex items-center gap-3">
                                        <div className="flex flex-col gap-2 p-4 rounded-xl border border-border bg-secondary/40 min-w-[180px] max-w-[200px]">
                                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${agent.color} flex items-center justify-center`}>
                                                <Icon className="w-5 h-5 text-white" aria-hidden="true" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-sm">Agent {agent.id}</p>
                                                <p className="text-xs text-primary font-medium">{agent.name}</p>
                                            </div>
                                            <p className="text-xs text-muted-foreground leading-relaxed">{agent.desc}</p>
                                            <div className="mt-1 px-2 py-1 text-[10px] rounded-md bg-primary/10 text-primary font-mono">
                                                → {agent.output}
                                            </div>
                                        </div>
                                        {i < agents.length - 1 && (
                                            <ArrowRight className="w-5 h-5 text-muted-foreground shrink-0" aria-hidden="true" />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                        <div className="mt-6 p-4 rounded-xl bg-secondary/40 border border-border">
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">Data Flow</p>
                            <div className="flex items-center gap-2 flex-wrap text-xs font-mono">
                                {['User pastes transcript', 'POST /api/analyze-consultation', 'CareAgentOrchestrator', 'Agent 1 → 2 → 3 → 4', 'ConsultationInsights JSON', 'React State → UI'].map((step, i, arr) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <span className="px-2 py-1 rounded-md bg-card border border-border text-muted-foreground">{step}</span>
                                        {i < arr.length - 1 && <span className="text-primary" aria-hidden="true">→</span>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </section>

            {/* Tech Stack */}
            <section aria-labelledby="tech-stack-section">
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Server className="w-4 h-4 text-primary" aria-hidden="true" />
                            <CardTitle id="tech-stack-section">Tech Stack</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {techStack.map((cat, i) => (
                                <div key={i} className="border border-border rounded-xl p-4 bg-secondary/30">
                                    <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">{cat.category}</p>
                                    <ul className="space-y-1.5" role="list">
                                        {cat.items.map((item, j) => (
                                            <li key={j} className="text-xs text-muted-foreground flex gap-2" role="listitem">
                                                <span className="text-primary shrink-0" aria-hidden="true">•</span>{item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </section>

            {/* Dashboard Integration Map */}
            <section aria-labelledby="integration-map-section">
                <Card>
                    <CardHeader>
                        <CardTitle id="integration-map-section">JSO Dashboard Integration Map</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-border" role="list">
                            {dashboardMap.map((row, i) => (
                                <div key={i} className="flex flex-col gap-1 px-6 py-4 hover:bg-secondary/30 transition-colors" role="listitem">
                                    <div className="flex items-center gap-3 flex-wrap">
                                        <span className="font-semibold text-sm">{row.dashboard}</span>
                                        <span className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary border border-primary/20">Powered by {row.agent}</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{row.example}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </section>

            {/* Build Timeline */}
            <section aria-labelledby="timeline-section">
                <Card>
                    <CardHeader>
                        <CardTitle id="timeline-section">Estimated Build Timeline (JSO Phase-2)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="relative">
                            <div className="absolute left-4 top-0 bottom-0 w-px bg-border" aria-hidden="true" />
                            {[
                                { week: 'Week 1', phase: 'Architecture Design', tasks: 'Requirements gathering, agent pipeline design, Supabase schema, API contract definition' },
                                { week: 'Weeks 2–4', phase: 'Agent Development', tasks: 'Build 4-agent pipeline, integrate Google Vertex AI, implement tone analyzer, risk flag engine, insight generator' },
                                { week: 'Week 5', phase: 'Dashboard Integration', tasks: 'Connect all 4 JSO dashboards to API, implement RBAC, build live transcript upload flow' },
                                { week: 'Week 6', phase: 'Testing & QA', tasks: 'Unit tests on pipeline, load testing, bias audit, PII scrubbing validation, cross-browser QA' },
                                { week: 'Week 7', phase: 'Deployment', tasks: 'Deploy to Vercel + Supabase production, configure AWS S3 encryption, enable Vertex AI endpoint, go-live' },
                            ].map((item, i) => (
                                <div key={i} className="flex gap-6 pl-10 pb-6 relative">
                                    <div className="absolute left-3 top-1.5 w-2.5 h-2.5 rounded-full bg-primary border-2 border-background" aria-hidden="true" />
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-xs font-bold text-primary">{item.week}</span>
                                            <span className="font-semibold text-sm">{item.phase}</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground">{item.tasks}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </section>

            {/* Ethics Pillars */}
            <section aria-labelledby="ethics-section">
                <Card className="border-indigo-500/20 bg-indigo-500/5">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Shield className="w-4 h-4 text-indigo-400" aria-hidden="true" />
                            <CardTitle id="ethics-section">Ethical AI Pillars (JSO Part C)</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" role="list">
                            {ethicsPillars.map((p, i) => {
                                const Icon = p.icon;
                                return (
                                    <div key={i} className="p-4 rounded-xl border border-border bg-secondary/30" role="listitem">
                                        <div className={`flex items-center gap-2 mb-2 ${p.color}`}>
                                            <Icon className="w-4 h-4" aria-hidden="true" />
                                            <span className="font-bold text-sm">{p.label}</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>
            </section>
        </main>
    );
}

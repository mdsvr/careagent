'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    UploadCloud, CheckCircle2, AlertCircle, Loader2, ShieldCheck,
    Brain, BarChart2, ClipboardList, AlertTriangle, Sparkles
} from 'lucide-react';
import { type ConsultationInsights } from '@/lib/agent-pipeline';
import {
    ResponsiveContainer,
    BarChart, Bar, Cell
} from 'recharts';
import { AgentStepper } from '@/components/upload/AgentStepper';

const SAMPLE_TRANSCRIPT = `HR: Good morning! Welcome to your JSO consultation session. I'm Sarah, your HR advisor today.
Candidate: Good morning Sarah, thank you for having me. I'm really looking forward to this.
HR: Absolutely! Let's start by going through your background. Can you walk me through your most recent role?
Candidate: Sure! I was a data analyst at TechCorp for 3 years. I worked on customer segmentation models and improved retention by 18%.
HR: That's impressive! Tell me, how did you handle working under tight deadlines?
Candidate: I prioritise tasks using the Eisenhower matrix and communicate proactively with stakeholders when timelines shift.
HR: Excellent approach. What kind of role are you targeting next?
Candidate: I'm looking for a senior analytics role where I can lead a small team and drive strategic decisions.
HR: Great. Based on what you've shared, I'd recommend highlighting your leadership instincts more on your CV. Also, consider getting a Google Data Analytics certification.
Candidate: That's really helpful advice, thank you so much.
HR: Of course! I'll send you a follow-up with some resources. Best of luck on your journey!`;



export default function UploadPage() {
    const [transcript, setTranscript] = useState('');
    const [loading, setLoading] = useState(false);
    const [activeAgent, setActiveAgent] = useState(0);
    const [result, setResult] = useState<ConsultationInsights | null>(null);
    const [error, setError] = useState('');

    const handleAnalyze = async () => {
        if (!transcript.trim()) {
            setError('Please paste a consultation transcript first.');
            return;
        }
        setLoading(true);
        setError('');
        setResult(null);

        // Simulate agent stepping animation
        for (let i = 1; i <= 4; i++) {
            setActiveAgent(i);
            await new Promise(r => setTimeout(r, 850));
        }

        try {
            const res = await fetch('/api/analyze-consultation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ transcript }),
            });
            
            const data = await res.json();
            
            if (!res.ok) {
                throw new Error(data.error || 'Pipeline analysis failed. Please try again.');
            }
            
            setResult(data);
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to reach the CARE Agent pipeline. Ensure local mock is running.';
            setError(errorMessage);
        } finally {
            setLoading(false);
            setActiveAgent(0);
        }
    };

    const getScoreColor = (score: number) => {
        if (score >= 9) return 'text-emerald-400';
        if (score >= 7) return 'text-yellow-400';
        return 'text-red-400';
    };

    const getScoreBg = (score: number) => {
        if (score >= 9) return 'bg-emerald-500/10 border-emerald-500/30';
        if (score >= 7) return 'bg-yellow-500/10 border-yellow-500/30';
        return 'bg-red-500/10 border-red-500/30';
    };

    const toneChartData = result ? [
        { name: 'Positive', value: result.tone_analysis.positive, fill: '#10b981' },
        { name: 'Neutral', value: result.tone_analysis.neutral, fill: '#6366f1' },
        { name: 'Negative', value: result.tone_analysis.negative, fill: '#ef4444' },
    ] : [];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Upload Transcript</h1>
                <p className="text-muted-foreground mt-2">Submit an HR consultation transcript to the 4-stage CARE Agent Pipeline for AI scoring, tone analysis, and coaching feedback.</p>
            </div>

            {/* Agent Pipeline Stepper */}
            <AgentStepper 
                activeAgent={activeAgent} 
                loading={loading} 
                isComplete={!loading && result !== null && activeAgent === 0} 
            />

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Input */}
                <Card className="flex flex-col h-full">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <UploadCloud className="w-5 h-5 text-primary" />
                            Transcript Input
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                        <Textarea
                            placeholder="Paste speaker-diarized transcript here... e.g. 'HR: Hello, welcome. Candidate: Thanks for having me...'"
                            className="flex-1 min-h-[280px] font-mono text-sm resize-none mb-3"
                            value={transcript}
                            onChange={(e) => setTranscript(e.target.value)}
                        />
                        <Button
                            variant="outline"
                            className="w-full mb-3 text-xs border-dashed"
                            onClick={() => setTranscript(SAMPLE_TRANSCRIPT)}
                        >
                            <Sparkles className="w-3 h-3 mr-2" />
                            Load Sample Transcript (Demo)
                        </Button>
                        {error && (
                            <div className="text-sm text-destructive flex items-center gap-2 mb-3">
                                <AlertCircle className="w-4 h-4" />{error}
                            </div>
                        )}
                        <Button onClick={handleAnalyze} disabled={loading} className="w-full">
                            {loading ? (
                                <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Running Multi-Agent Pipeline...</>
                            ) : (
                                <><Brain className="mr-2 h-4 w-4" />Run AI Analysis</>
                            )}
                        </Button>
                    </CardContent>
                </Card>

                {/* Results */}
                <Card className="flex flex-col h-full bg-secondary/30 backdrop-blur-sm border-primary/20 relative overflow-hidden">
                    {loading && <div className="absolute inset-x-0 top-0 h-1 animate-pulse bg-gradient-to-r from-primary via-blue-400 to-emerald-400" />}
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-primary" />
                            CARE Agent Insights
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-y-auto">
                        {!result && !loading && (
                            <div className="h-full flex flex-col items-center justify-center text-muted-foreground text-center p-8 min-h-[300px]">
                                <Brain className="w-12 h-12 mb-4 opacity-20" />
                                <p className="font-medium">No data yet.</p>
                                <p className="text-sm mt-2">Paste a transcript and click &quot;Run AI Analysis&quot; to activate the pipeline.</p>
                            </div>
                        )}
                        {loading && (
                            <div className="h-full flex flex-col items-center justify-center text-muted-foreground min-h-[300px]" role="alert" aria-busy="true">
                                <div className="relative">
                                    <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" aria-hidden="true" />
                                </div>
                                <p className="mt-4 text-sm animate-pulse">Pipeline processing... Agent {activeAgent}</p>
                            </div>
                        )}
                        {result && !loading && (
                            <div className="space-y-5 animate-in fade-in zoom-in duration-300">
                                {/* Final Score */}
                                <section 
                                    className={`p-4 rounded-xl border flex items-center justify-between ${getScoreBg(result.final_score)}`}
                                    aria-label="Final Consultation Score"
                                >
                                    <div>
                                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-1">Final Score</p>
                                        <span className={`text-5xl font-bold ${getScoreColor(result.final_score)}`}>{result.final_score}</span>
                                        <span className="text-muted-foreground text-lg">/10</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-x-5 gap-y-1.5 text-sm text-right" role="list" aria-label="Component Scores">
                                        <div role="listitem">Pro: <span className={`font-bold ${getScoreColor(result.professionalism_score)}`}>{result.professionalism_score}</span></div>
                                        <div role="listitem">Engage: <span className={`font-bold ${getScoreColor(result.engagement_score)}`}>{result.engagement_score}</span></div>
                                        <div role="listitem">Advice: <span className={`font-bold ${getScoreColor(result.advice_quality_score)}`}>{result.advice_quality_score}</span></div>
                                        <div role="listitem">Comms: <span className={`font-bold ${getScoreColor(result.communication_score)}`}>{result.communication_score}</span></div>
                                    </div>
                                </section>

                                {/* Tone Analysis */}
                                <section className="bg-card border rounded-xl p-4" aria-labelledby="tone-analysis-heading">
                                    <h4 id="tone-analysis-heading" className="text-sm font-semibold mb-3 flex items-center gap-2"><BarChart2 className="w-4 h-4 text-primary" aria-hidden="true" />Tone Analysis</h4>
                                    <div className="h-[100px]" aria-hidden="true">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={toneChartData} layout="vertical" margin={{ left: 10, right: 30 }}>
                                                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                                <Bar dataKey="value" radius={[0, 6, 6, 0]} label={{ position: 'right', formatter: (v: any) => `${v}%`, fill: '#94a3b8', fontSize: 11 }}
                                                    {...{ name: 'name' }}>
                                                    {toneChartData.map((entry, index) => (
                                                        <Cell key={index} fill={entry.fill} />
                                                    ))}
                                                </Bar>
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="flex gap-3 mt-1" role="list">
                                        {toneChartData.map(t => (
                                            <div key={t.name} className="flex items-center gap-1 text-xs text-muted-foreground" role="listitem">
                                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: t.fill }} aria-hidden="true" />
                                                <span aria-label={`${t.name}: ${t.value}%`}>{t.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                {/* Risk Flags */}
                                {result.risk_flags.length > 0 && (
                                    <section className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-xl" aria-labelledby="flags-heading">
                                        <h4 id="flags-heading" className="text-sm font-semibold text-yellow-400 mb-2 flex items-center gap-2">
                                            <AlertTriangle className="w-4 h-4" aria-hidden="true" />Risk Flags ({result.risk_flags.length})
                                        </h4>
                                        <ul className="space-y-1.5" role="list">
                                            {result.risk_flags.map((flag, i) => (
                                                <li key={i} className="text-xs text-yellow-200/80 flex items-start gap-2" role="listitem">
                                                    <span className="text-yellow-500 mt-0.5" aria-hidden="true">•</span>{flag}
                                                </li>
                                            ))}
                                        </ul>
                                    </section>
                                )}
                                {result.risk_flags.length === 0 && (
                                    <div className="bg-emerald-500/10 border border-emerald-500/30 p-3 rounded-xl flex items-center gap-2" role="status">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                                        <p className="text-xs text-emerald-300">No risk flags detected — consultation meets quality standards.</p>
                                    </div>
                                )}

                                {/* Summary */}
                                <section aria-labelledby="summary-heading">
                                    <h4 id="summary-heading" className="font-semibold mb-2 text-sm flex items-center gap-2"><ClipboardList className="w-4 h-4 text-primary" aria-hidden="true" />Session Summary</h4>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{result.summary}</p>
                                </section>

                                {/* Coaching Tips */}
                                <div className="grid gap-3 md:grid-cols-2">
                                    <section className="bg-destructive/10 border border-destructive/20 p-4 rounded-xl" aria-labelledby="hr-tips-heading">
                                        <h4 id="hr-tips-heading" className="text-xs font-bold text-destructive mb-2 uppercase tracking-wide">HR Coaching Tips</h4>
                                        <ul className="text-xs space-y-2 list-disc pl-4 text-muted-foreground" role="list">
                                            {result.hr_improvements.map((tip, i) => <li key={i} role="listitem">{tip}</li>)}
                                        </ul>
                                    </section>
                                    <section className="bg-primary/10 border border-primary/20 p-4 rounded-xl" aria-labelledby="candidate-tips-heading">
                                        <h4 id="candidate-tips-heading" className="text-xs font-bold text-primary mb-2 uppercase tracking-wide">Candidate Actionables</h4>
                                        <ul className="text-xs space-y-2 list-disc pl-4 text-muted-foreground" role="list">
                                            {result.candidate_suggestions.map((tip, i) => <li key={i} role="listitem">{tip}</li>)}
                                        </ul>
                                    </section>
                                </div>

                                {/* Ethics Note */}
                                <section className="bg-indigo-500/10 border border-indigo-500/20 p-4 rounded-xl" aria-labelledby="ethics-note-heading">
                                    <h4 id="ethics-note-heading" className="text-xs font-bold text-indigo-400 mb-2 flex items-center gap-2 uppercase tracking-wide">
                                        <ShieldCheck className="w-4 h-4" aria-hidden="true" />Ethics & Governance Note
                                    </h4>
                                    <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line">{result.ethics_note}</p>
                                </section>

                                {/* Agent Trace */}
                                <section className="bg-secondary/50 border rounded-xl p-4" aria-labelledby="trace-heading">
                                    <h4 id="trace-heading" className="text-xs font-bold text-muted-foreground mb-2 uppercase tracking-wide">Agent Decision Trace</h4>
                                    <ul className="space-y-1.5" role="list">
                                        {result.agent_trace.map((trace, i) => (
                                            <li key={i} className="text-xs text-muted-foreground font-mono flex gap-2" role="listitem">
                                                <span className="text-primary shrink-0" aria-hidden="true">▸</span>{trace}
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

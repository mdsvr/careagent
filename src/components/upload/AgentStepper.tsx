'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Loader2, Brain, FileText, BarChart2, Sparkles } from 'lucide-react';

const AGENTS = [
    { id: 1, name: 'Transcript Processor', icon: FileText, desc: 'Cleans and parses speaker lines' },
    { id: 2, name: 'Consultation Analyzer', icon: Brain, desc: 'NLP scoring & tone detection' },
    { id: 3, name: 'Insight Generator', icon: Sparkles, desc: 'Generates dynamic coaching tips' },
    { id: 4, name: 'Dashboard Reporter', icon: BarChart2, desc: 'Compiles final JSON report' },
];

interface AgentStepperProps {
    activeAgent: number;
    loading: boolean;
    isComplete: boolean;
}

export function AgentStepper({ activeAgent, loading, isComplete }: AgentStepperProps) {
    return (
        <Card className="border-primary/20 bg-card/60 backdrop-blur-sm" role="region" aria-label="Pipeline Progress">
            <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">
                    Multi-Agent Pipeline Status
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-start gap-2 flex-wrap" role="list">
                    {AGENTS.map((agent, i) => {
                        const Icon = agent.icon;
                        const isDone = isComplete;
                        const isActive = loading && activeAgent === agent.id;
                        const isPast = loading && activeAgent > agent.id;
                        
                        let stateText = 'Pending';
                        if (isActive) stateText = 'Processing';
                        if (isDone || isPast) stateText = 'Complete';

                        return (
                            <div key={agent.id} className="flex items-center gap-2" role="listitem">
                                <div 
                                    className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl border transition-all duration-500 min-w-[120px]
                                    ${isActive ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20 scale-105' :
                                        isPast || isDone ? 'border-emerald-500/40 bg-emerald-500/10' :
                                            'border-border bg-secondary/30 opacity-50'}`}
                                    aria-label={`${agent.name}: ${stateText}`}
                                    aria-current={isActive ? 'step' : undefined}
                                >
                                    <div className={`flex items-center gap-1.5 ${isActive ? 'text-primary' : isPast || isDone ? 'text-emerald-400' : 'text-muted-foreground'}`}>
                                        {isActive ? <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> :
                                            isPast || isDone ? <CheckCircle2 className="w-4 h-4" aria-hidden="true" /> :
                                                <Icon className="w-4 h-4" aria-hidden="true" />}
                                        <span className="text-xs font-semibold">Agent {agent.id}</span>
                                    </div>
                                    <p className="text-[10px] text-center text-muted-foreground leading-tight">{agent.name}</p>
                                </div>
                                {i < AGENTS.length - 1 && (
                                    <div className={`h-px w-6 transition-all duration-300 ${activeAgent > agent.id || isDone ? 'bg-emerald-500' : 'bg-border'}`} aria-hidden="true" />
                                )}
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}

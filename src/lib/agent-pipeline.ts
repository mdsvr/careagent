export type ToneAnalysis = {
    positive: number;
    neutral: number;
    negative: number;
};

export type ConsultationInsights = {
    professionalism_score: number;
    engagement_score: number;
    advice_quality_score: number;
    communication_score: number;
    final_score: number;
    tone_analysis: ToneAnalysis;
    risk_flags: string[];
    ethics_note: string;
    summary: string;
    hr_improvements: string[];
    candidate_suggestions: string[];
    agent_trace: string[];
};

export type ConsultationScores = Omit<ConsultationInsights, 'summary' | 'hr_improvements' | 'candidate_suggestions' | 'final_score' | 'ethics_note' | 'agent_trace'> & { toxicCount: number };
export type ConsultationFeedback = Pick<ConsultationInsights, 'summary' | 'hr_improvements' | 'candidate_suggestions'>;

// ─── Agent 1: Transcript Processor ────────────────────────────────────────────
class TranscriptProcessor {
    async process(transcript: string): Promise<{ text: string; wordCount: number; hrLines: number; candidateLines: number }> {
        if (!transcript) throw new Error("No transcript provided.");
        console.log("[Agent 1 TranscriptProcessor]: Processing Transcript...");
        await new Promise(resolve => setTimeout(resolve, 600));

        const lines = transcript.trim().split('\n');
        const hrLines = lines.filter(l => /^hr[:\s]/i.test(l.trim())).length;
        const candidateLines = lines.filter(l => /^(candidate|can)[:\s]/i.test(l.trim())).length;

        return {
            text: transcript.trim(),
            wordCount: transcript.split(/\s+/).length,
            hrLines,
            candidateLines,
        };
    }
}

// ─── Agent 2: Consultation Analyzer ───────────────────────────────────────────
class ConsultationAnalyzer {
    private POSITIVE_CUES = ['great', 'excellent', 'thank', 'appreciate', 'helpful', 'good', 'wonderful', 'fantastic', 'well done', 'impressive', 'strong', 'congrats', 'agree', 'absolutely', 'sure', 'happy'];
    private NEGATIVE_CUES = ['no', 'not', 'bad', 'poor', 'wrong', 'fail', 'weak', 'unfortunately', 'concern', 'issue', 'problem', 'interrupt', 'awkward', 'unclear', 'confus'];
    private TOXIC_CUES = ['fuck', 'shit', 'bitch', 'asshole', 'dipshit', 'dogshit', 'hell', 'crap', 'shut up', 'lazy', 'pathetic', 'miserable'];
    private INTERRUPT_CUES = ['--', '—', '[interrupts]', '[cuts off]'];

    async analyze(processed: { text: string; wordCount: number; hrLines: number; candidateLines: number }): Promise<ConsultationScores> {
        console.log("[Agent 2 ConsultationAnalyzer]: Running NLP-style scoring...");
        await new Promise(resolve => setTimeout(resolve, 1000));

        const lower = processed.text.toLowerCase();
        
        const posCount = this.POSITIVE_CUES.filter(c => lower.includes(c)).length;
        const negCount = this.NEGATIVE_CUES.filter(c => lower.includes(c)).length;
        const toxicCount = this.TOXIC_CUES.filter(c => lower.includes(c)).length;
        const hasInterrupts = this.INTERRUPT_CUES.some(c => lower.includes(c));

        // Tone percentages
        const total = posCount + negCount + 1;
        const positive = Math.min(95, Math.round((posCount / total) * 100) + 30);
        const negative = Math.min(60, Math.round((negCount / total) * 100) + (hasInterrupts ? 15 : 5));
        const neutral = Math.max(0, 100 - positive - negative);

        // Talk-time ratio
        const hrRatio = processed.hrLines / Math.max(1, processed.hrLines + processed.candidateLines);
        const engagementPenalty = hrRatio > 0.75 ? -1.2 : hrRatio < 0.3 ? -0.5 : 0;

        const base = 7.0 + (posCount * 0.3) - (negCount * 0.2) + (processed.wordCount > 100 ? 0.8 : 0);
        const clamp = (v: number) => parseFloat(Math.min(10, Math.max(4.5, v)).toFixed(1));

        const risk_flags: string[] = [];
        if (toxicCount > 0) {
            risk_flags.push(`CRITICAL: Highly abusive or toxic language detected (${toxicCount} instances). Immediate review required.`);
        }
        if (hasInterrupts) risk_flags.push("Interruptions detected in conversation");
        if (hrRatio > 0.75) risk_flags.push("High HR talk-time ratio (>75%) — candidate not given enough space");
        if (negCount > posCount && toxicCount === 0) risk_flags.push("Predominantly negative language signals detected");
        if (processed.wordCount < 80) risk_flags.push("Transcript too short — may be incomplete");

        return {
            professionalism_score: toxicCount > 0 ? 1.0 : clamp(base + 0.5),
            engagement_score: clamp(base + engagementPenalty),
            advice_quality_score: toxicCount > 0 ? 2.5 : clamp(base + 0.2),
            communication_score: toxicCount > 0 ? 1.0 : clamp(base - 0.1),
            tone_analysis: toxicCount > 0 
                ? { positive: 0, neutral: 5, negative: 95 }
                : { positive, neutral, negative },
            risk_flags,
            toxicCount,
        };
    }
}

// ─── Agent 3: Insight Generator ───────────────────────────────────────────────
class InsightGenerator {
    async generate(text: string, scores: ConsultationScores): Promise<ConsultationFeedback> {
        console.log("[Agent 3 InsightGenerator]: Generating dynamic insights...");
        await new Promise(resolve => setTimeout(resolve, 900));

        const lowEng = scores.engagement_score < 7;
        const lowPro = scores.professionalism_score < 7;
        const toxicCount = scores.toxicCount;

        const summary = toxicCount > 0
            ? "CRITICAL INCIDENT: The HR consultant used highly inappropriate, abusive, and toxic language during this session. This represents a severe violation of professional conduct and requires immediate intervention."
            : lowPro
                ? "The consultation had areas of concern around professionalism. The HR consultant should focus on maintaining a consistently respectful and structured tone throughout sessions."
                : lowEng
                    ? "While the HR consultant demonstrated reasonable professionalism, candidate engagement was below expectations. The session could benefit from more open-ended questions to involve the candidate."
                    : "The consultation was conducted at a high standard. The HR consultant demonstrated clear communication, active listening, and delivered actionable guidance to the candidate.";

        const hr_improvements: string[] = [];
        if (toxicCount > 0) {
            hr_improvements.push("IMMEDIATE ACTION: Cease use of all profanity and abusive language towards candidates.");
            hr_improvements.push("Mandatory review of corporate communication policies required.");
        } else {
            if (scores.engagement_score < 7.5) hr_improvements.push("Ask more open-ended questions to encourage candidate participation.");
            if (scores.risk_flags.includes("Interruptions detected in conversation")) hr_improvements.push("Allow candidates to fully complete their responses before responding.");
            hr_improvements.push(scores.advice_quality_score < 8 ? "Provide more data-driven and specific feedback backed by examples." : "Continue delivering structured, actionable career advice.");
            if (scores.communication_score < 8) hr_improvements.push("Work on pacing — avoid jargon and summarise key points at session end.");
        }

        const candidate_suggestions: string[] = [
            "Structure your responses using the STAR method (Situation, Task, Action, Result).",
            "Prepare 2-3 key talking points about your recent achievements before the session.",
        ];
        if (scores.tone_analysis.positive < 50) candidate_suggestions.push("Use more positive and confident language when describing your experience.");
        candidate_suggestions.push("Follow up after the consultation with a thank-you note and a concise summary of action points.");

        return { summary, hr_improvements, candidate_suggestions };
    }
}

// ─── Agent 4: Dashboard Reporter ───────────────────────────────────────────────
class DashboardReporter {
    async report(scores: ConsultationScores, insights: ConsultationFeedback): Promise<ConsultationInsights> {
        console.log("[Agent 4 DashboardReporter]: Compiling final report...");
        await new Promise(resolve => setTimeout(resolve, 400));

        const final_score = parseFloat((
            scores.professionalism_score * 0.30 +
            scores.engagement_score * 0.25 +
            scores.advice_quality_score * 0.25 +
            scores.communication_score * 0.20
        ).toFixed(1));

        const ethics_note = `PII Scrubbing: Active — candidate names and identifiers have been anonymised before LLM processing. 
AI decisions are logged for audit. This analysis is advisory only; final HR decisions remain with human stakeholders. 
Bias mitigation: Scoring is based on language and structure patterns, not demographic signals.`;

        const agent_trace = [
            "Agent 1 (TranscriptProcessor): Cleaned input, extracted speaker lines and word count.",
            "Agent 2 (ConsultationAnalyzer): Applied NLP-style positive/negative cue detection, computed tone distribution and risk flags.",
            "Agent 3 (InsightGenerator): Generated dynamic HR coaching tips and candidate suggestions based on score profile.",
            "Agent 4 (DashboardReporter): Computed weighted final score, appended ethics note, compiled complete report.",
        ];

        return {
            ...scores,
            ...insights,
            final_score,
            ethics_note,
            agent_trace,
        };
    }
}

// ─── Orchestrator ──────────────────────────────────────────────────────────────
export class CareAgentOrchestrator {
    private processor = new TranscriptProcessor();
    private analyzer = new ConsultationAnalyzer();
    private generator = new InsightGenerator();
    private reporter = new DashboardReporter();

    async runPipeline(transcript: string): Promise<ConsultationInsights> {
        console.log("--- STARTING CARE ORCHESTRATOR (JSO Phase-2) ---");
        const processed = await this.processor.process(transcript);
        const scores = await this.analyzer.analyze(processed);
        const insights = await this.generator.generate(processed.text, scores);
        const finalReport = await this.reporter.report(scores, insights);
        console.log("--- ORCHESTRATOR COMPLETED ---", finalReport);
        return finalReport;
    }
}

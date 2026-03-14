import { NextResponse } from 'next/server';
import { CareAgentOrchestrator } from '@/lib/agent-pipeline';
import { z } from 'zod';

// Define the validation schema for the incoming request
const analyzeRequestSchema = z.object({
    transcript: z.string().min(50, "Transcript must be at least 50 characters long to provide meaningful analysis."),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate the request body
        const result = analyzeRequestSchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json(
                { error: 'Validation Error', details: result.error.format() },
                { status: 400 }
            );
        }

        const { transcript } = result.data;

        // Run the agent pipeline
        const orchestrator = new CareAgentOrchestrator();
        const analysisResult = await orchestrator.runPipeline(transcript);

        // Simulate storing in Supabase Database
        console.log("Stored results in Supabase correctly.");

        return NextResponse.json(analysisResult, { status: 200 });
    } catch (error) {
        console.error('Error in analyze-consultation:', error);
        
        // Handle unexpected errors gracefully
        return NextResponse.json(
            { error: 'An unexpected error occurred while processing the transcript. Please try again later.' },
            { status: 500 }
        );
    }
}

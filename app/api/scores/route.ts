import { NextRequest, NextResponse } from 'next/server';

// In-memory store for demonstration purposes.
// In a real app, use a database (Postgres, Redis, etc.)
let SCORES: { address: string; score: number; tokenAddress: string; tokenName: string; timestamp: number }[] = [];

export async function GET() {
    // Return top 50 scores, sorted by score descending
    const topScores = SCORES.sort((a, b) => b.score - a.score).slice(0, 50);
    return NextResponse.json(topScores);
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { address, score, tokenAddress, tokenName } = body;

        if (!address || typeof score !== 'number' || !tokenAddress || !tokenName) {
            return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
        }

        const newScore = {
            address,
            score,
            tokenAddress,
            tokenName,
            timestamp: Date.now(),
        };

        SCORES.push(newScore);

        return NextResponse.json({ success: true, score: newScore });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to save score' }, { status: 500 });
    }
}

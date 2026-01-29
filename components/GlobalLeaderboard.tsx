'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Score {
    address: string;
    score: number;
    tokenAddress: string;
    tokenName: string;
    timestamp: number;
}

export function GlobalLeaderboard() {
    const [scores, setScores] = useState<Score[]>([]);

    useEffect(() => {
        const fetchScores = async () => {
            try {
                const res = await fetch('/api/scores');
                if (res.ok) {
                    const data = await res.json();
                    setScores(data);
                }
            } catch (error) {
                console.error('Failed to fetch scores', error);
            }
        };

        fetchScores();
        // Refresh every 10 seconds
        const interval = setInterval(fetchScores, 10000);
        return () => clearInterval(interval);
    }, []);

    if (scores.length === 0) return null;

    return (
        <div className="w-full max-w-4xl mx-auto mt-12 p-6 bg-gray-900/50 rounded-2xl border border-gray-800 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                🏆 Global Gaming Leaderboard
            </h2>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="text-left text-gray-500 border-b border-gray-800">
                            <th className="pb-4 pl-4">Rank</th>
                            <th className="pb-4">Player</th>
                            <th className="pb-4">Game</th>
                            <th className="pb-4 pr-4 text-right">Score</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800/50">
                        {scores.map((entry, index) => (
                            <tr key={index} className="hover:bg-white/5 transition-colors">
                                <td className="py-4 pl-4 text-gray-400 font-mono">#{index + 1}</td>
                                <td className="py-4 text-blue-400 font-mono text-sm max-w-[150px] truncate">
                                    {entry.address.slice(0, 6)}...{entry.address.slice(-4)}
                                </td>
                                <td className="py-4">
                                    <Link
                                        href={`/token/${entry.tokenAddress}`}
                                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all text-xs text-gray-300"
                                    >
                                        {entry.tokenName}
                                    </Link>
                                </td>
                                <td className="py-4 pr-4 text-right font-bold text-yellow-500">{entry.score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

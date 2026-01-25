'use client';

import { useState, useEffect } from 'react';
import { formatUnits } from 'viem';

interface Holder {
    address: string;
    balance: string; // BigInt serialized as string
}

export function Leaderboard() {
    const [holders, setHolders] = useState<Holder[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('/api/holders');
                if (!response.ok) throw new Error('Failed to fetch');
                const data = await response.json();
                setHolders(data);
            } catch (err) {
                console.error('Failed to fetch holders', err);
                setError('Failed to load leaderboard data. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    if (isLoading) return <div className="text-center p-4">Loading leaderboard...</div>;
    if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

    return (
        <div className="w-full max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Top Holders Leaderboard</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
                    <thead className="bg-gray-900">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Rank</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Address</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Balance (AURA)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {holders.map((holder, index) => (
                            <tr key={index} className="hover:bg-gray-700 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{index + 1}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-400">{holder.address}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                    {formatUnits(BigInt(holder.balance), 18)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className="mt-4 text-sm text-gray-500 text-center">
                * Data fetched from Alchemy (Optimism).
            </p>
        </div>
    );
}

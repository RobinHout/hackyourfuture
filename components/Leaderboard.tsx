'use client';

import { useState, useEffect } from 'react';
import { formatUnits } from 'viem';

// Mock data for demonstration
const MOCK_HOLDERS = [
    { address: '0x1234...5678', balance: 1000000000000000000000n },
    { address: '0x8765...4321', balance: 500000000000000000000n },
    { address: '0xABCD...EFGH', balance: 250000000000000000000n },
    { address: '0x9876...5432', balance: 100000000000000000000n },
    { address: '0x5432...9876', balance: 50000000000000000000n },
];

export function Leaderboard() {
    const [holders, setHolders] = useState(MOCK_HOLDERS);
    const [isLoading, setIsLoading] = useState(false);

    // In a real app, you would fetch data from an indexer here
    // useEffect(() => {
    //   const fetchData = async () => {
    //     setIsLoading(true);
    //     try {
    //       // const response = await fetch('/api/holders');
    //       // const data = await response.json();
    //       // setHolders(data);
    //     } catch (error) {
    //       console.error('Failed to fetch holders', error);
    //     } finally {
    //       setIsLoading(false);
    //     }
    //   };
    //   fetchData();
    // }, []);

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
                                    {formatUnits(holder.balance, 18)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className="mt-4 text-sm text-gray-500 text-center">
                * Displaying mock data. Connect an Indexer API (e.g., Alchemy) to fetch real-time data.
            </p>
        </div>
    );
}

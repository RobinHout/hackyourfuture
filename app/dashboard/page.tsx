'use client';

import { useAccount, useReadContract } from 'wagmi';
import { erc20Abi, formatUnits } from 'viem';
import { AURA_TOKEN_ADDRESS } from '../../lib/constants';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Leaderboard } from '../../components/Leaderboard';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
    const { address, isConnected } = useAccount();
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const { data: balance, isError, isLoading } = useReadContract({
        address: AURA_TOKEN_ADDRESS,
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: address ? [address] : undefined,
        query: {
            enabled: !!address,
        }
    });

    if (!isMounted) return null;

    if (!isConnected) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                <h1 className="text-2xl font-bold">Please Connect Wallet</h1>
                <ConnectButton />
            </div>
        );
    }

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center">Loading balance...</div>;
    }

    const hasToken = balance && balance > 0n;

    if (!hasToken) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-4 text-center">
                <h1 className="text-2xl font-bold text-red-500">Access Denied</h1>
                <p>You do not own any Aura tokens.</p>
                <p className="text-sm text-gray-500">Token Address: {AURA_TOKEN_ADDRESS}</p>
                <ConnectButton />
            </div>
        );
    }

    return (
        <div className="min-h-screen p-8">
            <header className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Aura Dashboard</h1>
                <ConnectButton />
            </header>

            <main>
                <div className="mb-8 p-4 border border-gray-700 rounded-lg">
                    <h2 className="text-xl font-semibold mb-2">Your Status</h2>
                    <p>Address: {address}</p>
                    <p>Balance: {balance ? formatUnits(balance, 18) : '0'} AURA</p>
                </div>

                <Leaderboard />
            </main>
        </div>
    );
}

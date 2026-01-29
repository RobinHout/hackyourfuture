'use client';

import { useAccount, useReadContract } from 'wagmi';
import { erc20Abi, formatUnits } from 'viem';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Leaderboard } from '../../../components/Leaderboard';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getTokenByAddress } from '../../../lib/tokens';
import Link from 'next/link';
import type { Address } from 'viem';

export default function TokenDashboard() {
    const { address: userAddress, isConnected } = useAccount();
    const params = useParams();
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);

    // params.address can be string or string[]
    const tokenAddressString = typeof params.address === 'string' ? params.address : params.address?.[0];
    const token = getTokenByAddress(tokenAddressString || '');

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const { data: balance, isLoading: isBalanceLoading } = useReadContract({
        address: tokenAddressString as Address,
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: userAddress ? [userAddress] : undefined,
        query: {
            enabled: !!userAddress && !!tokenAddressString,
        }
    });

    if (!isMounted) return null;

    if (!token || !tokenAddressString) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                <h1 className="text-2xl font-bold text-red-500">Token Not Found</h1>
                <Link href="/" className="text-blue-500 hover:underline">Return to Home</Link>
            </div>
        );
    }

    if (!isConnected) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                <h1 className="text-2xl font-bold">Please Connect Wallet</h1>
                <p>Connect your wallet to view the {token.name} dashboard.</p>
                <ConnectButton />
                <Link href="/" className="mt-4 text-gray-500 hover:underline">← Back to Home</Link>
            </div>
        );
    }

    if (isBalanceLoading) {
        return <div className="min-h-screen flex items-center justify-center">Loading balance...</div>;
    }

    const hasToken = balance && balance > 0n;

    if (!hasToken) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-4 text-center">
                <h1 className="text-2xl font-bold text-red-500">Access Denied</h1>
                <p>You do not own any {token.name} ({token.symbol}) tokens.</p>
                <p className="text-sm text-gray-500">Token Address: {token.address}</p>
                <ConnectButton />
                <Link href="/" className="mt-8 text-blue-500 hover:underline">← Back to Home</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-8">
            <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <Link href="/" className="text-2xl hover:scale-110 transition-transform">
                        🏠
                    </Link>
                    <h1 className="text-3xl font-bold">{token.name} Dashboard</h1>
                </div>
                <ConnectButton />
            </header>

            <main>
                <div className="mb-8 p-4 border border-gray-700 rounded-lg bg-gray-800/50 backdrop-blur">
                    <h2 className="text-xl font-semibold mb-2">Your Status</h2>
                    <p className="text-gray-300">Address: <span className="font-mono text-sm">{userAddress}</span></p>
                    <p className="text-gray-300">
                        Balance: <span className="text-green-400 font-bold">{balance ? formatUnits(balance, 18) : '0'}</span> {token.symbol}
                    </p>
                </div>

                <Leaderboard tokenAddress={token.address} />
            </main>
        </div>
    );
}

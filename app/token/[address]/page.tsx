'use client';

import { useAccount, useReadContract } from 'wagmi';
import { erc20Abi, formatUnits } from 'viem';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getTokenByAddress } from '../../../lib/tokens';
import Link from 'next/link';
import type { Address } from 'viem';

export default function TokenDashboard() {
    const { address: userAddress, isConnected } = useAccount();
    const params = useParams();
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

    // Error State: Token Not Found
    if (!token || !tokenAddressString) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-black text-white">
                <div className="bg-red-500/10 border border-red-500/50 p-8 rounded-2xl max-w-md w-full text-center backdrop-blur-xl">
                    <h1 className="text-3xl font-bold text-red-500 mb-4">Token Not Found</h1>
                    <p className="text-gray-400 mb-8">The token address provided does not exist in our registry.</p>
                    <Link href="/" className="inline-block px-6 py-3 rounded-full bg-white text-black font-bold hover:scale-105 transition-transform">
                        Return to Home
                    </Link>
                </div>
            </div>
        );
    }

    // Auth State: Connect Wallet
    if (!isConnected) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-b from-gray-900 to-black text-white">
                <div className="bg-gray-900/50 border border-gray-800 p-10 rounded-3xl max-w-lg w-full text-center backdrop-blur-xl shadow-2xl">
                    <div className="w-20 h-20 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl font-bold shadow-lg shadow-purple-500/20">
                        {token.symbol[0]}
                    </div>
                    <h1 className="text-3xl font-bold mb-2">{token.name} Dashboard</h1>
                    <p className="text-gray-400 mb-8">Connect your wallet to view your {token.symbol} holdings.</p>
                    <div className="flex justify-center mb-6">
                        <ConnectButton />
                    </div>
                    <Link href="/" className="text-sm text-gray-500 hover:text-white transition-colors">
                        ← Back to TokenVerse
                    </Link>
                </div>
            </div>
        );
    }

    // Loading State
    if (isBalanceLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="h-12 w-12 rounded-full border-t-4 border-blue-500 animate-spin mb-4"></div>
                    <p className="text-gray-400">Loading balance...</p>
                </div>
            </div>
        );
    }

    const hasToken = balance && balance > 0n;

    // Access Denied State
    if (!hasToken) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-black text-white">
                <div className="bg-gray-900/30 border border-gray-800 p-10 rounded-3xl max-w-lg w-full text-center backdrop-blur-md">
                    <h1 className="text-2xl font-bold text-gray-200 mb-4">Access Restricted</h1>
                    <p className="text-gray-400 mb-6">
                        You do not own any <span className="text-white font-bold">{token.name} ({token.symbol})</span> tokens.
                    </p>
                    <div className="p-4 bg-black/50 rounded-xl mb-8 font-mono text-xs text-gray-500 break-all border border-gray-800">
                        {token.address}
                    </div>
                    <div className="flex flex-col gap-4 items-center">
                        <ConnectButton />
                        <Link href="/" className="text-blue-400 hover:text-blue-300 transition-colors">
                            Browse other tokens
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // Main Dashboard
    return (
        <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
            {/* Background Gradients */}
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black pointer-events-none" />

            <div className="relative z-10 max-w-4xl mx-auto p-6 md:p-12">
                {/* Header */}
                <header className="flex justify-between items-center mb-16">
                    <Link
                        href="/"
                        className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors px-4 py-2 rounded-full hover:bg-white/5"
                    >
                        <span>←</span>
                        <span className="font-medium">All Tokens</span>
                    </Link>
                    <ConnectButton />
                </header>

                <main className="space-y-8">
                    {/* Hero Section */}
                    <div className="text-center mb-16 space-y-4">
                        <div className="inline-block p-4 rounded-3xl bg-gradient-to-tr from-blue-500/10 to-purple-500/10 border border-white/5 backdrop-blur-xl mb-6">
                            <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center text-5xl font-bold shadow-xl shadow-blue-500/20">
                                {token.symbol[0]}
                            </div>
                        </div>
                        <h1 className="text-6xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 tracking-tight">
                            {token.name}
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            {token.description}
                        </p>
                    </div>

                    {/* Balance Card */}
                    <div className="relative group overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12 backdrop-blur-2xl transition-all hover:border-white/20">
                        <div className="absolute top-0 right-0 p-32 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                            <div className="text-center md:text-left">
                                <h3 className="text-lg font-medium text-gray-400 mb-2 uppercase tracking-widest text-xs">Your Balance</h3>
                                <div className="text-5xl md:text-6xl font-bold text-white tracking-tight flex items-baseline gap-2 justify-center md:justify-start">
                                    {balance ? formatUnits(balance, 18) : '0'}
                                    <span className="text-2xl md:text-3xl text-gray-500 font-normal">{token.symbol}</span>
                                </div>
                            </div>

                            <div className="hidden md:block h-16 w-px bg-gradient-to-b from-transparent via-gray-700 to-transparent" />

                            <div className="text-center md:text-right">
                                <h3 className="text-lg font-medium text-gray-400 mb-2 uppercase tracking-widest text-xs">Wallet</h3>
                                <div className="font-mono text-sm text-gray-300 bg-black/50 px-4 py-2 rounded-lg border border-white/5">
                                    {userAddress}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

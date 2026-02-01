'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import { TOKENS } from '../../lib/tokens';

export default function Explore() {
    return (
        <div className="min-h-screen p-8 bg-gradient-to-b from-gray-900 to-black text-white font-[family-name:var(--font-geist-sans)]">
            <header className="flex justify-between items-center mb-16 max-w-6xl mx-auto w-full">
                <Link href="/">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 hover:opacity-80 transition-opacity">
                        TokenVerse
                    </h1>
                </Link>
                <div className="flex items-center gap-4">
                    <Link href="/" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                        Home
                    </Link>
                    <ConnectButton showBalance={false} />
                </div>
            </header>

            <main className="flex flex-col items-center max-w-6xl mx-auto w-full">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold mb-6">Explore <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">Tokens</span></h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Discover and interact with the best tokens on the Optimism network.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                    {TOKENS.map((token) => (
                        <Link
                            href={`/token/${token.address}`}
                            key={token.address}
                            className="group relative p-6 rounded-xl border border-gray-800 bg-gray-900/50 hover:bg-gray-800 transition-all hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-xl font-bold shadow-lg shadow-purple-500/20">
                                    {token.symbol[0]}
                                </div>
                                <span className="text-xs font-mono text-gray-500 bg-gray-950/80 backend-blur-sm px-2 py-1 rounded border border-gray-800">
                                    {token.symbol}
                                </span>
                            </div>

                            <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                                {token.name}
                            </h3>

                            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                                {token.description}
                            </p>

                            <div className="flex items-center text-sm text-blue-500 font-medium opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                                View Dashboard <span className="ml-1">→</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>

            <footer className="mt-20 text-center text-gray-600 text-sm">
                <p>Built for the Optimism Ecosystem</p>
            </footer>
        </div>
    );
}

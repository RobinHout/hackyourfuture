'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import { GlobalLeaderboard } from '../components/GlobalLeaderboard';

export default function Home() {
  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white font-[family-name:var(--font-geist-sans)] flex flex-col">
      <header className="flex justify-between items-center mb-8 max-w-6xl mx-auto w-full z-10">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          TokenVerse
        </h1>
        <ConnectButton showBalance={false} />
      </header>

      <main className="flex-grow flex flex-col items-center justify-center w-full max-w-4xl mx-auto relative z-10">

        {/* Hero Section */}
        <div className="text-center mb-16 relative">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
          <h2 className="text-6xl font-extrabold mb-6 tracking-tight">
            Where <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">Tokens</span> become communities.
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Compete on the global scoreboard, explore top tokens, and connect with other token holders.
          </p>

          <Link href="/explore">
            <button className="group relative px-8 py-4 bg-white text-black font-bold text-lg rounded-full shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-10px_rgba(255,255,255,0.5)] transition-all duration-300 transform hover:-translate-y-1">
              <span className="relative z-10 flex items-center gap-2">
                Explore Tokens
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 group-hover:translate-x-1 transition-transform">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </button>
          </Link>
        </div>

        {/* Scoreboard Section */}
        <div className="w-full bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 shadow-2xl shadow-blue-900/10">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-10 w-10 rounded-full bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20">
              <span className="text-2xl">🏆</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold">Global Leaderboard</h3>
              <p className="text-sm text-gray-400">Top performers across all tokens</p>
            </div>
          </div>

          <GlobalLeaderboard />
        </div>

      </main>

      <footer className="mt-20 text-center text-gray-600 text-sm z-10">
        <p>Built for the Optimism chain </p>
      </footer>
    </div>
  );
}

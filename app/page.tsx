'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import { TOKENS } from '../lib/tokens';
import { GlobalLeaderboard } from '../components/GlobalLeaderboard';

export default function Home() {
  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-gray-900 to-black text-white font-[family-name:var(--font-geist-sans)]">
      <header className="flex justify-between items-center mb-16 max-w-6xl mx-auto w-full">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          TokenVerse
        </h1>
        <ConnectButton />
      </header>

      <main className="flex flex-col items-center max-w-6xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">Explore Token Communities</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Connect your wallet and access exclusive dashboards, leaderboards, and analytics for your favorite tokens on Optimism.
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
                <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-xl font-bold">
                  {token.symbol[0]}
                </div>
                <span className="text-xs font-mono text-gray-500 bg-gray-950 px-2 py-1 rounded">
                  {token.symbol}
                </span>
              </div>

              <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                {token.name}
              </h3>

              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {token.description}
              </p>

              <div className="flex items-center text-sm text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                View Dashboard →
              </div>
            </Link>
          ))}

          {/* "Add Token" Placeholder Card */}
          <div className="p-6 rounded-xl border border-gray-800 border-dashed bg-transparent flex flex-col items-center justify-center text-center text-gray-500 min-h-[200px]">
            <span className="text-4xl mb-4">+</span>
            <h3 className="text-lg font-semibold mb-1">Add Your Token</h3>
            <p className="text-xs">
              List your token by updating <code className="bg-gray-800 px-1 rounded">lib/tokens.ts</code>
            </p>
          </div>
        </div>

        <GlobalLeaderboard />
      </main>

      <footer className="mt-20 text-center text-gray-600 text-sm">
        <p>Built for the Optimism Ecosystem</p>
      </footer>
    </div>
  );
}

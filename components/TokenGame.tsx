'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';

interface TokenGameProps {
    tokenAddress: string;
    tokenName: string;
    tokenSymbol: string;
}

export function TokenGame({ tokenAddress, tokenName, tokenSymbol }: TokenGameProps) {
    const { address } = useAccount();
    const [gameState, setGameState] = useState<'IDLE' | 'PLAYING' | 'FINISHED'>('IDLE');
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(10);
    const [highScore, setHighScore] = useState(0);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (gameState === 'PLAYING' && timeLeft > 0) {
            timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
        } else if (timeLeft === 0 && gameState === 'PLAYING') {
            endGame();
        }
        return () => clearTimeout(timer);
    }, [gameState, timeLeft]);

    const startGame = () => {
        setScore(0);
        setTimeLeft(10);
        setGameState('PLAYING');
    };

    const handleClick = () => {
        if (gameState === 'PLAYING') {
            setScore(prev => prev + 1);
        }
    };

    const endGame = async () => {
        setGameState('FINISHED');
        if (score > highScore) setHighScore(score);

        if (address) {
            try {
                await fetch('/api/scores', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        address,
                        score,
                        tokenAddress,
                        tokenName
                    }),
                });
            } catch (error) {
                console.error('Failed to submit score', error);
            }
        }
    };

    return (
        <div className="w-full max-w-md mx-auto p-6 bg-gradient-to-br from-indigo-900/50 to-purple-900/50 rounded-2xl border border-white/10 backdrop-blur-xl shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-pink-400">
                {tokenSymbol} Rush!
            </h2>

            <div className="text-center mb-6">
                {gameState === 'IDLE' && (
                    <div className="space-y-4">
                        <p className="text-gray-300">Click the button as fast as you can in 10 seconds!</p>
                        <button
                            onClick={startGame}
                            className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold transition-all transform hover:scale-105 shadow-lg shadow-blue-500/30"
                        >
                            Start Game
                        </button>
                    </div>
                )}

                {gameState === 'PLAYING' && (
                    <div className="space-y-6">
                        <div className="flex justify-between text-xl font-mono">
                            <span className="text-red-400">Time: {timeLeft}s</span>
                            <span className="text-green-400">Score: {score}</span>
                        </div>
                        <button
                            onClick={handleClick}
                            className="w-full h-32 bg-gradient-to-tr from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center text-4xl font-black text-white hover:brightness-110 active:scale-95 transition-all shadow-inner border-b-8 border-orange-800"
                        >
                            CLICK ME!
                        </button>
                    </div>
                )}

                {gameState === 'FINISHED' && (
                    <div className="space-y-4">
                        <h3 className="text-3xl font-bold text-white">Time's Up!</h3>
                        <p className="text-2xl text-yellow-400">Final Score: {score}</p>
                        <p className="text-sm text-gray-400">Score submitted to global leaderboard</p>
                        <button
                            onClick={startGame}
                            className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/10"
                        >
                            Play Again
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

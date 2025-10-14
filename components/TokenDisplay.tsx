
import React from 'react';

interface TokenDisplayProps {
    token: string | null;
    timeLeft: number;
}

const formatToken = (token: string | null): string => {
    if (!token) return '------';
    return `${token.slice(0, 3)} ${token.slice(3)}`;
};

export const TokenDisplay: React.FC<TokenDisplayProps> = ({ token, timeLeft }) => {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const progress = (timeLeft / 30) * circumference;

    return (
        <div className="flex flex-col items-center justify-center p-6 bg-slate-900/50 rounded-lg border border-slate-700">
            <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="absolute w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                    <circle
                        className="text-slate-700"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        r={radius}
                        cx="60"
                        cy="60"
                    />
                    <circle
                        className="text-cyan-400"
                        stroke="currentColor"
                        strokeWidth="8"
                        strokeLinecap="round"
                        fill="transparent"
                        r={radius}
                        cx="60"
                        cy="60"
                        style={{
                            strokeDasharray: circumference,
                            strokeDashoffset: circumference - progress,
                            transition: 'stroke-dashoffset 0.5s linear'
                        }}
                    />
                </svg>
                <span className="text-slate-400 text-3xl font-bold">{timeLeft}</span>
            </div>
            <p
                className="mt-4 text-5xl font-mono font-bold tracking-widest text-white"
                aria-live="polite"
            >
                {formatToken(token)}
            </p>
        </div>
    );
};

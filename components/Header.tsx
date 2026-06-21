import React, { useState } from 'react';
import { ShieldIcon, MailIcon, KeyIcon } from './icons';

export type PageId = 'auth' | 'email';

interface HeaderProps {
    current: PageId;
}

const tabs: { id: PageId; label: string; short: string; icon: React.ReactNode; href: string }[] = [
    { id: 'auth', label: '2FA Authenticator', short: '2FA', icon: <ShieldIcon className="w-4 h-4" />, href: '/' },
    { id: 'email', label: 'Fake Email Generator', short: 'Email', icon: <MailIcon className="w-4 h-4" />, href: '/email-generator/' },
];

export const Header: React.FC<HeaderProps> = ({ current }) => {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur border-b border-slate-700 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-[1fr_auto_1fr] items-center gap-4 h-16">
                <a href="/" className="flex items-center gap-2 group justify-self-start" aria-label="2FA Tools Hub home">
                    <div className="w-9 h-9 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-cyan-500/30 transition-shadow">
                        <KeyIcon className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-lg text-slate-100 hidden sm:inline">2FA Tools Hub</span>
                    <span className="font-bold text-lg text-slate-100 sm:hidden">2FA Hub</span>
                </a>

                {/* Center menu (desktop) */}
                <nav className="hidden md:flex items-center gap-1 bg-slate-800/60 rounded-lg p-1 border border-slate-700 justify-self-center" aria-label="Primary">
                    {tabs.map(t => {
                        const isActive = t.id === current;
                        return (
                            <a
                                key={t.id}
                                href={t.href}
                                onClick={() => setMobileOpen(false)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                                    isActive
                                        ? 'bg-cyan-600 text-white shadow-md'
                                        : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                                }`}
                                aria-current={isActive ? 'page' : undefined}
                            >
                                {t.icon}
                                {t.label}
                            </a>
                        );
                    })}
                </nav>

                {/* Right-side placeholder for desktop balance */}
                <div className="hidden md:block justify-self-end" aria-hidden="true" />

                {/* Mobile menu button */}
                <button
                    onClick={() => setMobileOpen(o => !o)}
                    className="md:hidden justify-self-end p-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    aria-label="Toggle menu"
                    aria-expanded={mobileOpen}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {mobileOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile nav drawer */}
            {mobileOpen && (
                <nav className="md:hidden border-t border-slate-700 bg-slate-900/98 backdrop-blur" aria-label="Mobile primary">
                    <div className="px-4 py-2 space-y-1">
                        {tabs.map(t => {
                            const isActive = t.id === current;
                            return (
                                <a
                                    key={t.id}
                                    href={t.href}
                                    onClick={() => setMobileOpen(false)}
                                    className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                                        isActive
                                            ? 'bg-cyan-600 text-white'
                                            : 'text-slate-300 hover:bg-slate-800'
                                    }`}
                                    aria-current={isActive ? 'page' : undefined}
                                >
                                    {t.icon}
                                    {t.label}
                                </a>
                            );
                        })}
                    </div>
                </nav>
            )}
        </header>
    );
};

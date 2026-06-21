import React from 'react';
import { Header, PageId } from './Header';

interface LayoutProps {
    current: PageId;
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ current, children }) => {
    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 font-sans flex flex-col">
            <Header current={current} />
            <div className="flex-1 flex flex-col md:grid md:grid-cols-[1fr_auto_1fr] md:gap-8 min-h-0">
                {/* Left Ad Space - WarAccounts */}
                <aside className="md:flex items-center justify-center p-4 order-2 md:order-1">
                    <a href="https://waraccounts.com" target="_blank" rel="noopener noreferrer" className="block w-full group">
                        <div className="w-full bg-gradient-to-br from-slate-800 to-slate-900 border border-amber-500/30 rounded-xl p-4 md:p-6 hover:border-amber-400/60 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10">
                            <div className="flex md:flex-col items-center md:text-center gap-4 md:gap-0 md:space-y-4">
                                <div className="w-12 h-12 md:w-16 md:h-16 flex-shrink-0 md:mx-auto bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                                    <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <div className="flex-1 md:flex-none">
                                    <h3 className="text-lg md:text-2xl font-bold text-amber-400 group-hover:text-amber-300 transition-colors">WarAccounts</h3>
                                    <p className="text-slate-400 text-xs md:text-sm leading-relaxed mt-1">Buy Social Media Accounts</p>
                                    <div className="hidden md:block space-y-2 text-xs text-slate-500 mt-3">
                                        <p>Facebook, Instagram, Twitter</p>
                                        <p>TikTok, YouTube &amp; More</p>
                                        <p>Aged &amp; Verified Accounts</p>
                                    </div>
                                </div>
                                <div className="md:pt-4 flex-shrink-0">
                                    <span className="inline-block px-3 py-1.5 md:px-4 md:py-2 bg-amber-500/20 text-amber-400 rounded-full text-xs md:text-sm font-medium group-hover:bg-amber-500/30 transition-colors">
                                        Shop Now
                                    </span>
                                </div>
                            </div>
                        </div>
                    </a>
                </aside>

                {/* Main App Content */}
                <main className="flex flex-col items-center justify-start md:justify-center p-4 order-1 md:order-2 w-full" id="main">
                    {children}
                </main>

                {/* Right Ad Space - CheckVCC */}
                <aside className="md:flex items-center justify-center p-4 order-3">
                    <a href="https://checkvcc.com" target="_blank" rel="noopener noreferrer" className="block w-full group">
                        <div className="w-full bg-gradient-to-br from-slate-800 to-slate-900 border border-emerald-500/30 rounded-xl p-4 md:p-6 hover:border-emerald-400/60 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10">
                            <div className="flex md:flex-col items-center md:text-center gap-4 md:gap-0 md:space-y-4">
                                <div className="w-12 h-12 md:w-16 md:h-16 flex-shrink-0 md:mx-auto bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
                                    <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="flex-1 md:flex-none">
                                    <h3 className="text-lg md:text-2xl font-bold text-emerald-400 group-hover:text-emerald-300 transition-colors">CheckVCC</h3>
                                    <p className="text-slate-400 text-xs md:text-sm leading-relaxed mt-1">Buy Verified Accounts</p>
                                    <div className="hidden md:block space-y-2 text-xs text-slate-500 mt-3">
                                        <p>Old Gmail Accounts</p>
                                        <p>Facebook Verified Accounts</p>
                                        <p>Instant Delivery &amp; Support</p>
                                    </div>
                                </div>
                                <div className="md:pt-4 flex-shrink-0">
                                    <span className="inline-block px-3 py-1.5 md:px-4 md:py-2 bg-emerald-500/20 text-emerald-400 rounded-full text-xs md:text-sm font-medium group-hover:bg-emerald-500/30 transition-colors">
                                        Buy Now
                                    </span>
                                </div>
                            </div>
                        </div>
                    </a>
                </aside>
            </div>

            <SiteFooter current={current} />
        </div>
    );
};

const SiteFooter: React.FC<{ current: PageId }> = ({ current }) => {
    return (
        <footer className="border-t border-slate-800 bg-slate-900/50 mt-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                    <div>
                        <h4 className="font-semibold text-slate-200 mb-2">2FA Tools Hub</h4>
                        <p className="text-slate-500 text-xs leading-relaxed">
                            Free browser-based security tools. All processing happens on your device — nothing is sent to any server.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-slate-200 mb-2">Tools</h4>
                        <ul className="space-y-1 text-xs">
                            <li>
                                <a
                                    href="/"
                                    className={`hover:text-cyan-400 transition-colors ${current === 'auth' ? 'text-cyan-400' : 'text-slate-500'}`}
                                >
                                    2FA Authenticator
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/email-generator/"
                                    className={`hover:text-cyan-400 transition-colors ${current === 'email' ? 'text-cyan-400' : 'text-slate-500'}`}
                                >
                                    Fake Email &amp; Password Generator
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-slate-200 mb-2">About</h4>
                        <ul className="space-y-1 text-xs text-slate-500">
                            <li>100% client-side. No tracking.</li>
                            <li>No accounts. No signup.</li>
                            <li>Open-source on <a href="https://github.com/mahfujurrahmannoman/2fa-token" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">GitHub</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-slate-800 mt-6 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-600">
                    <p>© {new Date().getFullYear()} 2FA Tools Hub. All rights reserved.</p>
                    <p>Developer: <a href="https://onlinecreative.net" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">Online Creative Network</a></p>
                </div>
            </div>
        </footer>
    );
};

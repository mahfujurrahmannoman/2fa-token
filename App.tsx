import React, { useState, useEffect, useCallback } from 'react';
import { TokenDisplay } from './components/TokenDisplay';
import { QrScanner } from './components/QrScanner';
import { FakeEmailGenerator } from './components/FakeEmailGenerator';
import {
    CameraIcon,
    ClipboardCheckIcon,
    ClipboardIcon,
    ClipboardPasteIcon,
    ShieldIcon,
    MailIcon,
    KeyIcon,
} from './components/icons';
import * as OTPAuth from 'otpauth';

type Tab = 'auth' | 'email';

const App: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('auth');

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 font-sans flex flex-col">
            <Header activeTab={activeTab} onTabChange={setActiveTab} />
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
                <main className="flex flex-col items-center justify-start md:justify-center p-4 order-1 md:order-2 w-full">
                    {activeTab === 'auth' ? <AuthPanel /> : <FakeEmailGenerator />}
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
        </div>
    );
};

const Header: React.FC<{ activeTab: Tab; onTabChange: (t: Tab) => void }> = ({ activeTab, onTabChange }) => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
        { id: 'auth', label: '2FA Authenticator', icon: <ShieldIcon className="w-4 h-4" /> },
        { id: 'email', label: 'Fake Email Generator', icon: <MailIcon className="w-4 h-4" /> },
    ];

    const handleTabClick = (id: Tab) => {
        onTabChange(id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setMobileOpen(false);
    };

    return (
        <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur border-b border-slate-700 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-[1fr_auto_1fr] items-center gap-4 h-16">
                <a href="#" onClick={(e) => { e.preventDefault(); handleTabClick('auth'); }} className="flex items-center gap-2 group justify-self-start">
                    <div className="w-9 h-9 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-cyan-500/30 transition-shadow">
                        <KeyIcon className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-lg text-slate-100 hidden sm:inline">2FA Tools Hub</span>
                    <span className="font-bold text-lg text-slate-100 sm:hidden">2FA Hub</span>
                </a>

                {/* Center menu (desktop) — only the two tool buttons, truly centered */}
                <nav className="hidden md:flex items-center gap-1 bg-slate-800/60 rounded-lg p-1 border border-slate-700 justify-self-center">
                    {tabs.map(t => (
                        <button
                            key={t.id}
                            onClick={() => handleTabClick(t.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                                activeTab === t.id
                                    ? 'bg-cyan-600 text-white shadow-md'
                                    : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                            }`}
                            aria-current={activeTab === t.id ? 'page' : undefined}
                        >
                            {t.icon}
                            {t.label}
                        </button>
                    ))}
                </nav>

                {/* Right-side placeholder (desktop) keeps the center truly centered */}
                <div className="hidden md:block justify-self-end" aria-hidden="true" />

                {/* Mobile menu button (replaces right placeholder on mobile) */}
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
                <nav className="md:hidden border-t border-slate-700 bg-slate-900/98 backdrop-blur">
                    <div className="px-4 py-2 space-y-1">
                        {tabs.map(t => (
                            <button
                                key={t.id}
                                onClick={() => handleTabClick(t.id)}
                                className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                                    activeTab === t.id
                                        ? 'bg-cyan-600 text-white'
                                        : 'text-slate-300 hover:bg-slate-800'
                                }`}
                            >
                                {t.icon}
                                {t.label}
                            </button>
                        ))}
                    </div>
                </nav>
            )}
        </header>
    );
};

const AuthPanel: React.FC = () => {
    const [secret, setSecret] = useState<string>('');
    const [token, setToken] = useState<string | null>(null);
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [isScanning, setIsScanning] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState<boolean>(false);

    const generateToken = useCallback(() => {
        if (!secret) {
            setToken(null);
            setError(null);
            return;
        }

        try {
            const totp = new OTPAuth.TOTP({
                issuer: "Authenticator",
                label: "Live",
                algorithm: "SHA1",
                digits: 6,
                period: 30,
                secret: OTPAuth.Secret.fromBase32(secret),
            });
            const newToken = totp.generate();
            setToken(newToken);
            setError(null);
        } catch (e) {
            setToken(null);
            setError("Invalid secret key. Please check the key and try again.");
            console.error(e);
        }
    }, [secret]);

    useEffect(() => {
        const timer = setInterval(() => {
            const epoch = Math.round(new Date().getTime() / 1000.0);
            const newTimeLeft = 30 - (epoch % 30);
            setTimeLeft(newTimeLeft);

            if (newTimeLeft === 30) {
                generateToken();
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [generateToken]);

    useEffect(() => {
        generateToken();
    }, [secret, generateToken]);

    const handleSecretChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSecret(e.target.value.replace(/\s/g, '').toUpperCase());
    };

    const handleScanSuccess = (scannedUrl: string) => {
        try {
            const url = new URL(scannedUrl);
            if (url.protocol === 'otpauth:') {
                const newSecret = url.searchParams.get('secret');
                if (newSecret) {
                    setSecret(newSecret);
                } else {
                    setError('QR code does not contain a secret key.');
                }
            } else {
                setError('Invalid QR code format.');
            }
        } catch (e) {
            setError('Could not parse QR code data.');
            console.error(e);
        }
        setIsScanning(false);
    };

    const handleCopy = () => {
        if (token) {
            navigator.clipboard.writeText(token);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handlePasteSecret = async () => {
        try {
            const text = await navigator.clipboard.readText();
            setSecret(text.replace(/\s/g, '').toUpperCase());
        } catch (err) {
            setError('Failed to read from clipboard. Please paste manually.');
            console.error('Failed to read clipboard:', err);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto bg-slate-800 rounded-2xl shadow-2xl p-6 md:p-8 space-y-8 transform transition-all duration-300">
            {isScanning && (
                <QrScanner
                    onScanSuccess={handleScanSuccess}
                    onClose={() => setIsScanning(false)}
                />
            )}
            <header className="text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-cyan-400">Authenticator Live</h1>
                <p className="text-slate-400 mt-2">Generate 2FA tokens instantly</p>
            </header>

            <section>
                <div className="space-y-4">
                    <label htmlFor="secret-key" className="block text-sm font-medium text-slate-300">
                        Enter Your Secret Key
                    </label>
                    <div className="flex items-center space-x-2">
                        <input
                            id="secret-key"
                            type="text"
                            value={secret}
                            onChange={handleSecretChange}
                            placeholder="e.g. JBSWY3DPEHPK3PXP"
                            className="flex-grow bg-slate-700 text-slate-100 placeholder-slate-500 rounded-md px-4 py-3 border-2 border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
                        />
                        <button
                            onClick={() => setIsScanning(true)}
                            className="p-3 bg-slate-700 hover:bg-cyan-500 rounded-md border-2 border-slate-600 hover:border-cyan-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500"
                            aria-label="Scan QR code"
                        >
                            <CameraIcon className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {error && <p className="text-red-400 text-center mt-4 text-sm">{error}</p>}

                <div className="mt-8">
                    {secret ? (
                        <TokenDisplay token={token} timeLeft={timeLeft} />
                    ) : (
                        <div className="flex flex-col items-center justify-center p-6 bg-slate-900/50 rounded-lg border border-slate-700 min-h-[200px]">
                            <p className="text-slate-400 text-lg mb-4">Input your secret key</p>
                            <button
                                onClick={handlePasteSecret}
                                className="flex items-center space-x-2 px-4 py-2 bg-slate-700 hover:bg-cyan-500 rounded-md border-2 border-slate-600 hover:border-cyan-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500"
                                aria-label="Paste secret key from clipboard"
                            >
                                <ClipboardPasteIcon className="w-5 h-5" />
                                <span>Paste from Clipboard</span>
                            </button>
                        </div>
                    )}
                </div>

                <div className="mt-8 flex justify-center">
                    {secret ? (
                        <button
                            onClick={handleCopy}
                            disabled={!token}
                            className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-cyan-600 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500"
                        >
                            {copied ? <ClipboardCheckIcon className="w-6 h-6" /> : <ClipboardIcon className="w-6 h-6" />}
                            <span>{copied ? 'Copied!' : 'Copy Token'}</span>
                        </button>
                    ) : (
                        <div className="w-full h-[100px]"></div>
                    )}
                </div>
            </section>

            <footer className="text-center pt-2 text-slate-500 text-xs md:text-sm max-w-md mx-auto">
                <p>Everything is processed in your browser. Your secret key never leaves your device.</p>
                <p className="mt-1">Developer <a href="https://onlinecreative.net" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors">Online Creative Network</a></p>
            </footer>
        </div>
    );
};

export default App;

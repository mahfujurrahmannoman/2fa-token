import React, { useState, useEffect, useCallback, useRef } from 'react';
import { TokenDisplay } from './components/TokenDisplay';
import { QrScanner } from './components/QrScanner';
import { CameraIcon, ClipboardCheckIcon, ClipboardIcon, ClipboardPasteIcon } from './components/icons';
import * as OTPAuth from 'otpauth';

const App: React.FC = () => {
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
        <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
            <div className="md:grid md:grid-cols-[1fr_auto_1fr] md:gap-8 min-h-screen">
                {/* Left Ad Space */}
                <aside className="hidden md:flex items-center justify-center p-4">
                    <div className="w-full h-96 bg-slate-800/50 border border-slate-700 rounded-lg flex items-center justify-center text-slate-500">
                        Ad Space
                    </div>
                </aside>

                {/* Main App Content */}
                <main className="flex flex-col items-center justify-center p-4">
                    {isScanning && (
                        <QrScanner
                            onScanSuccess={handleScanSuccess}
                            onClose={() => setIsScanning(false)}
                        />
                    )}
                    <div className="w-full max-w-md mx-auto bg-slate-800 rounded-2xl shadow-2xl p-6 md:p-8 space-y-8 transform transition-all duration-300">
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
                    </div>
                    <footer className="text-center mt-8 text-slate-500 text-sm max-w-md mx-auto">
                        <p className="text-xs mt-2">Everything is processed in your browser. Your secret key never leaves your device.</p>
                    </footer>
                </main>

                {/* Right Ad Space */}
                <aside className="hidden md:flex items-center justify-center p-4">
                    <div className="w-full h-96 bg-slate-800/50 border border-slate-700 rounded-lg flex items-center justify-center text-slate-500">
                        Ad Space
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default App;

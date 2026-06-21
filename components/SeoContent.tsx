import React from 'react';
import { PageId } from './Header';

interface SeoContentProps {
    page: PageId;
}

export const SeoContent: React.FC<SeoContentProps> = ({ page }) => {
    if (page === 'auth') return <AuthSeoContent />;
    return <EmailSeoContent />;
};

const AuthSeoContent: React.FC = () => {
    return (
        <section className="w-full max-w-3xl mx-auto mt-12 space-y-10 text-slate-300">
            <article>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-100 mb-4">
                    What is a 2FA Authenticator?
                </h2>
                <p className="leading-relaxed text-slate-400">
                    A 2FA (two-factor authentication) authenticator generates time-based one-time password (TOTP) codes that act as a second layer of security beyond your password. Every 30 seconds, the app produces a fresh 6-digit code that's only valid for that brief window. Even if someone steals your password, they can't log in without the code from your authenticator — making your accounts dramatically more secure.
                </p>
            </article>

            <article>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-100 mb-4">
                    How to use this free online 2FA authenticator
                </h2>
                <ol className="space-y-3 list-decimal list-inside text-slate-400 leading-relaxed">
                    <li><strong className="text-slate-200">Open the setup page</strong> of any service that uses two-factor authentication (Google, Facebook, GitHub, Discord, Dropbox, etc.).</li>
                    <li><strong className="text-slate-200">Copy the secret key</strong> shown on the screen, or scan the QR code with your camera using the scanner button.</li>
                    <li><strong className="text-slate-200">Paste the secret key</strong> into the field above. The authenticator immediately starts generating fresh 6-digit codes every 30 seconds.</li>
                    <li><strong className="text-slate-200">Enter the current code</strong> on the service's setup page to confirm and enable 2FA. Save any backup codes the service provides.</li>
                </ol>
            </article>

            <article>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-100 mb-4">
                    Why use this authenticator?
                </h2>
                <ul className="space-y-2 list-disc list-inside text-slate-400 leading-relaxed">
                    <li><strong className="text-slate-200">100% private:</strong> Your secret key never leaves your browser. We don't have a server, so there's nothing to hack.</li>
                    <li><strong className="text-slate-200">No installation:</strong> Works on any device with a browser — phone, tablet, laptop, desktop.</li>
                    <li><strong className="text-slate-200">No account required:</strong> Open the page and start generating codes instantly.</li>
                    <li><strong className="text-slate-200">Works offline:</strong> Once the page is loaded, codes are generated locally even without internet.</li>
                    <li><strong className="text-slate-200">Standard TOTP:</strong> Compatible with any service that uses RFC 6238 (Google Authenticator, Authy, 1Password, etc.).</li>
                </ul>
            </article>

            <article>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-100 mb-4">
                    Compatible with major services
                </h2>
                <p className="leading-relaxed text-slate-400 mb-4">
                    This authenticator works with any service that supports TOTP-based 2FA, including:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-sm">
                    {['Google', 'Facebook', 'GitHub', 'Discord', 'Dropbox', 'Microsoft', 'Amazon', 'Twitter/X', 'Instagram', 'LinkedIn', 'Coinbase', 'Binance'].map(s => (
                        <div key={s} className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-slate-300 text-center">{s}</div>
                    ))}
                </div>
            </article>

            <article>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-100 mb-4">
                    Frequently asked questions
                </h2>
                <div className="space-y-4">
                    <details className="bg-slate-800 border border-slate-700 rounded-lg p-4">
                        <summary className="font-medium text-slate-200 cursor-pointer">Is this authenticator safe to use?</summary>
                        <p className="mt-2 text-slate-400 leading-relaxed">
                            Yes. Everything runs in your browser. The secret key you enter is processed locally and never sent over the network. There is no backend, no analytics, and no tracking.
                        </p>
                    </details>
                    <details className="bg-slate-800 border border-slate-700 rounded-lg p-4">
                        <summary className="font-medium text-slate-200 cursor-pointer">What if I lose my secret key?</summary>
                        <p className="mt-2 text-slate-400 leading-relaxed">
                            Your secret key is the master code. Without it, you can't regenerate valid codes. Most services provide backup codes or recovery options during 2FA setup — save those in a secure location.
                        </p>
                    </details>
                    <details className="bg-slate-800 border border-slate-700 rounded-lg p-4">
                        <summary className="font-medium text-slate-200 cursor-pointer">Why don't my codes work?</summary>
                        <p className="mt-2 text-slate-400 leading-relaxed">
                            Make sure your device's clock is accurate. TOTP codes are time-based, so a wrong clock means wrong codes. Most services allow a 30-second drift before rejecting codes.
                        </p>
                    </details>
                    <details className="bg-slate-800 border border-slate-700 rounded-lg p-4">
                        <summary className="font-medium text-slate-200 cursor-pointer">Can I sync across devices?</summary>
                        <p className="mt-2 text-slate-400 leading-relaxed">
                            This tool doesn't store anything, so it can't sync. To use 2FA on multiple devices, set up the same secret key on each — most authenticator apps support this during the initial setup.
                        </p>
                    </details>
                </div>
            </article>
        </section>
    );
};

const EmailSeoContent: React.FC = () => {
    return (
        <section className="w-full max-w-3xl mx-auto mt-12 space-y-10 text-slate-300">
            <article>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-100 mb-4">
                    What is a fake email and password generator?
                </h2>
                <p className="leading-relaxed text-slate-400">
                    A fake email and password generator creates random, realistic-looking email addresses and strong passwords for software testing, development, and quality assurance. Instead of using your real email — which can lead to spam, privacy leaks, or accidental signups — testers use disposable test credentials that look like real accounts but never route to a real inbox.
                </p>
            </article>

            <article>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-100 mb-4">
                    How to use this free generator
                </h2>
                <ol className="space-y-3 list-decimal list-inside text-slate-400 leading-relaxed">
                    <li><strong className="text-slate-200">Set the count</strong> — pick how many fake accounts you need (1 to 100 per batch).</li>
                    <li><strong className="text-slate-200">Choose a domain</strong> — Gmail, Yahoo, Outlook, Hotmail, Proton, iCloud, or AOL.</li>
                    <li><strong className="text-slate-200">Click Generate</strong> — the tool creates random email addresses with strong 12-character passwords (mixed case, digits, symbols).</li>
                    <li><strong className="text-slate-200">Pick an output format</strong> — <code className="text-cyan-400 bg-slate-900 px-1 rounded">email:password</code>, CSV, JSON, or your own custom format using <code className="text-cyan-400 bg-slate-900 px-1 rounded">{'{email}'}</code> and <code className="text-cyan-400 bg-slate-900 px-1 rounded">{'{password}'}</code> placeholders.</li>
                    <li><strong className="text-slate-200">Copy or download</strong> — select-all from the output box, click Copy, or download as JSON.</li>
                </ol>
            </article>

            <article>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-100 mb-4">
                    Common use cases
                </h2>
                <ul className="space-y-2 list-disc list-inside text-slate-400 leading-relaxed">
                    <li><strong className="text-slate-200">QA testing:</strong> Sign up test users in bulk without polluting real inboxes or hitting rate limits.</li>
                    <li><strong className="text-slate-200">Form validation:</strong> Stress-test email validators, signup flows, and password strength meters.</li>
                    <li><strong className="text-slate-200">Load testing:</strong> Seed databases with thousands of fake user records for performance tests.</li>
                    <li><strong className="text-slate-200">Demo environments:</strong> Populate staging environments with realistic-looking data for screenshots and demos.</li>
                    <li><strong className="text-slate-200">Documentation:</strong> Generate sample credentials for tutorials, examples, and training material.</li>
                </ul>
            </article>

            <article>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-100 mb-4">
                    How passwords are generated
                </h2>
                <p className="leading-relaxed text-slate-400">
                    Every password is 12 characters long and built from a secure mix of uppercase letters, lowercase letters, digits, and special characters (!@#$%&*?). We guarantee at least one of each character class, then shuffle the result using a Fisher-Yates pass so position isn't predictable. Passwords are generated in your browser using JavaScript's <code className="text-cyan-400 bg-slate-900 px-1 rounded">Math.random()</code> — fast and good enough for testing, but <strong className="text-slate-200">not for production secrets</strong>.
                </p>
            </article>

            <article>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-100 mb-4">
                    Frequently asked questions
                </h2>
                <div className="space-y-4">
                    <details className="bg-slate-800 border border-slate-700 rounded-lg p-4">
                        <summary className="font-medium text-slate-200 cursor-pointer">Can I use these for real accounts?</summary>
                        <p className="mt-2 text-slate-400 leading-relaxed">
                            No. These are explicitly fake — they aren't real inboxes and won't receive mail. They're for testing, demos, and documentation only.
                        </p>
                    </details>
                    <details className="bg-slate-800 border border-slate-700 rounded-lg p-4">
                        <summary className="font-medium text-slate-200 cursor-pointer">Is there a rate limit?</summary>
                        <p className="mt-2 text-slate-400 leading-relaxed">
                            No. You can generate up to 100 entries per batch, and run as many batches as you want. There's no server, so there's no limit.
                        </p>
                    </details>
                    <details className="bg-slate-800 border border-slate-700 rounded-lg p-4">
                        <summary className="font-medium text-slate-200 cursor-pointer">How do I export the data?</summary>
                        <p className="mt-2 text-slate-400 leading-relaxed">
                            Use the JSON button to download a <code className="text-cyan-400 bg-slate-900 px-1 rounded">.json</code> file with all entries. For other formats, use the format selector and copy from the output box.
                        </p>
                    </details>
                    <details className="bg-slate-800 border border-slate-700 rounded-lg p-4">
                        <summary className="font-medium text-slate-200 cursor-pointer">Do you store any of this?</summary>
                        <p className="mt-2 text-slate-400 leading-relaxed">
                            No. Everything is generated in your browser. Closing the tab erases everything. We don't have a backend, so we physically can't store your data.
                        </p>
                    </details>
                </div>
            </article>
        </section>
    );
};

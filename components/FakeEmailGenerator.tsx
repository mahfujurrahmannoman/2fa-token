import React, { useState, useMemo, useRef } from 'react';
import { ClipboardIcon, ClipboardCheckIcon, DownloadIcon } from './icons';

const DOMAINS = [
    { value: 'gmail.com', label: 'gmail.com' },
    { value: 'yahoo.com', label: 'yahoo.com' },
    { value: 'outlook.com', label: 'outlook.com' },
    { value: 'hotmail.com', label: 'hotmail.com' },
    { value: 'proton.me', label: 'proton.me' },
    { value: 'icloud.com', label: 'icloud.com' },
    { value: 'aol.com', label: 'aol.com' },
];

const FIRST_NAMES = [
    'alex', 'sam', 'jordan', 'taylor', 'morgan', 'casey', 'riley', 'avery',
    'quinn', 'blake', 'drew', 'kai', 'noah', 'mia', 'ava', 'liam', 'sophia',
    'ethan', 'olivia', 'mason', 'lucas', 'isabella', 'logan', 'emma', 'hudson',
];

const LAST_NAMES = [
    'smith', 'jones', 'brown', 'wilson', 'taylor', 'clark', 'hall', 'lee',
    'walker', 'king', 'wright', 'hill', 'wood', 'martin', 'johnson', 'anderson',
    'thomas', 'moore', 'jackson', 'white', 'harris', 'martin', 'garcia', 'roberts',
];

const PRESETS: { label: string; value: string; hint?: string }[] = [
    { label: 'email:password', value: '{email}:{password}' },
    { label: 'email,password (CSV)', value: '{email},{password}' },
    { label: 'email | password', value: '{email} | {password}' },
    { label: 'email password (space)', value: '{email} {password}' },
    { label: 'email [TAB] password', value: '{email}\t{password}' },
    { label: 'email → password (arrow)', value: '{email} → {password}' },
    { label: 'JSON array', value: '__json__' },
    { label: 'Custom', value: '__custom__' },
];

function pick<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

function randInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomPassword(length = 12): string {
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digits = '0123456789';
    const symbols = '!@#$%&*?';
    let pwd = '';
    pwd += lower[randInt(0, lower.length - 1)];
    pwd += upper[randInt(0, upper.length - 1)];
    pwd += digits[randInt(0, digits.length - 1)];
    pwd += symbols[randInt(0, symbols.length - 1)];
    const all = lower + upper + digits + symbols;
    for (let i = pwd.length; i < length; i++) {
        pwd += all[randInt(0, all.length - 1)];
    }
    const chars = pwd.split('');
    for (let i = chars.length - 1; i > 0; i--) {
        const j = randInt(0, i);
        [chars[i], chars[j]] = [chars[j], chars[i]];
    }
    return chars.join('');
}

function randomEmail(domain: string): string {
    const first = pick(FIRST_NAMES);
    const last = pick(LAST_NAMES);
    const num = randInt(1, 9999);
    const styles = [
        `${first}.${last}`,
        `${first}${last}`,
        `${first}_${last}`,
        `${first}${num}`,
        `${first}.${last}${num}`,
        `${first[0]}${last}${num}`,
        `${first}${last[0]}${num}`,
    ];
    return `${pick(styles)}@${domain}`;
}

interface Entry {
    email: string;
    password: string;
}

function formatEntry(e: Entry, fmt: string): string {
    return fmt
        .replace(/\{email\}/g, e.email)
        .replace(/\{password\}/g, e.password);
}

export const FakeEmailGenerator: React.FC = () => {
    const [count, setCount] = useState<number>(5);
    const [domain, setDomain] = useState<string>('gmail.com');
    const [entries, setEntries] = useState<Entry[]>([]);
    const [copied, setCopied] = useState<number | 'all' | null>(null);

    // Format system
    const [format, setFormat] = useState<string>('{email}:{password}');
    const [presetLabel, setPresetLabel] = useState<string>('email:password');

    const outputRef = useRef<HTMLTextAreaElement>(null);

    const isJson = format === '__json__';

    const output = useMemo(() => {
        if (entries.length === 0) return '';
        if (isJson) return JSON.stringify(entries, null, 2);
        return entries.map(e => formatEntry(e, format)).join('\n');
    }, [entries, format, isJson]);

    const handlePresetChange = (label: string) => {
        setPresetLabel(label);
        const found = PRESETS.find(p => p.label === label);
        if (!found) return;
        if (found.value === '__custom__') {
            // Keep current format, user will type
            return;
        }
        setFormat(found.value);
    };

    const handleFormatInput = (value: string) => {
        setFormat(value);
        const found = PRESETS.find(p => p.value === value);
        if (found && found.value !== '__custom__') {
            setPresetLabel(found.label);
        } else {
            setPresetLabel('Custom');
        }
    };

    const generate = () => {
        const next: Entry[] = [];
        const seen = new Set<string>();
        let attempts = 0;
        while (next.length < count && attempts < count * 10) {
            const email = randomEmail(domain);
            attempts += 1;
            if (seen.has(email)) continue;
            seen.add(email);
            next.push({ email, password: randomPassword(12) });
        }
        setEntries(next);
        setCopied(null);
    };

    const copyOutput = async () => {
        if (!output) return;
        try {
            await navigator.clipboard.writeText(output);
        } catch {
            // Fallback: select the textarea
            outputRef.current?.select();
            document.execCommand('copy');
        }
        setCopied('all');
        setTimeout(() => setCopied(null), 2000);
    };

    const selectAll = () => {
        outputRef.current?.select();
    };

    const copyRow = (i: number) => {
        const e = entries[i];
        if (!e) return;
        const text = isJson ? JSON.stringify(e) : formatEntry(e, format);
        navigator.clipboard.writeText(text).catch(() => {});
        setCopied(i);
        setTimeout(() => setCopied(null), 2000);
    };

    const downloadJson = () => {
        const data = JSON.stringify(entries, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `fake-emails-${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="w-full max-w-2xl mx-auto bg-slate-800 rounded-2xl shadow-2xl p-6 md:p-8 space-y-6">
            <header className="text-center">
                <h1 className="text-2xl md:text-3xl font-bold text-cyan-400">Fake Email &amp; Password Generator</h1>
                <p className="text-slate-400 mt-2 text-sm md:text-base">Random test credentials for development &amp; QA — all generated in your browser.</p>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                    <label htmlFor="gen-count" className="block text-sm font-medium text-slate-300 mb-1">
                        How many
                    </label>
                    <input
                        id="gen-count"
                        type="number"
                        min={1}
                        max={100}
                        value={count}
                        onChange={e => {
                            const v = parseInt(e.target.value, 10);
                            setCount(Number.isFinite(v) ? Math.max(1, Math.min(100, v)) : 1);
                        }}
                        className="w-full bg-slate-700 text-slate-100 rounded-md px-4 py-3 border-2 border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
                    />
                </div>
                <div>
                    <label htmlFor="gen-domain" className="block text-sm font-medium text-slate-300 mb-1">
                        Domain
                    </label>
                    <select
                        id="gen-domain"
                        value={domain}
                        onChange={e => setDomain(e.target.value)}
                        className="w-full bg-slate-700 text-slate-100 rounded-md px-4 py-3 border-2 border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
                    >
                        {DOMAINS.map(d => (
                            <option key={d.value} value={d.value}>{d.label}</option>
                        ))}
                    </select>
                </div>
            </div>

            <button
                onClick={generate}
                className="w-full px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500"
            >
                Generate
            </button>

            {entries.length > 0 && (
                <>
                    {/* Format controls */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label htmlFor="gen-format" className="block text-sm font-medium text-slate-300">
                                Output format
                            </label>
                            <span className="text-xs text-slate-500">
                                Use <code className="text-cyan-400 bg-slate-900 px-1 rounded">{'{email}'}</code> &amp; <code className="text-cyan-400 bg-slate-900 px-1 rounded">{'{password}'}</code>
                            </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-2">
                            <input
                                id="gen-format"
                                type="text"
                                value={isJson ? '' : format}
                                onChange={e => handleFormatInput(e.target.value)}
                                placeholder="{email}:{password}"
                                disabled={isJson}
                                className="w-full bg-slate-700 text-slate-100 placeholder-slate-500 rounded-md px-4 py-2.5 border-2 border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors font-mono text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                            <select
                                value={presetLabel}
                                onChange={e => handlePresetChange(e.target.value)}
                                className="w-full sm:w-auto bg-slate-700 text-slate-100 rounded-md px-4 py-2.5 border-2 border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
                            >
                                {PRESETS.map(p => (
                                    <option key={p.label} value={p.label}>{p.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Output box */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-300">
                                Output <span className="text-slate-500 font-normal">({entries.length} {entries.length === 1 ? 'entry' : 'entries'})</span>
                            </span>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={selectAll}
                                    className="text-xs px-2 py-1 text-slate-400 hover:text-cyan-400 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded"
                                >
                                    Select all
                                </button>
                                <button
                                    onClick={copyOutput}
                                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-cyan-600 hover:bg-cyan-700 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500"
                                >
                                    {copied === 'all' ? <ClipboardCheckIcon className="w-4 h-4" /> : <ClipboardIcon className="w-4 h-4" />}
                                    {copied === 'all' ? 'Copied!' : 'Copy'}
                                </button>
                                <button
                                    onClick={downloadJson}
                                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-slate-700 hover:bg-slate-600 text-slate-100 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                    title="Always downloads JSON regardless of format"
                                >
                                    <DownloadIcon className="w-4 h-4" />
                                    JSON
                                </button>
                            </div>
                        </div>
                        <textarea
                            ref={outputRef}
                            readOnly
                            value={output}
                            onClick={selectAll}
                            className="w-full h-48 bg-slate-900 text-slate-100 font-mono text-xs md:text-sm rounded-md p-3 border-2 border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors resize-y"
                            spellCheck={false}
                        />
                    </div>

                    {/* Reference table (compact) */}
                    <details className="bg-slate-900/40 rounded-lg border border-slate-700">
                        <summary className="cursor-pointer px-4 py-2.5 text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors select-none">
                            View as table ({entries.length} {entries.length === 1 ? 'row' : 'rows'})
                        </summary>
                        <div className="overflow-x-auto border-t border-slate-700 max-h-[300px] overflow-y-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-slate-900 text-slate-300 text-left sticky top-0">
                                    <tr>
                                        <th className="px-4 py-2.5 font-medium">Email</th>
                                        <th className="px-4 py-2.5 font-medium">Password</th>
                                        <th className="px-4 py-2.5 font-medium w-14 text-right"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {entries.map((e, i) => (
                                        <tr key={`${e.email}-${i}`} className="border-t border-slate-700 hover:bg-slate-700/30">
                                            <td className="px-4 py-2.5 font-mono text-slate-100 break-all">{e.email}</td>
                                            <td className="px-4 py-2.5 font-mono text-slate-100 break-all">{e.password}</td>
                                            <td className="px-4 py-2.5 text-right">
                                                <button
                                                    onClick={() => copyRow(i)}
                                                    className="p-1 text-slate-400 hover:text-cyan-400 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded"
                                                    title="Copy row in current format"
                                                    aria-label={`Copy row ${i + 1}`}
                                                >
                                                    {copied === i ? <ClipboardCheckIcon className="w-4 h-4 text-emerald-400" /> : <ClipboardIcon className="w-4 h-4" />}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </details>
                </>
            )}

            {entries.length === 0 && (
                <div className="text-center py-10 text-slate-500 border border-dashed border-slate-700 rounded-lg">
                    <p className="text-sm">Click <span className="text-cyan-400 font-medium">Generate</span> to create fake email &amp; password combinations.</p>
                </div>
            )}
        </div>
    );
};

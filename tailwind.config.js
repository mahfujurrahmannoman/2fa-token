/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './email-generator/index.html',
    './App.tsx',
    './email-generator/App.tsx',
    './components/**/*.{ts,tsx}',
    './email-generator/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          '"Liberation Mono"',
          '"Courier New"',
          'monospace',
        ],
      },
    },
  },
  plugins: [],
};

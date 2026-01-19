# Authenticator Live

## Overview
A 2FA (Two-Factor Authentication) token generator web application. Generate TOTP tokens instantly by entering your secret key or scanning a QR code. Everything is processed locally in the browser - secret keys never leave your device.

## Tech Stack
- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS (via CDN)
- **Key Libraries**: 
  - `otpauth` - TOTP token generation
  - `jsqr` - QR code scanning

## Project Structure
```
/
├── index.html          # Entry HTML
├── index.tsx           # React entry point
├── App.tsx             # Main application component
├── components/         # React components
├── vite.config.ts      # Vite configuration
├── package.json        # Dependencies
└── tsconfig.json       # TypeScript config
```

## Development
- **Dev server**: `npm run dev` (runs on port 5000)
- **Build**: `npm run build`
- **Preview**: `npm run preview`

## Deployment
- Static site deployment
- Build output: `dist/` directory

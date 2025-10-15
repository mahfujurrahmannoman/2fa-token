# 🔐 2FA Authenticator Live

A secure, modern Two-Factor Authentication (2FA) token generator built with React and TypeScript. Generate TOTP (Time-based One-Time Password) tokens instantly in your browser with a beautiful, responsive interface.

## ✨ Features

- 🔒 **Secure & Private** - All processing happens in your browser, secrets never leave your device
- 📱 **QR Code Scanner** - Scan QR codes directly from your camera
- ⏱️ **Real-time Token Generation** - 30-second TOTP tokens with visual countdown
- 📋 **One-click Copy** - Easy token copying to clipboard
- 🎨 **Modern UI** - Beautiful dark theme with Tailwind CSS
- 📱 **Responsive Design** - Works perfectly on desktop and mobile
- 🚀 **Fast & Lightweight** - Built with Vite for optimal performance

## 🛠️ Tech Stack

- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **OTPAuth** - TOTP/HOTP library for token generation
- **jsQR** - QR code scanning functionality

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/onlinesurvive/2fa-token.git
   cd 2fa-token
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📖 Usage

1. **Enter Secret Key**: Manually input your 2FA secret key
2. **Scan QR Code**: Use the camera icon to scan QR codes from authenticator setup pages
3. **Generate Tokens**: Watch as 6-digit TOTP tokens are generated every 30 seconds
4. **Copy Tokens**: Click the copy button to copy tokens to your clipboard

## 🏗️ Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## 📁 Project Structure

```
2fa-token/
├── components/           # React components
│   ├── QrScanner.tsx    # QR code scanning component
│   ├── TokenDisplay.tsx # Token display with countdown
│   └── icons.tsx        # SVG icon components
├── App.tsx              # Main application component
├── index.tsx            # Application entry point
├── index.html           # HTML template
└── package.json         # Dependencies and scripts
```

## 🔧 Configuration

The app uses standard TOTP configuration:
- **Algorithm**: SHA1
- **Digits**: 6
- **Period**: 30 seconds

## 🛡️ Security

- **Client-side only**: All cryptographic operations happen in your browser
- **No data transmission**: Secret keys and tokens never leave your device
- **No storage**: No persistent storage of sensitive data
- **HTTPS recommended**: Use HTTPS in production for additional security

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with ❤️ by [CheckVCC.com](https://checkvcc.com)
- Inspired by Google Authenticator and similar 2FA apps
- Thanks to the open-source community for the amazing libraries

## 🔗 Links

- **Live Demo**: [2FA Authenticator Live](https://your-demo-url.com)
- **Repository**: [GitHub](https://github.com/huzaifaalmesbah/2fa-token)
- **Issues**: [Report Issues](https://github.com/huzaifaalmesbah/2fa-token/issues)

---

<div align="center">
  <p>Made with ❤️ for secure authentication</p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>

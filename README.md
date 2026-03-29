# seamless-translator
<div align="center">

<img src="https://em-content.zobj.net/source/google/387/globe-with-meridians_1f310.png" width="80" />

# 🌐 Seamless Translator

### Speak. Type. Translate. Instantly.

**A modern multilingual translator inspired by Meta's SeamlessM4T**  
Built with React + Vite · Powered by a verified Phrasebook & MyMemory API

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-seamless--translator.vercel.app-6c63ff?style=for-the-badge)](https://seamless-translator.vercel.app/)
[![Made with React](https://img.shields.io/badge/React-18-61dafb?style=for-the-badge&logo=react)](https://react.dev/)
[![Built with Vite](https://img.shields.io/badge/Vite-5-646cff?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed-Vercel-000?style=for-the-badge&logo=vercel)](https://vercel.com/)

</div>

---

## ✨ Features

| Feature | Description |
|---|---|
| 🌍 **5 Languages** | English, Hindi, French, Spanish, Telugu |
| ⚡ **Instant Phrasebook** | 70+ human-verified phrases — no API call needed |
| 🎙️ **Voice Input** | Speak directly into the translator using your mic |
| 🔊 **Text-to-Speech** | Listen to any translation in the target language |
| 🔁 **Language Swap** | Instantly swap source and target languages |
| 📋 **Copy Translation** | One-click copy to clipboard |
| 💡 **Quick Phrases** | Tap common phrases like "Good morning", "I love you" |
| 📱 **Mobile Responsive** | Works beautifully on phones, tablets, and desktops |
| 🌙 **Dark UI** | Premium dark theme with animated accents |

---

## 🚀 Live Demo

👉 **[https://seamless-translator.vercel.app/](https://seamless-translator.vercel.app/)**

---

## 🖼️ Preview

> Dark UI with dual-panel translation, language chips, quick phrase buttons, mic input and TTS output.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite 5 |
| Styling | Custom CSS with CSS Variables |
| Translation | Phrasebook (instant) + MyMemory API (fallback) |
| Voice Input | Web Speech API (browser built-in) |
| Text-to-Speech | SpeechSynthesis API (browser built-in) |
| Deployment | Vercel (free tier) |
| Fonts | Syne + DM Sans (Google Fonts) |

---

## 🌐 Supported Languages

| Language | Code | Voice |
|---|---|---|
| 🇬🇧 English | `en` | en-US |
| 🇮🇳 Hindi | `hi` | hi-IN |
| 🇫🇷 French | `fr` | fr-FR |
| 🇪🇸 Spanish | `es` | es-ES |
| 🇮🇳 Telugu | `te` | te-IN |

---

## ⚡ How Translation Works

```
User Input
    │
    ▼
┌─────────────────────────────┐
│  1. Exact Phrasebook Match  │ ◄── instant, 100% accurate
└─────────────┬───────────────┘
              │ not found
              ▼
┌─────────────────────────────┐
│  2. Fuzzy Match (Levenshtein│ ◄── catches typos like "helo" → "hello"
└─────────────┬───────────────┘
              │ not found
              ▼
┌─────────────────────────────┐
│  3. MyMemory API            │ ◄── free, handles all other text
└─────────────────────────────┘
```

The phrasebook covers **70+ common phrases** including greetings, wishes, emotions, love phrases, daily conversations — all human-verified for accuracy.

---

## 📦 Project Structure

```
seamless-translator/
├── public/
├── src/
│   ├── App.jsx        ← Main app — translation logic + phrasebook
│   ├── App.css        ← Full dark UI styling
│   └── main.jsx       ← React entry point
├── index.html
├── package.json
├── vite.config.js
├── vercel.json
└── README.md
```

---

## 🏃 Run Locally

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/seamless-translator.git

# 2. Go into the folder
cd seamless-translator

# 3. Install dependencies
npm install

# 4. Start dev server
npm run dev
```

Open **http://localhost:5173** in your browser.

---

## 🌍 Deploy Your Own

### Deploy to Vercel (Free)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project** → Import your repo
3. Vercel auto-detects Vite — click **Deploy**
4. ✅ Live in ~60 seconds!

### Deploy to Netlify (Free)

```bash
npm run build
# Drag the dist/ folder to https://app.netlify.com/drop
```

---

## ➕ Adding More Languages

In `src/App.jsx`, add a new entry to the `LANGUAGES` array:

```js
{ code: "de", label: "German", flag: "🇩🇪", voiceLang: "de-DE" },
```

Then add translations for `"de"` inside the `PHRASEBOOK` object:

```js
"good morning": { ..., de: "Guten Morgen" },
```

---

## 🙏 Credits & Inspiration

- Inspired by **[Meta SeamlessM4T](https://github.com/facebookresearch/seamless_communication)** — a state-of-the-art multilingual translation model
- Translation API: **[MyMemory](https://mymemory.translated.net/)**
- Voice: **Web Speech API** (browser built-in, free)
- Fonts: **Google Fonts** — Syne & DM Sans

---

## 📄 License

MIT License — free to use, modify, and distribute.

---

<div align="center">

Made with ❤️ · Live at **[seamless-translator.vercel.app](https://seamless-translator.vercel.app/)**

</div>

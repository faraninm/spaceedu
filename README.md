# 🚀 SpaceEdu

> An AI-powered web app for learning about space.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)
![Gemini](https://img.shields.io/badge/Google-Gemini-4285F4?logo=google&logoColor=white)

<!-- Add a screenshot or GIF here: ![SpaceEdu screenshot](docs/screenshot.png) -->

## ✨ Features

<!-- Replace these with what the app really does. -->
- 🌌 **[Feature one]**: e.g. interactive lessons on planets, stars and missions
- 🤖 **AI-powered answers**: uses the Google Gemini API to explain topics and respond to questions
- 🎬 **Smooth animations**: built with Motion for a polished, engaging UI
- 📱 **Responsive design**: works on desktop and mobile

## 🛠️ Tech Stack

| Area | Tools |
| --- | --- |
| Frontend | React 19, TypeScript, Vite |
| Styling | Tailwind CSS 4, Motion, Lucide React icons |
| Backend | Node.js, Express |
| AI | Google Gemini (`@google/genai`) |

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) 18 or newer
- A Gemini API key from [Google AI Studio](https://aistudio.google.com/apikey)

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/faraninm/spaceedu.git
   cd spaceedu
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Open `.env.local` and set your key:

   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

4. **Start the dev server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## 📜 Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server on port 3000 |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Type-check with TypeScript |
| `npm run clean` | Remove build output |

## 📁 Project Structure

```text
spaceedu/
├── src/               # Application source code
├── index.html         # App entry point
├── vite.config.ts     # Vite configuration
├── tsconfig.json      # TypeScript configuration
├── .env.example       # Example environment variables
└── package.json
```

## 🔐 Security Note

Never commit your real API key. `.env.local` should stay in `.gitignore`. For production, keep the Gemini key on the server side (the Express backend) rather than exposing it in client code.

## 🌐 Deployment

The app was created in [Google AI Studio](https://ai.studio/apps/d9267803-bc75-4f5d-ae91-99b8ece01a63) and can be deployed from there, or built with `npm run build` and hosted on any Node-capable platform.

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push and open a Pull Request

## 📄 License

MIT

## 👤 Author

**faraninm**: [GitHub](https://github.com/faraninm)

# CivicAI

CivicAI is a civic education and election-assistance project built for Indian citizens. It combines a modern Next.js frontend with a lightweight Express backend and a Gemini-powered chat assistant.

## Tech Stack

### Frontend

- Next.js 15 with the App Router
- React 19
- TypeScript
- NextAuth.js for Google authentication
- Tailwind CSS 4 via `@import "tailwindcss"` in `globals.css`
- Custom global CSS for theming, layout, and animations
- Lucide React for icons
- Framer Motion is installed as a dependency
- React Hot Toast is installed as a dependency

### Backend

- Node.js
- Express 4
- Google Generative AI SDK (`@google/generative-ai`)
- CORS
- dotenv

### Auth and AI

- Google OAuth through NextAuth
- Gemini `gemini-2.5-flash` for election-related chat responses

## Project Structure

```text
civicai-app/
├── backend/
│   ├── package.json
│   ├── server.js
│   └── .env.example
├── frontend/
│   ├── package.json
│   ├── src/
│   │   ├── app/
│   │   └── components/
│   └── .env.example
└── README.md
```

## Main Features

- Landing page introducing the CivicAI platform
- Google sign-in and local profile persistence
- User dashboard
- AI chat assistant for election guidance
- Voter profile setup flow
- Candidate comparison page
- Polling booth guide
- Voting simulation page
- Voter ID help center
- Civic knowledge quiz
- Dark and light theme support

## How It Works

- The `frontend` app is a Next.js application using the App Router.
- Authentication is handled inside the frontend with NextAuth and Google OAuth.
- The `chat` page sends requests to the Express backend using `NEXT_PUBLIC_BACKEND_URL`.
- The backend calls Gemini and returns AI-generated election assistance responses.
- User profile details such as theme and basic session-related UI state are also stored in `localStorage`.

## Environment Variables

### Frontend: `frontend/.env.local`

Use `frontend/.env.example` as a reference:

```env
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
```

### Backend: `backend/.env`

Use `backend/.env.example` as a reference:

```env
PORT=5000
GEMINI_API_KEY=your_gemini_api_key_here
```

## Installation

### 1. Install frontend dependencies

```bash
cd frontend
npm install
```

### 2. Install backend dependencies

```bash
cd ../backend
npm install
```

## Running the Project

You need two terminals.

### Terminal 1: Start the backend

```bash
cd backend
npm run dev
```

The backend runs on `http://localhost:5000`.

### Terminal 2: Start the frontend

```bash
cd frontend
npm run dev
```

The frontend runs on `http://localhost:3000`.

## Available Scripts

### Frontend

```bash
npm run dev
npm run build
npm run start
npm run lint
```

### Backend

```bash
npm run dev
npm start
```

## Notes

- The frontend is written in TypeScript, while the backend currently uses JavaScript.
- There is no database configured in the current structure; the app mainly relies on OAuth, API calls, and browser storage.
- The AI assistant is designed around Indian election guidance and neutrality.
- The current ESLint setup may need a small import fix in `frontend/eslint.config.mjs` before `npm run lint` works cleanly.

## Summary

This project uses a full-stack JavaScript/TypeScript setup:

- Next.js + React + TypeScript on the frontend
- Express + Node.js on the backend
- NextAuth for authentication
- Gemini API for AI chat
- Tailwind CSS and custom CSS for styling

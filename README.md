# Brainwave — MVP Scaffold

This repository contains a minimal working MVP scaffold for Brainwave — a Next.js + TypeScript PWA that demonstrates onboarding, a study session UI, and API routes that call OpenAI to produce deep explanations and quizzes from user-supplied text.

This is an MVP for local development and demo purposes.

Setup

1. Clone the repo
2. Create a file `.env.local` in the project root with:

```
OPENAI_API_KEY=sk-xxxxxxxxxxxx
NEXT_PUBLIC_APP_NAME=Brainwave
```

3. Install dependencies

```
npm install
```

4. Run the dev server

```
npm run dev
```

Visit http://localhost:3000 and complete onboarding, then go to "Start Study Session" to paste content and get an explanation and quiz.

Notes & next steps

- This scaffold uses the OpenAI SDK — replace model names and adjust prompts as needed for cost & performance.
- For production you will want a proper persistent database, user auth (Clerk/Auth0), file uploads, OCR pipeline, voice integration, vector search, and robust rate-limiting and moderation.
- PWA support is included via next-pwa config; add icons into /public/icons for install prompts.


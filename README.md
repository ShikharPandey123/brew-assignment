# TaskTrackr

A minimal Task management web app built with Next.js — clean auth pages and a simple task CRUD interface.

## Quick start

These steps get the app running locally.

1. Install Node.js (recommended: 18.x or 20.x) and npm.
2. Clone repository and install dependencies:

```powershell
cd c:\Users\HP\OneDrive\Desktop\task-tracker
npm install
```

3. Copy environment variables (create `.env.local` in project root) — at minimum:

```
# Example .env.local
NEXT_PUBLIC_API_BASE=/api
# any other variables your API needs (e.g. DB connection) go here
```

4. Run the development server:

```powershell
npm run dev
# open http://localhost:3000
```

5. Build for production:

```powershell
npm run build
npm start
```

## Required tools

- Node.js and npm installed (Node 18+ recommended)

## Useful npm scripts

- `npm run dev` — start development server (Next.js)
- `npm run build` — build for production
- `npm start` — run the built app (after `npm run build`)

If your project has additional scripts (test, lint), they are accessible via `npm run`.

## Environment and API notes

- The frontend talks to the app's API routes under `/api` (e.g. `/api/auth/login`, `/api/auth/register`, `/api/auth/logout`, `/api/auth/me`).
- Ensure any backend or database service required by those endpoints is available and configured in environment variables.

## Project structure (high level)

- `app/` — Next.js App Router pages and layouts
  - `app/login` and `app/register` — client auth pages
  - `app/header.jsx`, `app/layout.js` — global layout and header
- `components/` — shared React components (Context provider, Logout button)
- `styles/` — SCSS stylesheets (`app.scss`, `header.scss`, `login.scss`)
- `pages/api/` — API routes used by the frontend
- `models/` — Mongoose/ORM models (if present)

Adjust the structure summary above if your repository differs.

## Troubleshooting

- If `npm run dev` fails, check:
  - Node.js version
  - Missing dependencies (re-run `npm install`)
  - Environment variables required by API routes

- Common fixes:
  - Delete `node_modules` and `package-lock.json` then run `npm install` again.

## Notes

- This README focuses on necessary setup and running instructions. For code-level details, inspect files under `app/`, `components/`, and `pages/api/`.
- If you want, I can add commands for Docker, deployment, or CI next.
# Task Tracker
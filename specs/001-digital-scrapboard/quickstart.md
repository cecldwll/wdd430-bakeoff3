# Quickstart: Digital Scrapboard

## Recommended Stack
- **Frontend**: Vue 3 + TypeScript, client-side rendering (CSR), deployed on Vercel
- **Backend**: GraphQL API (Apollo Server), Node.js, deployed on Vercel Functions or dedicated server
- **Database**: PostgreSQL via Supabase
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage for image and handwritten note assets
- **Real-time**: GraphQL subscriptions via Apollo Server or WebSocket

## Local Setup

### Prerequisites
- Node.js 18+ and npm/yarn
- Supabase CLI (for local Supabase emulation and database setup)
- Git

### 1. Clone and Setup Environment
```bash
git clone <repo-url>
cd wdd430-bakeoff3
```

Create `.env.local` for frontend with Supabase credentials:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_API_URL=http://localhost:4000/graphql
```

Create `.env` for backend:
```env
DATABASE_URL=postgresql://...
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
PORT=4000
```

### 2. Initialize Local Supabase Database
```bash
npx supabase init
npx supabase start
npx supabase db push
```

### 3. Install and Run Frontend
```bash
cd frontend
npm install
npm run dev
# Frontend available at http://localhost:5173
```

### 4. Install and Run GraphQL Backend
```bash
cd ../backend
npm install
npm run dev
# GraphQL API available at http://localhost:4000/graphql
```

## Development

### Run both services concurrently
From the project root:
```bash
npm run dev  # If package.json has a dev script that starts both
```

### Apply database migrations
```bash
npx supabase db push
```

### Generate GraphQL TypeScript types
```bash
cd frontend
npm run codegen
```

### Run tests
```bash
# Frontend tests
cd frontend
npm run test

# Backend tests
cd backend
npm run test
```

### End-to-end tests
```bash
cd frontend
npm run test:e2e
```

## Deployment

### Frontend (Vercel)
```bash
npm install -g vercel
cd frontend
vercel deploy
```

### Backend (Vercel Functions or Node.js)
If using Vercel Functions:
```bash
cd backend
vercel deploy
```

If using dedicated Node.js hosting (Render, Railway, etc.), follow their deployment guides.

## Architecture Overview

- **Frontend**: Vue 3 SPA handles UI rendering and state management (Pinia)
- **Backend**: GraphQL API receives queries/mutations, resolves data from Supabase
- **Database**: Supabase PostgreSQL stores all application data
- **Auth Flow**: Supabase Auth manages sessions; JWT tokens passed to GraphQL API

## Testing

- Unit tests with Vitest:

```bash
cd frontend
npm test
```

- End-to-end tests with Playwright:

```bash
cd frontend
npm run test:e2e
```

## Deployment

- Deploy the frontend to a static host or SvelteKit host (Vercel, Netlify, Cloudflare Pages).
- Use Supabase hosted services for auth, database, storage, and realtime.
- Configure `PUBLIC_SUPABASE_URL`, `PUBLIC_SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY` in the deployment environment.

## Notes

- Use Supabase Storage for images and handwritten assets, serving them via signed URLs or public bucket access.
- Keep public share links separate from authenticated board state to preserve read-only access.
- Use row-level security policies in Supabase to restrict board data to owners and allow share-token access for public views.
- Prefer `zod` validation on the client for board item payloads before sending updates to Supabase.

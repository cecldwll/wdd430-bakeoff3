# Implementation Plan: Digital Scrapboard - Artistic Note & Image Collaboration Space

**Branch**: `001-digital-scrapboard` | **Date**: 2026-05-08 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/001-digital-scrapboard/spec.md`

## Summary

Build an artistic digital scrapboard where authenticated users create, arrange, and share notes, images, and connecting lines on a freeform canvas. Use Vue 3 for client-side rendering, a GraphQL API backend for data operations, and Supabase for PostgreSQL persistence, auth, and storage. This modern client-side rendering approach provides a responsive, interactive user experience while the GraphQL layer enables efficient data fetching and real-time subscriptions. Deployed on Vercel (frontend) with backend on Vercel Functions or a dedicated Node.js server.

## Technical Context

**Language/Version**: TypeScript 5.x (Vue 3 and Node.js GraphQL backend)  
**Frontend**: Vue 3 with Vite, `vue-router`, `apollo-client`, `graphql`, TypeScript  
**Backend**: GraphQL API (Apollo Server or similar), Node.js runtime, hosted on Vercel Functions or dedicated server  
**Primary Dependencies**: `vue@3`, `vue-router@4`, `@apollo/client`, `graphql`, `vite`, `vitest`, `@vitejs/plugin-vue`, `zod`, and UI libraries (`lucide-vue-next`)  
**Storage**: Supabase PostgreSQL + Supabase Storage for image and handwritten note assets, Supabase Auth for user management  
**Testing**: Vitest + Vue Test Utils for unit tests, Playwright for end-to-end tests, local PostgreSQL for backend integration testing  
**Target Platform**: Web browser on desktop and responsive mobile, Vue 3 SPA deployed via Vercel, GraphQL backend on Vercel Functions or Node.js server, Supabase managed services  
**Project Type**: Client-side rendered (CSR) web application with GraphQL API backend  
**Performance Goals**: board state persists within 1 second via GraphQL mutations, image assets display within 3 seconds for uploads ≤ 5MB, canvas supports 100+ items with pan/zoom under 500ms  
**Constraints**: required email verification before board access, soft-delete recovery for 30 days, optimistic UI updates with GraphQL subscriptions for real-time sync, image upload limits, read-only shared access  
**Scale/Scope**: MVP sized for 10k users, 1M relational records, 100 items per board, 5 concurrent tabs per user  

## Constitution Check

- Core constitution requirements are met: explicit tech choices, test-first tooling, measurable performance targets, and consistent user experience alignment.
- No architecture or tool decisions violate the constitution. Supabase is used to minimize complexity while supporting all requested features.

## Project Structure

### Documentation (this feature)

```text
specs/001-digital-scrapboard/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
frontend/
├── src/
│   ├── components/     # Vue components
│   ├── views/          # Page-level components
│   ├── stores/         # Pinia stores for local state
│   ├── graphql/        # GraphQL queries, mutations, subscriptions
│   ├── lib/            # Utilities and helpers
│   ├── main.ts
│   ├── App.vue
│   └── style.css
├── tests/              # Unit and integration tests
├── playwright/         # E2E test configuration
├── index.html
├── vite.config.ts
└── tsconfig.json

backend/
├── src/
│   ├── resolvers/      # GraphQL resolvers
│   ├── schema/         # GraphQL schema definitions
│   ├── middleware/     # Auth, error handling, etc.
│   ├── lib/            # Database utilities, Supabase client
│   └── server.ts       # Apollo Server setup
├── tests/              # Integration tests
├── vercel.json         # Deployment configuration (if using Vercel Functions)
├── package.json
└── tsconfig.json

supabase/
├── migrations/         # SQL migrations for PostgreSQL schema
├── functions/          # Supabase Edge Functions (optional)
├── storage/            # Storage configuration (image bucket)
└── seed.sql            # Initial data

.github/
└── workflows/          # CI/CD workflows (GitHub Actions)
```

**Structure Decision**: Separate Vue frontend SPA deployed on Vercel from GraphQL backend on Vercel Functions or a Node.js server. Supabase provides PostgreSQL database and auth. GraphQL API layer enables clean data fetching and subscriptions instead of direct Supabase client integration.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |

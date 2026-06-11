# Research: Digital Scrapboard Stack Decision

## Decision

Use SvelteKit for the frontend and Supabase for the backend services, with PostgreSQL as the persistent data store.
- Frontend: SvelteKit + TypeScript + Svelte components
- Backend services: Supabase Auth, Supabase Database, Supabase Storage, Supabase Realtime
- Database: PostgreSQL via Supabase
- Storage: Supabase Storage for images and handwriting assets
- Auth: Supabase email/password authentication with required email verification

## Rationale

- The requested stack is SvelteKit and Supabase, which fits the product goals and reduces backend engineering overhead.
- Supabase provides a managed PostgreSQL database plus integrated auth, storage, and realtime sync, so the feature set can be delivered faster with fewer custom services.
- SvelteKit is lightweight and well-suited for fluid canvas interactions, responsive layouts, and low-latency updates.
- Supabase Storage is a natural fit for image and handwritten note assets and keeps file handling close to the database with signed URLs.
- The platform combination supports the share-link, read-only view, and authenticated CRUD workflows without a separate API server.

## Alternatives Considered

### Option A: SvelteKit + custom Node/Express backend
- Pros: maximum control over API behavior and custom business logic.
- Cons: significantly more backend maintenance, schema and auth work, and slower MVP delivery.

### Option B: React/Next.js + Supabase
- Pros: similar service advantages and broad ecosystem.
- Cons: user specifically requested SvelteKit, and SvelteKit is a stronger fit for the lightweight board experience.

### Option C: SvelteKit + Firebase
- Pros: strong managed backend services and realtime support.
- Cons: vendor lock-in and less direct PostgreSQL compatibility than Supabase.

## Why the Chosen Stack

- SvelteKit + Supabase matches the explicitly requested stack and supports the full feature set with minimal extra infrastructure.
- Supabase gives built-in email verification, row-level security, storage buckets, and realtime subscriptions to keep boards synchronized.
- PostgreSQL enables robust relational modeling for users, scrapboards, notes, images, lines, and share metadata.
- The stack supports offline-friendly client behavior and graceful recovery by leveraging Supabase's client-side SDK plus local state.

## Implementation Notes

- Use `@supabase/auth-helpers-sveltekit` for secure auth flows, session persistence, and protected routes.
- Use Supabase Storage for image uploads and handwritten note assets, serving media via signed URLs.
- Model freeform board items in PostgreSQL with note/image position, size, rotation, z-order, theme, and connection metadata.
- Use Supabase Realtime for cross-tab sync of board updates and to keep shared-read views fresh.
- Implement soft delete with a `deleted_at` column and a 30-day purge policy in Supabase migrations.
- Use SvelteKit routes for share tokens and public read-only board hydration.

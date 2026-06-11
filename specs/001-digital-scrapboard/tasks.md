# Tasks: Digital Scrapboard - Implementation Roadmap

**Feature**: Digital Scrapboard - Artistic Note & Image Collaboration Space  
**Branch**: `001-digital-scrapboard`  
**Date Created**: 2026-05-08  
**Tech Stack**: SvelteKit + TypeScript + Supabase + PostgreSQL  
**Spec**: [spec.md](spec.md) | **Plan**: [plan.md](plan.md)

---

## Implementation Overview

This task breakdown organizes work by **user story** (the core unit of delivery) to enable independent testing and parallel implementation. Each user story phase is self-contained and independently testable.

**MVP Scope**: User Stories 1–3, 6, 7 (P1 features)  
**Post-MVP**: User Stories 4, 5 (P2 features)

---

## Phase 1: Setup & Project Initialization

**Goal**: Establish project structure, tooling, and infrastructure.

**Independent Test Criteria**:
- Project builds without errors
- All dependencies install successfully
- Local development environment runs
- Supabase project is accessible and configured

**Tasks**:

- [x] T001 Initialize SvelteKit project with TypeScript in `frontend/` directory
- [x] T002 Create Supabase project and configure in `.env`
- [x] T003 Install frontend dependencies (SvelteKit, Supabase client, testing tools) in `frontend/`
- [x] T004 Set up `supabase/` directory with migrations folder structure
- [x] T005 Configure environment variables: `PUBLIC_SUPABASE_URL`, `PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- [x] T006 Initialize Vitest and Testing Library for unit tests in `frontend/`
- [x] T007 Initialize Playwright for end-to-end tests in `tests/e2e/`
- [x] T008 Set up GitHub Actions workflow for CI/CD (optional for MVP, required for production)
- [x] T009 Create README with local setup and development instructions
- [x] T010 Set up git ignore and project structure documentation

---

## Phase 2: Foundational Infrastructure

**Goal**: Establish database schema, auth middleware, and shared UI components.

**Independent Test Criteria**:
- All database migrations run successfully
- Auth middleware correctly protects routes
- Supabase Storage buckets are created
- Base layout and navigation render without errors

**Tasks**:

- [x] T011 Create PostgreSQL migrations for all entities in `supabase/migrations/` (User, Scrapboard, Note, Image, Line, SharedAccess tables)
- [x] T012 Set up Supabase row-level security (RLS) policies for authenticated access
- [x] T013 Configure Supabase Auth with email/password provider
- [x] T014 Create Supabase Storage bucket for image uploads (`images` bucket with appropriate access rules)
- [x] T015 Implement Supabase session management in SvelteKit hooks in `frontend/src/lib/server/auth.ts`
- [x] T016 Create protected route middleware to enforce email verification in `frontend/src/hooks.server.ts`
- [x] T017 Build base layout component in `frontend/src/routes/+layout.svelte` (header, nav, auth state)
- [x] T018 Create shared Svelte component library for buttons, modals, inputs in `frontend/src/components/ui/`
- [x] T019 Implement Svelte stores for global app state (user, auth status) in `frontend/src/stores/`
- [x] T020 Set up TypeScript Zod validation schemas for API payloads in `frontend/src/lib/schemas.ts`

---

## Phase 3: User Story 1 – Create Personal Scrapboard (P1)

**Story Goal**: Users sign up, verify their email, and see their first blank scrapboard.

**Independent Test Criteria**:
- User can complete signup and receive verification email
- User can verify email and access authenticated dashboard
- Blank scrapboard persists across sessions
- Auto-save is confirmed working

**User Story Tasks**:

- [x] T021 [P] [US1] Create signup form component in `frontend/src/routes/auth/signup/+page.svelte`
- [x] T022 [P] [US1] Implement email signup API route in `frontend/src/routes/api/auth/signup/+server.ts`
- [x] T023 [P] [US1] Implement email verification flow in `frontend/src/routes/api/auth/verify-email/+server.ts`
- [x] T024 [US1] Create email verification UI route in `frontend/src/routes/auth/verify/+page.svelte`
- [x] T025 [US1] Implement authenticated dashboard showing user's scrapboards in `frontend/src/routes/dashboard/+page.svelte`
- [x] T026 [P] [US1] Implement create scrapboard API in `frontend/src/routes/api/scrapboards/+server.ts`
- [x] T027 [P] [US1] Build scrapboard canvas component in `frontend/src/components/Scrapboard.svelte` (blank state)
- [x] T028 [US1] Implement auto-save functionality in `frontend/src/lib/autosave.ts`
- [x] T029 [US1] Write unit tests for signup, verification, and scrapboard creation in `tests/unit/auth.test.ts`
- [x] T030 [US1] Write integration tests for User Story 1 in `tests/integration/us1-create-scrapboard.test.ts`

**Test Scenario**:
1. User signs up with email and password
2. User receives verification email (mock or test inbox)
3. User clicks verification link
4. User is logged in and sees blank scrapboard
5. User navigates away and returns; scrapboard persists
6. Auto-save updates confirmed in database

---

## Phase 4: User Story 2 – Add & Arrange Notes (P1)

**Story Goal**: Users create typed and handwritten notes, position them freely on the canvas.

**Independent Test Criteria**:
- Typed notes can be created and edited
- Handwritten notes can be drawn and saved as images
- Notes can be freely positioned and moved without grid snapping
- Notes can be overlapped
- Notes can be deleted with undo capability
- Background themes can be selected and persist

**User Story Tasks**:

- [x] T031 [P] [US2] Implement create note API in `frontend/src/routes/api/notes/+server.ts` (typed and handwritten types)
- [x] T032 [P] [US2] Implement update note API for position, size, text in `frontend/src/routes/api/notes/[id]/+server.ts`
- [x] T033 [P] [US2] Implement delete note API with soft delete in `frontend/src/routes/api/notes/[id]/+server.ts`
- [x] T034 [P] [US2] Build note creation UI (typed/handwritten toggle) in `frontend/src/components/NoteCreator.svelte`
- [x] T035 [P] [US2] Build canvas drawing component for handwritten notes in `frontend/src/components/DrawingCanvas.svelte`
- [x] T036 [US2] Build Note component with drag-and-drop in `frontend/src/components/Note.svelte`
- [x] T037 [US2] Implement freeform positioning (no grid snapping) in canvas layout
- [x] T038 [US2] Build background theme selector component in `frontend/src/components/ThemeSelector.svelte`
- [x] T039 [US2] Implement undo/redo for note operations in `frontend/src/lib/undo.ts`
- [x] T040 [US2] Write unit tests for note creation, editing, positioning in `tests/unit/notes.test.ts`
- [x] T041 [US2] Write integration tests for User Story 2 in `tests/integration/us2-notes.test.ts`

**Test Scenario**:
1. User clicks "Add Note" and selects Typed
2. User types text and positions note on canvas
3. User creates a second note and overlaps it with first
4. User creates a Handwritten note and draws on canvas
5. User edits existing note text
6. User selects background theme for note
7. User deletes a note and undoes within 30 seconds
8. User refreshes page; notes persist with correct positions and themes

---

## Phase 5: User Story 3 – Upload & Display Images (P1)

**Story Goal**: Users upload images to scrapboard and position them freely.

**Independent Test Criteria**:
- Images upload successfully to Supabase Storage
- Images display on canvas within 3 seconds (up to 5MB)
- Images can be resized and rotated
- Images can be deleted with undo capability
- Images can overlap with notes and other images

**User Story Tasks**:

- [ ] T042 [P] [US3] Implement image upload API in `frontend/src/routes/api/images/+server.ts` (multipart form data)
- [ ] T043 [P] [US3] Implement image metadata update API in `frontend/src/routes/api/images/[id]/+server.ts` (position, size, rotation)
- [ ] T044 [P] [US3] Implement image deletion API in `frontend/src/routes/api/images/[id]/+server.ts`
- [ ] T045 [P] [US3] Build image upload UI with file picker in `frontend/src/components/ImageUploader.svelte`
- [ ] T046 [P] [US3] Build Image component with resize handles and rotation in `frontend/src/components/Image.svelte`
- [ ] T047 [US3] Implement image optimization and caching in `frontend/src/lib/imageOptimize.ts`
- [ ] T048 [US3] Implement image overlay for delete/rotate options
- [ ] T049 [US3] Write unit tests for image upload, resize, rotation in `tests/unit/images.test.ts`
- [ ] T050 [US3] Write integration tests for User Story 3 in `tests/integration/us3-images.test.ts`

**Test Scenario**:
1. User clicks "Add Image" and selects JPG file (< 5MB)
2. Image uploads and displays on canvas within 3 seconds
3. User drags image corner to resize proportionally
4. User clicks rotation handle to rotate image
5. User overlaps image with existing note
6. User deletes image and undoes within 30 seconds
7. User refreshes page; image persists with correct position, size, rotation

---

## Phase 6: User Story 6 – Draw Connecting Lines (P1)

**Story Goal**: Users draw connection lines between notes and images to show relationships.

**Independent Test Criteria**:
- Lines can be drawn between any two elements (note-to-note, note-to-image, image-to-image)
- Lines move with connected elements
- Lines can be styled (solid/dashed, colors)
- Lines can be deleted with undo capability
- Z-order is manageable for overlapping lines

**User Story Tasks**:

- [ ] T051 [P] [US6] Implement create line API in `frontend/src/routes/api/lines/+server.ts`
- [ ] T052 [P] [US6] Implement update line API in `frontend/src/routes/api/lines/[id]/+server.ts`
- [ ] T053 [P] [US6] Implement delete line API in `frontend/src/routes/api/lines/[id]/+server.ts`
- [ ] T054 [P] [US6] Build line drawing mode UI (toggle button, cursor change) in `frontend/src/components/DrawLineMode.svelte`
- [ ] T055 [P] [US6] Implement line rendering with SVG or canvas in `frontend/src/components/Line.svelte`
- [ ] T056 [US6] Implement line styling selector (solid, dashed, colors) in `frontend/src/components/LineStyler.svelte`
- [ ] T057 [US6] Implement connection point detection on elements
- [ ] T058 [US6] Write unit tests for line creation, styling, deletion in `tests/unit/lines.test.ts`
- [ ] T059 [US6] Write integration tests for User Story 6 in `tests/integration/us6-lines.test.ts`

**Test Scenario**:
1. User clicks "Draw Line" mode
2. User clicks on one note and drags to another note
3. Line appears connecting the two notes
4. User moves first note; line follows
5. User selects line styling (dashed, color)
6. User hovers over line and clicks delete
7. User undoes deletion within 30 seconds
8. User refreshes page; line persists with correct style

---

## Phase 7: User Story 7 – Note Background Themes (P1)

**Story Goal**: Users customize note appearance with artistic background themes.

**Independent Test Criteria**:
- 6–8 background theme options are available
- Themes display correctly and persistently
- Themes are visually distinct and cohesive
- Themes can be changed after note creation

**User Story Tasks**:

- [ ] T060 [P] [US7] Add background_theme column to Note table migration in `supabase/migrations/`
- [ ] T061 [P] [US7] Update Zod schema to include background_theme validation in `frontend/src/lib/schemas.ts`
- [ ] T062 [US7] Create theme CSS/styling in `frontend/src/styles/themes.css` (yellow_sticky, pink_sticky, kraft_paper, postcard, blue_sticky, scrap)
- [ ] T063 [US7] Build theme selector UI component in `frontend/src/components/ThemeSelector.svelte`
- [ ] T064 [US7] Integrate theme selector into Note component rendering
- [ ] T065 [US7] Implement theme persistence in note update API
- [ ] T066 [US7] Write unit tests for theme selection and persistence in `tests/unit/themes.test.ts`
- [ ] T067 [US7] Write integration tests for User Story 7 in `tests/integration/us7-themes.test.ts`

**Test Scenario**:
1. User creates a new note
2. User selects from 6–8 theme options (e.g., "Yellow Sticky", "Kraft Paper")
3. Note displays with selected theme
4. User changes to different theme; note updates visually
5. User creates multiple notes with different themes; all themes render correctly
6. User refreshes page; all themes persist

---

## Phase 8: User Story 4 – Share Scrapboard (P2)

**Story Goal**: Users share scrapboards via read-only links.

**Independent Test Criteria**:
- Share links are generated and unique
- Unauthenticated users can view shared scrapboards in read-only mode
- Shared views receive real-time updates
- Share links can be revoked
- Creator attribution is displayed

**User Story Tasks**:

- [ ] T068 [P] [US4] Implement share link generation API in `frontend/src/routes/api/scrapboards/[id]/share/+server.ts`
- [ ] T069 [P] [US4] Implement share link revocation API
- [ ] T070 [P] [US4] Build share UI with link and copy-to-clipboard in `frontend/src/components/ShareDialog.svelte`
- [ ] T071 [US4] Create public read-only scrapboard view route in `frontend/src/routes/share/[token]/+page.svelte`
- [ ] T072 [US4] Implement RLS policies for public share access
- [ ] T073 [US4] Implement real-time sync for shared viewers using Supabase Realtime
- [ ] T074 [US4] Display creator attribution on shared scrapboards
- [ ] T075 [US4] Write unit tests for share link generation and revocation in `tests/unit/sharing.test.ts`
- [ ] T076 [US4] Write integration tests for User Story 4 in `tests/integration/us4-sharing.test.ts`

**Test Scenario**:
1. User clicks "Share" on their scrapboard
2. Unique share link is generated and displayed
3. User copies link to clipboard
4. Another user (unauthenticated) visits link
5. Shared user sees scrapboard content in read-only mode
6. Creator makes changes; shared viewer sees updates in real-time
7. Creator revokes share link
8. Shared link no longer works; friendly message displayed

---

## Phase 9: User Story 5 – Edit & Manage Scrapboard (P2)

**Story Goal**: Users manage multiple scrapboards with metadata and organization.

**Independent Test Criteria**:
- Scrapboard titles and descriptions can be updated
- Multiple scrapboards can be created and listed
- Scrapboards can be soft-deleted and recovered within 30 days
- Scrapboard switching works smoothly

**User Story Tasks**:

- [ ] T077 [P] [US5] Implement update scrapboard API (title, description, visibility) in `frontend/src/routes/api/scrapboards/[id]/+server.ts`
- [ ] T078 [P] [US5] Implement scrapboard deletion (soft delete) API
- [ ] T079 [P] [US5] Build scrapboard list view with create/delete/rename actions in `frontend/src/routes/dashboard/+page.svelte`
- [ ] T080 [US5] Build scrapboard settings/metadata editor in `frontend/src/components/ScrapboardSettings.svelte`
- [ ] T081 [US5] Implement trash/recovery view for deleted scrapboards in `frontend/src/routes/dashboard/trash/+page.svelte`
- [ ] T082 [US5] Implement navigation between scrapboards in sidebar/menu
- [ ] T083 [US5] Write unit tests for scrapboard CRUD operations in `tests/unit/scrapboards.test.ts`
- [ ] T084 [US5] Write integration tests for User Story 5 in `tests/integration/us5-management.test.ts`

**Test Scenario**:
1. User creates multiple scrapboards
2. User views dashboard with list of scrapboards
3. User clicks scrapboard and opens it
4. User clicks settings and updates title/description
5. User navigates to different scrapboard
6. User deletes scrapboard (soft delete)
7. User views trash and recovers scrapboard within 30 days
8. User permanently deletes scrapboard (hard delete after 30 days)

---

## Phase 10: Polish & Cross-Cutting Concerns

**Goal**: Optimize performance, error handling, accessibility, and prepare for deployment.

**Independent Test Criteria**:
- 100+ items render with responsive performance
- Error messages are clear and actionable
- Accessibility audit passes (WCAG 2.1 AA)
- Deployment to Vercel/Netlify succeeds
- Production environment is monitored

**Tasks**:

- [ ] T085 [P] Implement comprehensive error handling and user feedback in `frontend/src/lib/errorHandler.ts`
- [ ] T086 [P] Optimize image loading, caching, and lazy loading in `frontend/src/lib/imageOptimize.ts`
- [ ] T087 Performance testing with 100+ items on canvas in `tests/performance/canvas-stress.test.ts`
- [ ] T088 Implement offline support and change queuing in `frontend/src/lib/offlineQueue.ts`
- [ ] T089 Set up application logging and error tracking (Sentry or similar)
- [ ] T090 Accessibility audit and WCAG 2.1 AA compliance fixes
- [ ] T091 Create end-to-end test suite covering all user stories in `tests/e2e/full-journey.test.ts`
- [ ] T092 Configure Vercel/Netlify deployment and environment variables
- [ ] T093 Set up database backups and recovery procedures
- [ ] T094 Write deployment and runbook documentation
- [ ] T095 Security audit (auth, input validation, RLS policies, CORS)
- [ ] T096 Load testing and performance optimization
- [ ] T097 User acceptance testing (UAT) checklist

---

## Task Execution Strategy

### Dependencies

```
Phase 1 (Setup)
    ↓
Phase 2 (Foundational)
    ├── Phase 3 (US1)
    │   ├── Phase 4 (US2)
    │   │   ├── Phase 5 (US3)
    │   │   ├── Phase 6 (US6)
    │   │   └── Phase 7 (US7)
    │   └── Phase 8 (US4)
    ├── Phase 9 (US5)
    └── Phase 10 (Polish)
```

**Key Insights**:
- Phases 3–7 are largely independent after Phase 2 and can run in parallel
- Phase 8 (US4) can start after Phase 3 (US1) is complete
- Phase 9 (US5) can start after Phase 3 (US1) is complete
- Phase 10 (Polish) can run concurrently with later user story phases

### Parallel Execution Examples

**Sprint 1** (Weeks 1–2):
- Phase 1: Setup & Project Initialization (T001–T010)
- Phase 2: Foundational Infrastructure (T011–T020)

**Sprint 2** (Weeks 3–4):
- Phase 3: US1 (T021–T030) — Single developer
- Phase 2 Continued: Deploy migrations and auth (T011–T020) — Database engineer

**Sprint 3** (Weeks 5–6):
- Phase 4: US2 (T031–T041) — Developer A
- Phase 5: US3 (T042–T050) — Developer B
- Phase 6: US6 (T051–T059) — Developer C (parallel)

**Sprint 4** (Weeks 7–8):
- Phase 7: US7 (T060–T067) — Developer A
- Phase 8: US4 (T068–T076) — Developer B
- Phase 9: US5 (T077–T084) — Developer C (parallel)

**Sprint 5** (Weeks 9–10):
- Phase 10: Polish & Cross-Cutting (T085–T097)
- Testing and refinement

### MVP Delivery Path

**For fastest MVP delivery, complete in this order**:
1. Phase 1 + Phase 2 (Setup + Foundational)
2. Phase 3 (US1 - Create Scrapboard)
3. Phase 4 (US2 - Add Notes)
4. Phase 5 (US3 - Upload Images)
5. Phase 6 (US6 - Draw Lines)
6. Phase 7 (US7 - Themes)
7. Phase 10 (Polish for MVP release)

**Post-MVP Phases**:
- Phase 8 (US4 - Sharing)
- Phase 9 (US5 - Management)

---

## Success Metrics by Phase

| Phase | Success Metric | Target |
|-------|----------------|--------|
| Phase 1 | Project builds and runs locally | 100% |
| Phase 2 | Auth middleware protects routes | 100% |
| Phase 3 | User can sign up and see blank board | ≥95% |
| Phase 4 | Notes can be created and positioned | ≥95% |
| Phase 5 | Images upload and display within 3s | ≥95% of images ≤5MB |
| Phase 6 | Lines connect elements and move with them | 100% |
| Phase 7 | Themes persist and render correctly | 100% |
| Phase 8 | Share links work for unauthenticated users | 100% |
| Phase 9 | Multiple scrapboards manageable | ≥95% |
| Phase 10 | 100+ items render with <500ms pan/zoom | ≥95% |
| Phase 10 | WCAG 2.1 AA compliance | 100% |

---

## Task Format Reference

Every task follows this strict format:

```
- [ ] [TaskID] [P?] [Story?] Description with file path
```

**Components**:
- `- [ ]` — Markdown checkbox (REQUIRED)
- `[TaskID]` — Sequential ID (T001, T002, etc.) (REQUIRED)
- `[P]` — Parallelizable marker (OPTIONAL, only if independent)
- `[Story]` — User story label like [US1], [US2], etc. (REQUIRED for story phases only)
- Description + file path — Clear action and target file (REQUIRED)

**Examples**:
- `- [ ] T001 Initialize SvelteKit project with TypeScript in \`frontend/\` directory`
- `- [ ] T021 [P] [US1] Create signup form component in \`frontend/src/routes/auth/signup/+page.svelte\``
- `- [ ] T031 [P] [US2] Implement create note API in \`frontend/src/routes/api/notes/+server.ts\``


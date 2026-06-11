# Feature Specification: Digital Scrapboard - Artistic Note & Image Collaboration Space

**Feature Branch**: `001-digital-scrapboard`  
**Created**: 2026-04-28  
**Status**: Draft  
**Input**: User description: "Create a detailed project specification for a web application that allows users to create and share notes/thoughts/etc. The application should include user authentication, note creation and editing, and note sharing features. Images should be able to upload. The application goal is something like a digital scrapboard/idea board/collage space/evidence board. I want an artistic feeling digital space where users can feel like they are printing out pictures or writing on sticky notes, but digitally. It can be used for brainstorming mysteries, putting together inspirations, etc. A white board where users can handwrite what they are thinking digitally!"

## Clarifications

### Session 2026-04-28

- Q: Should drawing lines/connections be in MVP or post-MVP? → A: Both - flexible connecting lines in MVP (evidence board yarn), free-hand drawing in post-MVP
- Q: Which note input styles in MVP (typed, handwritten with stylus/mouse)? → A: Typed + Handwritten (both input methods in MVP for full artistic expression)
- Q: Should email verification be required before access? → A: Yes, required verification before board access (security for account ownership)
- Q: Note background options (fixed themes vs full customization)? → A: Fixed presets (sticky notes, paper scraps, postcards, etc.) in MVP; customization in post-MVP

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Create Personal Scrapboard (Priority: P1)

A user signs up and creates their first scrapboard—a blank digital canvas where they can start collecting ideas, notes, and images. This is the foundational experience that onboards users and demonstrates the core concept.

**Why this priority**: This is the critical MVP foundation. Without the ability to create and see a scrapboard, no other feature has value. Users need to experience the artistic digital canvas immediately upon signup.

**Independent Test**: Can be fully tested by: user creates account → views blank scrapboard → understands the canvas is ready for content. Delivers: functional scrapboard where users can begin adding content.

**Acceptance Scenarios**:

1. **Given** a new user visits the application, **When** they complete the signup process and submit their email, **Then** they receive a verification email with an activation link
2. **Given** a user receives the verification email, **When** they click the activation link, **Then** their account is confirmed and they are logged in to see their first blank scrapboard
3. **Given** a user has created and verified their account, **When** they return to the application, **Then** their scrapboard persists with all previously added content
4. **Given** a user is viewing their scrapboard, **When** they click away or navigate, **Then** any unsaved changes are automatically persisted (auto-save)
5. **Given** a user views their scrapboard, **When** they see the canvas, **Then** the interface clearly communicates they can add notes, images, and draw connections (visual affordance)

---

### User Story 2 - Add & Arrange Notes (Priority: P1)

Users add text notes (sticky-note style) to their scrapboard and position them freeform on the canvas. The artistic, tactile feel comes from being able to place notes anywhere and see them as if physically placed.

**Why this priority**: Adding notes is essential to the "whiteboard where users can handwrite digitally" vision. Without notes, the scrapboard is incomplete. This directly supports brainstorming and idea collection use cases.

**Independent Test**: Can be fully tested by: user creates a note → types text → places it on canvas → edits it → deletes it. Delivers: functional note creation that feels natural and artistic.

**Acceptance Scenarios**:

1. **Given** a user is on their scrapboard, **When** they click "Add Note", **Then** they see options to create: (1) Typed note, or (2) Handwritten note (stylus/mouse)
2. **Given** a user selects "Typed Note", **When** they see a text input, **Then** they can type text and the note is saved when they click elsewhere
3. **Given** a user selects "Handwritten Note", **When** they see a canvas area, **Then** they can draw/write with stylus or mouse and the handwriting is preserved as an image
4. **Given** a user has created a note (typed or handwritten), **When** they view the note, **Then** they can select a background style (sticky note yellow, pink, kraft paper, postcard, etc.)
5. **Given** a user has a note on the canvas, **When** they click and drag the note, **Then** it smoothly moves to a new position and can overlap other notes
6. **Given** a user has a note on the canvas, **When** they click the note again, **Then** they can edit the text content (for typed notes) or see the handwritten content
7. **Given** a user has notes on the canvas, **When** they arrange them, **Then** the layout feels natural and organic (not snapped to grid—free positioning with full overlap)
8. **Given** a user no longer wants a note, **When** they click the delete button on the note, **Then** it is removed and the action can be undone within 30 seconds

---

### User Story 3 - Upload & Display Images (Priority: P1)

Users upload images (photos, inspiration boards, reference images) to their scrapboard. Images should be treated as first-class content, positioned freely like physical printed photos pinned to a board.

**Why this priority**: Images are core to the "printing out pictures" and "collage space" vision. The application is incomplete without image support. This enables vision boards, evidence boards, and brainstorming use cases.

**Independent Test**: Can be fully tested by: user uploads image → image appears on canvas → user repositions it → user resizes it. Delivers: fully functional image placement matching the sticky-note aesthetic.

**Acceptance Scenarios**:

1. **Given** a user is on their scrapboard, **When** they click "Add Image" or drag an image onto the canvas, **Then** a file picker opens and allows them to select an image file
2. **Given** a user selects an image, **When** the upload completes, **Then** the image appears on the canvas at a natural position (not overlapping existing content)
3. **Given** an image is on the canvas, **When** the user clicks and drags it, **Then** it moves smoothly to a new position
4. **Given** an image is on the canvas, **When** the user grabs the corner resize handle and drags, **Then** the image resizes proportionally
5. **Given** an image is on the canvas, **When** the user hovers over it, **Then** a subtle overlay shows delete and rotation options (artistic interaction)
6. **Given** a user uploads large images, **When** they are displayed on the canvas, **Then** they load within 3 seconds for images up to 5MB and are optimized for web display
7. **Given** an image is no longer wanted, **When** the user clicks delete, **Then** it is removed and the action can be undone within 30 seconds

---

### User Story 4 - Share Scrapboard (Priority: P2)

Users can share their scrapboard with others via a shareable link. Shared scrapboards are read-only in the first release; future collaborative editing is a later enhancement.

**Why this priority**: Sharing enables collaboration and inspiration-sharing use cases (mystery brainstorming, mood boards, evidence boards). It's valuable but secondary to core creation functionality. Can be launched as read-only view first.

**Independent Test**: Can be fully tested by: user shares scrapboard → receives shareable link → another user visits link → views the scrapboard content. Delivers: functional read-only sharing that doesn't require recipients to have accounts.

**Acceptance Scenarios**:

1. **Given** a user has created a scrapboard, **When** they click "Share", **Then** a dialog displays a unique shareable link and copy-to-clipboard button
2. **Given** a shareable link is visited, **When** an unauthenticated user accesses it, **Then** they see the scrapboard content in read-only mode without needing to log in
3. **Given** a shared scrapboard is viewed, **When** the recipient views it, **Then** they see all notes and images exactly as the creator arranged them
4. **Given** a shared scrapboard is being viewed, **When** the original creator makes changes, **Then** shared viewers receive real-time updates in read-only mode
5. **Given** a user wants to revoke sharing, **When** they disable the share link, **Then** the link no longer provides access and previously shared viewers can no longer view the board

---

### User Story 5 - Edit & Manage Scrapboard (Priority: P2)

Users can rename their scrapboards, add descriptions, manage content organization, and control visibility settings.

**Why this priority**: These features enhance organization and discoverability but aren't required for core MVP. They enable power users to manage multiple scrapboards effectively.

**Independent Test**: Can be fully tested by: user updates scrapboard title → adds description → changes visibility settings. Delivers: functional scrapboard metadata management.

**Acceptance Scenarios**:

1. **Given** a user has created a scrapboard, **When** they click the title, **Then** they can edit the scrapboard name and description
2. **Given** a user is viewing their scrapboards, **When** they click a scrapboard, **Then** it loads with the correct title and metadata displayed
3. **Given** a user wants to organize content, **When** they create multiple scrapboards, **Then** they can switch between them easily from a navigation menu
4. **Given** a user no longer wants a scrapboard, **When** they click delete, **Then** it is moved to trash and can be recovered within 30 days

---

### User Story 6 - Draw Connecting Lines (Priority: P1)

Users can draw connecting lines between notes and images to show relationships, connections, and evidence chains (like yarn on evidence boards or mind map connections).

**Why this priority**: Drawing lines is essential for evidence boards, mystery solving, and brainstorming use cases. It transforms the scrapboard from a passive collection into an active relationship map. This is a core artistic feature.

**Independent Test**: Can be fully tested by: user draws line between two notes → line persists → line can be deleted → user arranges with overlapping notes and lines remain visible. Delivers: functional connection system for evidence relationships.

**Acceptance Scenarios**:

1. **Given** a user has multiple notes on the scrapboard, **When** they click "Draw Line" mode, **Then** the canvas enters connection-drawing mode with visual affordance (cursor changes or toolbar highlights)
2. **Given** the user is in draw-line mode, **When** they click on one note and drag to another, **Then** a line is drawn connecting the two elements
3. **Given** a line is drawn between two notes, **When** either note is moved, **Then** the line moves with it, maintaining the connection
4. **Given** a line is drawn, **When** the user hovers over it, **Then** a delete button appears to remove the line
5. **Given** a user has drawn multiple lines, **When** the line is drawn over or under other elements, **Then** the z-order is manageable (lines appear behind or in front as needed for clarity)
6. **Given** a user no longer wants a line, **When** they click the delete button, **Then** the line is removed and can be undone within 30 seconds
7. **Given** the user wants to exit draw-line mode, **When** they press Escape or click elsewhere, **Then** they return to normal selection mode

---

### User Story 7 - Note Background Themes (Priority: P1)

Users can choose from artistic note background themes (sticky notes, paper scraps, postcards) to customize the visual appearance and support their artistic expression.

**Why this priority**: Background themes are core to the artistic, tactile feeling you envisioned. The visual variety supports different moods and use cases (pink sticky for inspiration, kraft paper for mystery boards, postcards for mood boards). This is P1 because it's fundamental to the artistic experience.

**Independent Test**: Can be fully tested by: user creates note → selects different background themes → themes persist → user switches boards and themes remain. Delivers: customizable artistic note aesthetics.

**Acceptance Scenarios**:

1. **Given** a user creates a new note (typed or handwritten), **When** the note appears on canvas, **Then** they can immediately select a background theme from a visual palette
2. **Given** the background palette is open, **When** the user sees 6-8 preset options (e.g., "Yellow Sticky", "Pink Sticky", "Kraft Paper", "Postcard", "Blue Sticky", "Scrap"), **Then** each shows a preview of that theme
3. **Given** a user selects a background theme, **When** they click the option, **Then** the note's background changes immediately to that theme
4. **Given** a note has a background theme applied, **When** the note is saved, **Then** the theme persists when the scrapboard is reloaded
5. **Given** a user has multiple notes with different themes, **When** they view the scrapboard, **Then** all themes display correctly and create a cohesive artistic composition
6. **Given** a note already has a theme applied, **When** the user clicks the note, **Then** they can select a different theme to change it
7. **Given** a user is arranging overlapping notes with different themes, **When** they move and overlap notes, **Then** the themes remain visually distinct and artistic

---

### Edge Cases

- What happens when a user uploads a corrupted image file? System should display a clear error message: "The image couldn't be loaded. Please try a different file."
- What happens when the user's connection drops while editing? Auto-save should ensure no data is lost; when connection restores, a "Changes synced" notification appears.
- What happens when a scrapboard becomes very large (100+ items)? System should optimize rendering and provide search/filter options to maintain performance.
- What happens when a user tries to upload an extremely large image (>50MB)? System should display a file size limit message and suggest compression.
- What happens when a shared link is accessed but the content has been deleted? System should display a friendly message: "This scrapboard is no longer available."
- What happens when two collaborative users try to edit the same note simultaneously? The last edit wins, with conflict resolution notification to both users.

## Requirements *(mandatory)*

### Functional Requirements

**Authentication & Account Management**

- **FR-001**: System MUST allow new users to create accounts with email and password
- **FR-002**: System MUST validate email addresses and prevent duplicate accounts
- **FR-003**: System MUST send a verification email to the user's email address upon signup
- **FR-004**: System MUST require users to verify their email via activation link before accessing their scrapboard
- **FR-005**: System MUST authenticate users and maintain secure sessions after email verification
- **FR-006**: Users MUST be able to reset their password via email verification link
- **FR-007**: System MUST securely encrypt and store user passwords

**Scrapboard Creation & Management**

- **FR-008**: System MUST allow authenticated users to create new scrapboards
- **FR-009**: System MUST display a list of the user's scrapboards in a dashboard
- **FR-010**: System MUST allow users to open, save, and reload different scrapboards from the dashboard
- **FR-011**: System MUST allow users to rename and add descriptions to scrapboards
- **FR-012**: System MUST allow users to delete scrapboards (with soft delete/trash functionality for 30-day recovery)
- **FR-013**: System MUST auto-save all changes to scrapboards in real-time

**Note Management**

- **FR-014**: System MUST allow users to create typed text notes on the scrapboard canvas
- **FR-015**: System MUST allow users to create handwritten notes using stylus or mouse input
- **FR-016**: System MUST preserve handwritten note content as an image within the note
- **FR-017**: System MUST allow users to choose from 6-8 preset background themes (sticky note colors, kraft paper, postcards, paper scraps)
- **FR-018**: System MUST apply selected background themes immediately and persist them
- **FR-019**: System MUST allow users to edit note text content after creation (for typed notes)
- **FR-020**: System MUST allow users to delete notes with undo capability (30-second window)
- **FR-021**: System MUST persist note position, size, and background theme when moved/resized
- **FR-022**: System MUST support overlapping notes without forced repositioning or snapping

**Image Management**

- **FR-023**: System MUST allow users to upload images to the scrapboard
- **FR-024**: System MUST support common image formats (JPG, PNG, GIF, WebP) and reject unsupported formats
- **FR-025**: System MUST resize and optimize images for web display (compress to <2MB)
- **FR-026**: System MUST allow users to delete images with undo capability (30-second window)
- **FR-027**: System MUST allow users to resize images proportionally and rotate them
- **FR-028**: System MUST persist image position, size, and rotation when moved/resized
- **FR-029**: System MUST support overlapping images with other images and notes

**Drawing & Connections**

- **FR-030**: System MUST allow users to draw connecting lines between notes and images
- **FR-031**: System MUST support click-and-drag line drawing from one element to another
- **FR-032**: System MUST maintain line connections when connected elements move
- **FR-033**: System MUST allow deletion of lines with undo capability (30-second window)
- **FR-034**: System MUST manage line z-order for clarity when overlapping other content
- **FR-035**: System MUST provide line styling options (solid, dashed, color variations)

**Sharing & Collaboration**

- **FR-036**: System MUST generate unique shareable links for scrapboards
- **FR-037**: System MUST allow shared viewers to access scrapboards without authentication
- **FR-038**: System MUST enforce read-only access for shared scrapboards by default
- **FR-039**: System MUST allow creators to revoke share links and remove access
- **FR-040**: System MUST display creator attribution on shared scrapboards

**Data Persistence & Sync**

- **FR-041**: System MUST persist all user data (accounts, scrapboards, notes, images, lines) durably
- **FR-042**: System MUST sync changes across multiple browser tabs in real-time for the same user
- **FR-043**: System MUST handle offline state gracefully (queue changes and sync when online)
- **FR-044**: System MUST provide visual feedback when content is being saved

### Key Entities

- **User**: Represents a registered user account. Attributes: id, email, password (hashed), username, email_verified (boolean), email_verification_token, created_date, updated_date, settings
- **Scrapboard**: A canvas/board containing multiple notes, images, and lines. Attributes: id, title, description, owner_user_id, created_date, updated_date, visibility (private/shared), share_token
- **Note**: A text-based or handwritten element on a scrapboard. Attributes: id, scrapboard_id, type (typed/handwritten), content (text or image_url for handwritten), position_x, position_y, width, height, background_theme (yellow_sticky, pink_sticky, kraft_paper, postcard, blue_sticky, scrap), z_order, created_date, updated_date
- **Image**: An uploaded image element on a scrapboard. Attributes: id, scrapboard_id, file_url, position_x, position_y, width, height, rotation_degrees, z_order, created_date, updated_date
- **Line**: A connecting line between notes/images on a scrapboard. Attributes: id, scrapboard_id, from_element_id, from_element_type, to_element_id, to_element_type, style (solid/dashed), color, z_order, created_date, updated_date
- **SharedAccess**: Represents permission to view a scrapboard. Attributes: scrapboard_id, share_token, created_date, expires_date (optional)

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can complete account signup and see their first blank scrapboard within 1 minute
- **SC-002**: Users can add a note and an image to their scrapboard within 2 minutes of signup
- **SC-003**: All content changes (notes, images, positioning) are persisted and visible across browser tabs within 1 second
- **SC-004**: 95% of image uploads complete and display within 3 seconds for images up to 5MB
- **SC-005**: Scrapboards support at least 100 items (notes + images) with responsive performance (pan/zoom under 500ms)
- **SC-006**: 90% of users rate the artistic feel and interface intuitiveness as "good" or "excellent" in usability testing
- **SC-007**: Shared scrapboard links are accessible and render correctly for users without accounts
- **SC-008**: System uptime meets 99.5% availability monthly
- **SC-009**: Average page load time for scrapboards is under 2 seconds, even with 50+ items
- **SC-010**: Users can undo deletions within the 30-second window 100% of the time with no data loss

### Assumptions

- Users have modern browsers (Chrome, Firefox, Safari, Edge) with CSS Grid/Flexbox and HTML5 Canvas support
- Image uploads are limited to authenticated users to prevent abuse
- Shared scrapboards are read-only by default; shared viewers receive real-time updates in read-only mode
- Acceptable file size limit for images is 50MB (with optimization to <2MB for display)
- Real-time sync uses WebSockets or polling for sub-second update propagation
- Data retention: deleted items are soft-deleted and moved to trash for 30 days before permanent deletion
- Authentication uses industry-standard hashing (bcrypt or Argon2) for password storage
- Scrapboards are limited to a reasonable size to prevent performance degradation (start with 100-item limit, adjust based on testing)

# Data Model: Digital Scrapboard

## Entities

### User
- id: UUID
- email: string
- password_hash: string
- username: string
- email_verified: boolean
- email_verification_token: string
- reset_password_token: string | null
- created_at: timestamp
- updated_at: timestamp
- settings: jsonb

### Scrapboard
- id: UUID
- title: string
- description: string
- owner_user_id: UUID
- visibility: enum(`private`, `shared`)
- share_token: string | null
- deleted_at: timestamp | null
- created_at: timestamp
- updated_at: timestamp

### Note
- id: UUID
- scrapboard_id: UUID
- type: enum(`typed`, `handwritten`)
- content: text | null
- image_url: string | null
- position_x: float
- position_y: float
- width: float
- height: float
- background_theme: enum(`yellow_sticky`,`pink_sticky`,`kraft_paper`,`postcard`,`blue_sticky`,`scrap`)
- z_order: integer
- deleted_at: timestamp | null
- created_at: timestamp
- updated_at: timestamp

### Image
- id: UUID
- scrapboard_id: UUID
- file_url: string
- mime_type: string
- storage_path: string
- position_x: float
- position_y: float
- width: float
- height: float
- rotation_degrees: float
- z_order: integer
- deleted_at: timestamp | null
- created_at: timestamp
- updated_at: timestamp

### Line
- id: UUID
- scrapboard_id: UUID
- from_element_id: UUID
- from_element_type: enum(`note`,`image`)
- to_element_id: UUID
- to_element_type: enum(`note`,`image`)
- style: enum(`solid`,`dashed`)
- color: string
- z_order: integer
- deleted_at: timestamp | null
- created_at: timestamp
- updated_at: timestamp

### SharedAccess
- id: UUID
- scrapboard_id: UUID
- share_token: string
- expires_at: timestamp | null
- created_at: timestamp

## Relationships

- User 1..* Scrapboards
- Scrapboard 1..* Notes
- Scrapboard 1..* Images
- Scrapboard 1..* Lines
- Scrapboard 0..1 SharedAccess

## Validation Rules

- User email must be unique and valid.
- Password must meet secure minimum criteria and be hashed.
- Scrapboard title required, description optional.
- Notes must have either typed content or handwritten image content.
- Handwritten notes use `image_url` and no raw text.
- Image files must be JPG, PNG, GIF, or WebP.
- Uploaded images must be validated and rejected if unsupported.
- Storage path metadata must exist for images stored in Supabase Storage.
- Position, size, and rotation values should remain within canvas bounds where possible.
- Deleted items remain soft-deleted for 30 days before hard deletion.

## State Transitions

- User: unverified -> verified after email activation.
- Scrapboard: private -> shared when share link is enabled.
- Note/Image/Line: active -> deleted (soft delete) -> purged after 30 days.
- SharedAccess: active -> revoked / expired.

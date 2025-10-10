---
description: Generate Supabase queries for the workshop_applications table
---

Help create Supabase database queries for the workshop_applications table.

The table schema:
- id (UUID, primary key)
- name (TEXT, required)
- furigana (TEXT, required)
- email (TEXT, required)
- phone (TEXT, required)
- school_name (TEXT)
- grade (TEXT, required)
- motivation (TEXT)
- status (TEXT: pending/confirmed/cancelled)
- created_at (TIMESTAMPTZ)
- updated_at (TIMESTAMPTZ)

Provide TypeScript code using the Supabase client from src/lib/supabase.ts.

Ask the user what query they need:
- Insert new application
- Get all applications
- Get applications by status
- Update application status
- Delete application
- Count applications by grade
- Export to CSV format

Generate type-safe queries with proper error handling.

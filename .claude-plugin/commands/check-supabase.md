---
description: Check Supabase connection and database status
---

Verify the Supabase integration is working correctly.

Check:
1. Environment variables are properly set in src/environments/environment.ts
2. Supabase client initialization in src/lib/supabase.ts
3. Test connection to the database
4. Verify workshop_applications table exists
5. Check Row Level Security (RLS) policies
6. Test INSERT permission (public access)
7. Verify SELECT requires authentication

Report:
- Connection status
- Table structure
- RLS policy status
- Any configuration issues
- Suggest fixes for problems found

Use the MCP Supabase server if available to query the database directly.

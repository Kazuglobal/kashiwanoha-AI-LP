---
description: Add a new field to the workshop application form
---

Add a new field to the application form component and update the Supabase schema.

This command will:
1. Ask what field to add (name, type, validation requirements)
2. Update the ApplicationFormComponent template (application-form.component.html)
3. Update the component TypeScript file with form controls
4. Add proper validation rules
5. Generate the Supabase migration SQL to add the column
6. Update the TypeScript types in application.service.ts

Field types supported:
- Text input
- Email input
- Phone input
- Textarea
- Select dropdown
- Checkbox
- Radio buttons
- Date picker

Include:
- Proper validation messages in Japanese
- Required/optional indicators
- Consistent styling with existing fields

---
description: Create a new Angular component with proper structure and imports
---

Create a new Angular component in the src/components directory following the project's Angular 20 structure.

Component requirements:
- Use standalone component architecture
- Include proper TypeScript types
- Add component to imports if needed
- Follow the existing component patterns in the project
- Include proper template and styles paths

Ask the user for:
1. Component name (e.g., "gallery", "schedule")
2. Whether it needs routing
3. Any specific dependencies or services needed

Generate the component with:
- .component.ts file with standalone configuration
- .component.html template file
- Proper imports (CommonModule, FormsModule if needed)
- Type-safe component class

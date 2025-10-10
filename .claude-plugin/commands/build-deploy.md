---
description: Build and check the Angular app for deployment
---

Run the Angular build process and check for errors before deployment.

Steps:
1. Run `npm run build` to create production build
2. Check for TypeScript errors
3. Verify build output in dist/ directory
4. Check bundle size and report if unusually large
5. Verify all environment variables are set correctly
6. Run any pre-deployment checks

If errors are found:
- List all errors clearly
- Suggest fixes for common issues
- Check for missing dependencies

After successful build:
- Report build size
- Show optimization suggestions if applicable
- Confirm deployment readiness

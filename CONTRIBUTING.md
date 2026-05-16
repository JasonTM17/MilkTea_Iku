# Contributing to MilkTea Iku

Thank you for your interest in contributing to MilkTea Iku! This document provides guidelines and information for contributors.

## Development Setup

1. Fork and clone the repository
2. Install dependencies: `npm install`
3. Set up the database: `npx prisma db push && npm run db:seed`
4. Start the dev server: `npm run dev`

## Code Style

- **TypeScript** — Strict mode enabled, no `any` types
- **Tailwind CSS** — Utility-first, use design tokens from `tailwind.config.ts`
- **Components** — Functional components with hooks, "use client" only when needed
- **Naming** — PascalCase for components, camelCase for functions/variables, kebab-case for files
- **Imports** — Use `@/` path alias for src/ imports

## Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new feature
fix: resolve bug
test: add or update tests
perf: performance improvement
docs: documentation changes
refactor: code refactoring
style: formatting changes
chore: maintenance tasks
```

## Pull Request Process

1. Create a feature branch from `main`
2. Make your changes with clear, atomic commits
3. Ensure TypeScript compiles: `npx tsc --noEmit`
4. Ensure linting passes: `npm run lint`
5. Add/update tests for new features
6. Update documentation if needed
7. Submit a PR with a clear description

## Testing

```bash
# Type check
npx tsc --noEmit

# Lint
npm run lint

# E2E tests
npx playwright test

# Specific test file
npx playwright test tests/e2e/homepage.spec.ts
```

## Project Structure

- `src/app/` — Pages and API routes (Next.js App Router)
- `src/components/` — Reusable UI components
- `src/hooks/` — Custom React hooks
- `src/lib/` — Utilities, validators, helpers
- `src/stores/` — Zustand state stores
- `tests/` — Playwright test suites
- `prisma/` — Database schema and seed data

## Reporting Issues

- Use GitHub Issues for bug reports and feature requests
- Include reproduction steps for bugs
- Provide screenshots for UI issues

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

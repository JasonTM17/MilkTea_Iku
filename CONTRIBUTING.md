<p align="center">
  <img src="public/logo-icon.svg" width="40" alt="MilkTea Iku"/>
</p>

<h1 align="center">Contributing to MilkTea Iku</h1>

<p align="center">
  <a href="https://github.com/JasonTM17/MilkTea_Iku/pulls">
    <img src="https://img.shields.io/badge/PRs-welcome-FF6B9D?style=for-the-badge" alt="PRs Welcome"/>
  </a>
  <a href="https://github.com/JasonTM17/MilkTea_Iku/issues">
    <img src="https://img.shields.io/badge/Issues-open-E8923A?style=for-the-badge" alt="Issues"/>
  </a>
</p>

<p align="center">
  Thank you for your interest in contributing! We welcome all kinds of contributions.
</p>

---

## Table of Contents

- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Code Style](#code-style)
- [Commit Convention](#commit-convention)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)
- [Reporting Bugs](#reporting-bugs)

---

## Development Setup

### Prerequisites

| Tool | Version |
|------|---------|
| Node.js | >= 18.0.0 |
| npm | >= 9.0.0 |
| Git | Latest |

### Steps

```bash
# 1. Fork and clone
git clone https://github.com/<your-username>/MilkTea_Iku.git
cd MilkTea_Iku

# 2. Install dependencies
npm ci --legacy-peer-deps

# 3. Set up environment
cp .env.example .env

# 4. Set up database
npx prisma generate
npx prisma db push
npm run db:seed

# 5. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to verify.

---

## Project Structure

```
src/
├── app/           # Next.js App Router (pages + API routes)
├── components/    # Reusable React components
├── lib/           # Utilities, validators, database client
└── store/         # Zustand state management
prisma/            # Database schema and seed data
tests/             # Playwright test suites
public/            # Static assets (SVG icons, manifest)
```

---

## Code Style

- **TypeScript** — Strict mode, no `any` unless absolutely necessary
- **Tailwind CSS** — Utility-first, use design tokens from `globals.css`
- **Components** — Functional components with named exports
- **Imports** — Use `@/` path alias for `src/` imports
- **Formatting** — 2-space indent, semicolons, double quotes for JSX

```tsx
// Good
import { prisma } from "@/lib/prisma";

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="rounded-xl bg-white p-4 shadow-sm dark:bg-gray-800">
      <h3 className="text-lg font-semibold">{product.name}</h3>
    </div>
  );
}
```

---

## Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | Usage |
|--------|-------|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `docs:` | Documentation only |
| `style:` | Formatting, no code change |
| `refactor:` | Code restructuring |
| `test:` | Adding or updating tests |
| `chore:` | Build, config, dependencies |
| `perf:` | Performance improvement |
| `ci:` | CI/CD changes |

**Examples:**
```
feat: add drink customization modal
fix: resolve cart total calculation error
docs: update API reference in README
test: add e2e tests for checkout flow
```

---

## Pull Request Process

1. Create a feature branch from `main`:
   ```bash
   git checkout -b feat/your-feature
   ```

2. Make your changes and commit following the convention above

3. Ensure all checks pass:
   ```bash
   npm run lint          # ESLint
   npx tsc --noEmit     # TypeScript
   npm run build        # Build check
   npx playwright test  # Tests (if applicable)
   ```

4. Push and create a PR:
   ```bash
   git push -u origin feat/your-feature
   ```

5. Fill out the PR template with:
   - Summary of changes
   - Screenshots (for UI changes)
   - Test plan

---

## Testing

```bash
# Run all tests
npx playwright test

# Run specific suite
npx playwright test tests/e2e/
npx playwright test tests/api/

# Run with UI mode
npx playwright test --ui

# Run with debug
npx playwright test --debug
```

When adding new features, please include:
- E2E tests for user-facing flows
- API tests for new endpoints
- Visual regression tests for UI changes

---

## Reporting Bugs

Use the [Bug Report template](https://github.com/JasonTM17/MilkTea_Iku/issues/new?template=bug_report.yml) and include:

- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Browser and device info
- Screenshots if applicable

---

<p align="center">
  <sub>Thank you for helping make MilkTea Iku better! ☕</sub>
</p>

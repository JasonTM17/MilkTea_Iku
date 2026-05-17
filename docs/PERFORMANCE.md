# Performance Tooling

## Bundle Analysis

Visualize what's in the production bundle using `@next/bundle-analyzer`.

```bash
npm run analyze
```

This builds the app with `ANALYZE=true` and opens interactive treemap reports in your browser — one for the client bundle and one for the server bundle. Use it to spot large dependencies and find opportunities to reduce bundle size.

## Lighthouse CI

Lighthouse audits run automatically on every pull request via `.github/workflows/lighthouse.yml`. The workflow:

- Builds the app and starts a local server
- Runs Lighthouse against `/` and `/menu`
- Uploads the full report as a GitHub Actions artifact (retained 30 days)
- Uses `continue-on-error: true` so PRs are never blocked — audits are informational

To run Lighthouse locally:

```bash
npm install -g @lhci/cli
npm run build && npm run start &
lhci autorun --collect.url=http://localhost:3000
```

## Key Metrics to Watch

| Metric | Target |
|--------|--------|
| First Contentful Paint | < 1.8s |
| Largest Contentful Paint | < 2.5s |
| Total Blocking Time | < 200ms |
| Cumulative Layout Shift | < 0.1 |
| Speed Index | < 3.4s |

## Existing Optimizations

- `next/image` with AVIF/WebP formats and explicit `deviceSizes`
- `optimizePackageImports` for `lucide-react` and `framer-motion`
- Security headers and `compress: true` in `next.config.mjs`
- Standalone output mode for Docker deployments

# Simpli Calendar

Lightweight Next.js app that visualizes year progress as a grid of day squares.

Quick start

1. Install dependencies (pnpm is recommended):

```bash
pnpm install
```

2. Run the dev server:

```bash
pnpm dev
```

3. Open http://localhost:3000 in your browser.

Demo
----

Live demo: [calendar.simpliprompt.com](https://calendar.simpliprompt.com)

Notes
- Main component: `app/page.tsx` → `YearSquares`.
- Shared types: `data/types.ts`. Helpers: `lib/utils.ts`.
- Lint: `pnpm lint` (Biome). Format: `pnpm format`.

Preparing to push
- Add a `.gitignore` (this repo includes one in the root) to exclude `node_modules/`, `.next/`, etc.
- Keep the lockfile (`pnpm-lock.yaml`) committed for reproducible installs.

This repo was bootstrapped with Next.js.
Testing & linting

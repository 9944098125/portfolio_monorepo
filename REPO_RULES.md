# Repository Rules: Portfolio Monorepo

## Overview

This document defines the strict repository rules and development workflows for this PNPM workspace monorepo. All contributors, automated tools, and AI agents must adhere to these rules.

---

## Core Rules

### 1. Commit Verification: Check All Projects in `apps/`

- **Rule**: Commits must verify **all projects located in `apps/`**, not just `frontend`.
- **Enforcement**:
  - The Git pre-commit hook (`.husky/pre-commit`) executes:
    1. `pnpm lint-staged`: Runs Prettier on staged files and staged linting (`pnpm --filter frontend exec eslint`).
    2. `pnpm check`: Runs full TypeScript type-checking across all projects inside `apps/*` (`pnpm -r --filter "./apps/*" check`).
  - If any project in `apps/` fails type-checking or linting, the commit is aborted.
  - Every application under `apps/` must maintain a `"check"` or `"checkTs"` script in its `package.json` (`tsc --noEmit`).

### 2. Build Verification: Check All Projects in `apps/`

- **Rule**: When building from the workspace root (`pnpm build` or `pnpm run build`), **all projects inside `apps/` must be checked and validated**, not only `frontend`.
- **Enforcement**:
  - Root `"build"` script is defined as:
    ```bash
    pnpm check && pnpm -r build
    ```
  - Before generating any build artifacts, `pnpm check` validates all projects in `apps/`. If any project has compile or type errors, the build halts immediately with an exit error code.
  - Every application in `apps/` must have a `"build"` script in its `package.json` (e.g., `"build": "tsc"` for backend, `"build": "react-scripts build"` for frontend).

### 3. Dev Workflow: Pre-transpile Backend Before Starting Projects

- **Rule**: Running `pnpm dev` or `pnpm run dev` from the repository root **must first transpile the existing backend code with `pnpm exec tsc` in backend**, and then start all available projects in parallel.
- **Enforcement**:
  - Root `"dev"` script is defined as:
    ```bash
    pnpm --filter backend exec tsc && pnpm -r --parallel dev
    ```
  - Backend TypeScript code in `apps/backend/src` is compiled to `apps/backend/dist` via `tsc` before the runtime services (`node dist/index.js` and frontend dev server) are launched.
  - This prevents stale code or runtime crashes caused by uncompiled TypeScript changes.

---

## Workspace Standards & Commands Reference

| Task                  | Command                          | Description                                                           |
| :-------------------- | :------------------------------- | :-------------------------------------------------------------------- |
| **Start Development** | `pnpm dev`                       | Transpiles backend TypeScript first, then starts all apps in parallel |
| **Check All Apps**    | `pnpm check`                     | Runs `tsc --noEmit` across all apps in `apps/*`                       |
| **Build All Apps**    | `pnpm build`                     | Checks all apps in `apps/*` first, then runs `build` in all packages  |
| **Pre-commit Hook**   | `pnpm lint-staged && pnpm check` | Formats staged files and verifies all apps in `apps/*` before commit  |
| **Format Code**       | `pnpm format`                    | Formats the entire monorepo using Prettier                            |

---

## Adding New Applications to `apps/`

When creating a new application under `apps/`:

1. It must define the following scripts in its `package.json`:
   - `"dev"`: Starts the application in development mode.
   - `"build"`: Compiles the application for production.
   - `"check"`: Type-checks the code (e.g. `"tsc --noEmit"`).
2. It will automatically be included in root-level `pnpm check`, `pnpm build`, and commit verifications.

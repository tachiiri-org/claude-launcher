# AGENTS.md

Project guidance for automated coding agents.

## Defaults

### TypeScript

- Use bun for package management.
- Use Prettier for formatting.
- Use ESLint for linting.
- Use Vitest for unit tests.
- Use tsc for type checking.
- Use Playwright for UI checks when UI changes.
- Use Cloudflare Pages for frontend.
- Use Cloudflare Workers for BFF, gateway, and adapter.

### Python

- Use uv for package management.
- Use ruff for formatting and linting.
- Use pyright for type checking.
- Use pytest for testing.

### Common

- Prefer delegation workflows (plan first, then implement).

## Global Constraints

- Respect architectural boundaries strictly.
- Keep changes minimal and localized.
- Do not create multi-responsibility or god files.
- Do not merge files based on size or convenience.
- Do not use `any` except at explicit external boundaries.
- Do not add destructive git operations to `settings.local.json` allow lists.

## Git / Release

- Do not deploy to production with Wrangler; use `bun run deploy:dev` for staging only.
- Deploy only via merge to main.
- Do not push directly to main.
- Use pull requests for all merges.
- Do not create commits if the repository has no committed `.gitignore`.

## Frontend Discipline

- Frontend is presentation only.
- No business logic in UI.
- Use composition patterns only.
- Explicitly model loading and error states.
- Keep components stateless by default.
- Interact with domain only via BFF contracts.
- Accessibility is mandatory.
- Lazy-load non-critical UI.
- Wrap app routes with an ErrorBoundary.
- Avoid global state unless strictly necessary.

## Merge Semantics

- Do not invent merge behavior.
- Deep-merge objects.
- Concatenate arrays.
- Replace scalar values.

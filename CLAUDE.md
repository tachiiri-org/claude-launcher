# CLAUDE.md

This document defines Claude's behavioral constraints in this repository.

## Formatting Rules

- Use short imperative bullet points only.
- Do not include explanations.
- Do not introduce exceptions unless explicitly instructed.

## Tools Default

- Use bun for package management.
- Use Prettier for formatting.
- Use ESLint for linting.
- Use Vitest for testing.
- Use tsc for type checking.
- Use Playwright to check UI.
- Use Codex via MCP for implementation.
- Use Serena via MCP to read and locate code.
- Use GitHub for version control.
- Use Cloudflare Pages for frontend.
- Use Cloudflare Workers for bff, gateway, and adapter.

## Behavioral Constraints

- Respect architectural boundaries strictly.
- Write tests before implementation.
- Don't merge files based on size or convenience.
- Don't create multi-responsibility or god files.
- Don't deploy with Wrangler.
- Don't commit with no .gitigonore in repository
- Setup tools if default tools not installed
- Deploy only via merge to main.
- Do not push directly to main.
- Use pull requests for all changes to merge.
- Prioritize loose coupling, scalability, and AI-readable structure.
- Delegate implementation to Codex after planning.
- Do not use `any` except at explicit external boundaries.
- Do not add destructive git operations to settings.local.json allow list.

## Frontend

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
- Merge objects recursively (deep merge).
- Concatenate arrays.
- Replace scalar values.

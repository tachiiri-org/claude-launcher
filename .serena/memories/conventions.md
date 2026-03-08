# Code Style & Conventions

## Language
- TypeScript 5, strict mode
- No `any` except at explicit external boundaries

## Formatting
- Prettier (default config)
- ESLint

## File Structure
- Main process modules are single-responsibility files in `src/main/`
- Renderer components are stateless React functional components
- Shared types live only in `src/shared/types.ts`

## Patterns
- No business logic in renderer (UI = presentation only)
- IPC via contextBridge only (no direct Node APIs in renderer)
- Platform detection via `src/main/platform.ts`

## Naming
- camelCase for functions/variables
- PascalCase for React components and interfaces
- kebab-case for filenames

## Tests
- Write tests before implementation
- Unit tests in `src/main/__tests__/` (Vitest)
- UI tests via Playwright

# Suggested Commands

## Dev
```
bun run dev           # electron-vite dev (hot reload)
bun run build         # electron-vite build
bun run build:win     # build + electron-builder --win
bun run preview       # electron-vite preview
bun run setup         # bash scripts/setup-linux.sh
```

## Test
```
bunx vitest           # unit tests (Vitest)
bunx vitest run       # single run
bunx playwright test  # UI tests (Playwright)
```

## Type Check / Lint / Format
```
bunx tsc --noEmit               # type check
bunx eslint src                 # lint
bunx prettier --write src       # format
```

## Git
```
git status
git log --oneline -10
```

# claude-launcher Overview

## Purpose
Electron desktop app ("Claude Workspace Launcher") that lets the user select project directories and launch Claude Code sessions in them. Supports Linux, WSL2, and Windows targets.

## Role Classification
**Desktop app (Electron)** — not a frontend web app, BFF, gateway, or adapter.

## Tech Stack
- Electron 34 + electron-vite + electron-builder
- React 18 + TailwindCSS (renderer process)
- TypeScript 5
- Vitest (unit tests), Playwright (UI tests)
- ESLint, Prettier
- Bun (package manager)
- No server-side component; all logic runs in the Electron main process

## Key Directories
- `src/main/` — Electron main process (bootstrap, config, launcher, IPC, platform detection)
- `src/renderer/src/` — React UI (App.tsx + components)
- `src/preload/` — contextBridge API surface
- `src/shared/types.ts` — shared TypeScript types (Config interface)
- `build/` — Electron builder resources
- `scripts/` — setup scripts
- `.claude/` — Claude Code commands and settings

## Core Domain Types
```ts
interface Config {
  exclude: string[]
  lastSelection: string[]
  presets: Record<string, string[]>
  groups: Record<string, string[]>
  wslDistro: string
  wslRoot: string
}
```

## IPC Surface (preload → main)
- `config:get` / `config:save`
- `dirs:scan`
- `launch` (dirs[], command)
- `open:vscode` / `open:explorer`

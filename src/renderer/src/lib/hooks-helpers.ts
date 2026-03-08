import type { LaunchEntry } from '@shared/types'

export function computeInitialSelection(scannedDirs: string[], lastSelection: string[]): Set<string> {
  return new Set(lastSelection.filter((d) => scannedDirs.includes(d)))
}

export function pruneSelection(current: Set<string>, newDirs: string[]): Set<string> {
  const allowed = new Set(newDirs)
  return new Set([...current].filter((d) => allowed.has(d)))
}

export function buildEntries(
  selected: Set<string>,
  dirCommands: Record<string, string>,
  defaultCommand: string,
): LaunchEntry[] {
  return [...selected].map((dir) => ({ dir, command: dirCommands[dir] || defaultCommand }))
}


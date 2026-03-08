export interface GroupedDirs {
  ungrouped: string[]
  groups: Record<string, string[]>
}

export function groupDirs(dirs: string[], groups: Record<string, string[]>): GroupedDirs {
  const groupedSet = new Set<string>()
  for (const arr of Object.values(groups)) arr.forEach((d) => groupedSet.add(d))
  const ungrouped = dirs.filter((d) => !groupedSet.has(d))
  return { ungrouped, groups }
}


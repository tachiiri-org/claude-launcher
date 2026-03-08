import { useState } from 'react'

export function useDirSelection() {
  const [selected, setSelected] = useState<Set<string>>(new Set())

  function toggleDir(dir: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(dir)) next.delete(dir)
      else next.add(dir)
      return next
    })
  }

  function setInitialSelection(dirs: string[], lastSelection: string[]) {
    const initial = lastSelection.filter((d) => dirs.includes(d))
    setSelected(new Set(initial))
  }

  function pruneToDirs(dirs: string[]) {
    setSelected((prev) => new Set([...prev].filter((d) => dirs.includes(d))))
  }

  function setFromPreset(dirs: string[]) {
    setSelected(new Set(dirs))
  }

  return { selected, toggleDir, setInitialSelection, pruneToDirs, setFromPreset }
}


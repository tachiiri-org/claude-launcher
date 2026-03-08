import { useState } from 'react'
import type { Config, LaunchEntry } from '@shared/types'
import { DEFAULT_LAUNCH_COMMAND } from '@shared/constants'

export function useLaunch(saveConfig: (cfg: Config) => Promise<void>) {
  const [launching, setLaunching] = useState(false)

  async function launch(config: Config | null, selected: Set<string>) {
    if (!config || selected.size === 0) return
    setLaunching(true)
    try {
      const selectedDirs = [...selected]
      await saveConfig({ ...config, lastSelection: selectedDirs })
      const entries: LaunchEntry[] = selectedDirs.map((dir) => ({
        dir,
        command: config.dirCommands[dir] || DEFAULT_LAUNCH_COMMAND,
      }))
      await window.api.launch({ entries })
    } finally {
      setLaunching(false)
    }
  }

  return { launching, launch }
}


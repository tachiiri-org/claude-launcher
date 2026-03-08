import { useState, useEffect, useCallback } from 'react'
import type { Config } from '@shared/types'

export function useConfig() {
  const [config, setConfig] = useState<Config | null>(null)
  const [dirs, setDirs] = useState<string[]>([])

  useEffect(() => {
    let mounted = true
    async function init() {
      const [cfg, scanned] = await Promise.all([
        window.api.config.get(),
        window.api.dirs.scan(),
      ])
      if (!mounted) return
      setConfig({ ...cfg, dirCommands: cfg.dirCommands || {} })
      setDirs(scanned)
    }
    init()
    return () => {
      mounted = false
    }
  }, [])

  const persist = useCallback(async (next: Config) => {
    setConfig(next)
    await window.api.config.save(next)
  }, [])

  const updateConfig = useCallback(async (updates: Partial<Config>) => {
    if (!config) return { newDirs: undefined as string[] | undefined }
    const next = { ...config, ...updates }
    await persist(next)
    if (updates.exclude !== undefined) {
      const newDirs = await window.api.dirs.scan()
      setDirs(newDirs)
      return { newDirs }
    }
    return { newDirs: undefined as string[] | undefined }
  }, [config, persist])

  return { config, dirs, setConfig: persist, updateConfig }
}


import type { Config, LaunchEntry } from '@shared/types'

export {}

declare global {
  interface Window {
    api: {
      config: {
        get: () => Promise<Config>
        save: (cfg: Config) => Promise<void>
      }
      dirs: {
        scan: () => Promise<string[]>
      }
      launch: (payload: { entries: LaunchEntry[] }) => Promise<void>
      open: {
        vscode: (dir: string) => Promise<void>
        explorer: (dir: string) => Promise<void>
      }
    }
  }
}

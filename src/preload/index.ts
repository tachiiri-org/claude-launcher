import { contextBridge, ipcRenderer } from 'electron'
import type { Config, LaunchEntry } from '@shared/types'

contextBridge.exposeInMainWorld('api', {
  config: {
    get: (): Promise<Config> => ipcRenderer.invoke('config:get'),
    save: (cfg: Config): Promise<void> => ipcRenderer.invoke('config:save', cfg),
  },
  dirs: {
    scan: (): Promise<string[]> => ipcRenderer.invoke('dirs:scan'),
  },
  launch: (payload: { entries: LaunchEntry[] }): Promise<void> => ipcRenderer.invoke('launch', payload),
  open: {
    vscode: (dir: string): Promise<void> => ipcRenderer.invoke('open:vscode', dir),
    explorer: (dir: string): Promise<void> => ipcRenderer.invoke('open:explorer', dir),
  },
})

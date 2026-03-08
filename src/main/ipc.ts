import { ipcMain } from 'electron'
import { getConfig, saveConfig } from './config'
import { scanDirs } from './dirs'
import { launcher } from './launcher'
import type { Config, LaunchEntry } from '@shared/types'
import { spawn } from 'child_process'
import { isWsl2 } from './platform'

export function registerIpcHandlers(): void {
  ipcMain.handle('config:get', () => getConfig())
  ipcMain.handle('config:save', (_event, cfg: Config) => saveConfig(cfg))
  ipcMain.handle('dirs:scan', () => scanDirs())
  ipcMain.handle('launch', (_event, payload: { entries: LaunchEntry[] }) => {
    const { entries } = payload
    return launcher(entries, getConfig())
  })

  ipcMain.handle('open:vscode', (_event, dir: string) => {
    const cfg = getConfig()
    const wslRoot = (cfg.wslRoot || '~/project').replace(/^~(?=\/|$)/, '$HOME')
    const fullPath = `${wslRoot}/${dir}`
    // Use bash -lc so $HOME expands properly
    spawn('bash', ['-lc', `code "${fullPath}"`], { detached: true, stdio: 'ignore' }).unref()
  })

  ipcMain.handle('open:explorer', (_event, dir: string) => {
    const cfg = getConfig()
    const wslRoot = (cfg.wslRoot || '~/project').replace(/^~(?=\/|$)/, '$HOME')
    const fullPath = `${wslRoot}/${dir}`
    if (isWsl2()) {
      // Open Windows File Explorer for the WSL path
      spawn('bash', ['-lc', `explorer.exe $(wslpath -w "${fullPath}")`], { detached: true, stdio: 'ignore' }).unref()
    } else {
      spawn('bash', ['-lc', `xdg-open "${fullPath}"`], { detached: true, stdio: 'ignore' }).unref()
    }
  })
}

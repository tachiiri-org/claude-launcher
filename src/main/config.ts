import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import path from 'path'
import { app } from 'electron'
import type { Config } from '@shared/types'

const CONFIG_PATH = path.join(app.getPath('userData'), 'config.json')

const DEFAULT_CONFIG: Config = {
  exclude: ['.git', '.claude', 'node_modules'],
  lastSelection: [],
  presets: {},
  groups: {},
  wslDistro: 'Ubuntu',
  wslRoot: '~/project',
  dirCommands: {},
}

export function getConfig(): Config {
  try {
    const raw = readFileSync(CONFIG_PATH, 'utf-8')
    const parsed = JSON.parse(raw) as Partial<Config>
    return { ...DEFAULT_CONFIG, ...parsed }
  } catch {
    return { ...DEFAULT_CONFIG }
  }
}

export function saveConfig(cfg: Config): void {
  mkdirSync(path.dirname(CONFIG_PATH), { recursive: true })
  writeFileSync(CONFIG_PATH, JSON.stringify(cfg, null, 2), 'utf-8')
}

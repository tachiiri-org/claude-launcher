import { readdirSync, statSync } from 'fs'
import { join } from 'path'
import os from 'os'
import path from 'path'
import { execSync } from 'child_process'
import { getConfig } from './config'

function resolveWindowsPath(distro: string, wslRoot: string): string {
  const raw = execSync(
    `wsl -d "${distro}" bash -c "wslpath -w ${wslRoot}"`,
    { encoding: 'utf-8', timeout: 8000, shell: true },
  ).trim()
  if (!raw) throw new Error('wslpath returned empty string')
  return raw
}

function resolvePosixPath(wslRoot: string): string {
  const expanded = wslRoot.startsWith('~')
    ? path.join(os.homedir(), wslRoot.slice(1))
    : wslRoot
  return path.resolve(expanded)
}

export function scanDirs(): string[] {
  const config = getConfig()
  const excluded = new Set(config.exclude)

  let workDir: string
  try {
    workDir =
      process.platform === 'linux'
        ? resolvePosixPath(config.wslRoot || '~/project')
        : resolveWindowsPath(config.wslDistro || 'Ubuntu', config.wslRoot || '~/project')
  } catch {
    return []
  }

  try {
    const entries = readdirSync(workDir)
    return entries
      .filter((name) => {
        if (excluded.has(name)) return false
        try {
          return statSync(join(workDir, name)).isDirectory()
        } catch {
          return false
        }
      })
      .sort()
  } catch {
    return []
  }
}

import type { Config, LaunchEntry } from '@shared/types'
import { isWsl2 } from './platform'
import { launchWsl2 } from './launch-wsl2'
import { launchLinux } from './launch-linux'
import { launchWindows } from './launch-windows'

export type Launcher = (entries: LaunchEntry[], config: Config) => void

export function launcher(entries: LaunchEntry[], config: Config): void {
  if (isWsl2()) return launchWsl2(entries, config)
  if (process.platform === 'linux') return launchLinux(entries, config)
  launchWindows(entries, config)
}

import { spawn, spawnSync } from 'child_process'
import type { Config, LaunchEntry } from '@shared/types'
import { buildWslWorkspaceCmd, PipelineMode } from './bash-cmd'

function isAvailable(cmd: string): boolean {
  const result = spawnSync('which', [cmd], { encoding: 'utf-8' })
  return result.status === 0
}

export function launchLinux(entries: LaunchEntry[], config: Config): void {
  const wslRoot = (config.wslRoot || '~/project').replace(/^~(?=\/|$)/, '$HOME')

  for (const { dir, command } of entries) {
    const wslDir = `${wslRoot}/${dir}`
    const mode: PipelineMode = /\/(pr|commit)"?$/.test(command) ? 'quick' : 'full'
    const bashCmd = buildWslWorkspaceCmd(wslDir, command, { mode, opsCopyFiles: config.opsCopyFiles ?? [] })

    if (isAvailable('gnome-terminal')) {
      spawn('gnome-terminal', ['--title', dir, '--', 'bash', '-lic', bashCmd], {
        detached: true,
        stdio: 'ignore',
      }).unref()
    } else if (isAvailable('xfce4-terminal')) {
      spawn('xfce4-terminal', ['--title', dir, '-e', `bash -lic "${bashCmd}"`], {
        detached: true,
        stdio: 'ignore',
      }).unref()
    } else {
      spawn('xterm', ['-title', dir, '-e', `bash -lic "${bashCmd}"`], {
        detached: true,
        stdio: 'ignore',
      }).unref()
    }
  }
}

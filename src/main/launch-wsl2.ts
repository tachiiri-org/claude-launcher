import { spawn } from 'child_process'
import type { Config, LaunchEntry } from '@shared/types'
import { buildWslWorkspaceCmd, PipelineMode } from './bash-cmd'

export function buildWtArgs(entries: LaunchEntry[], config: Config): string[] {
  const wslRoot = (config.wslRoot || '~/project').replace(/^~(?=\/|$)/, '$HOME')
  const distro = config.wslDistro || 'Ubuntu'
  const args: string[] = []

  for (let i = 0; i < entries.length; i++) {
    if (i > 0) args.push(';')
    const { dir, command } = entries[i]
    const wslDir = `${wslRoot}/${dir}`
    const mode: PipelineMode = /\/(pr|commit)"?$/.test(command) ? 'quick' : 'full'
    const bashCmd = buildWslWorkspaceCmd(wslDir, command, { mode, opsCopyFiles: config.opsCopyFiles ?? [] })
    args.push('new-tab', '--title', dir, '--profile', distro, '--', 'wsl', '-d', distro, 'bash', '-lic', bashCmd)
  }

  return args
}

export function launchWsl2(entries: LaunchEntry[], config: Config): void {
  const args = buildWtArgs(entries, config)
  const proc = spawn('wt.exe', args, { detached: true, stdio: 'ignore' })
  proc.unref()
}

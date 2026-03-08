import { spawn } from 'child_process'
import type { Config, LaunchEntry } from '@shared/types'
import { buildWtArgs } from './launch-wsl2'

/**
 * Launch Windows Terminal with one tab per directory.
 * Each arg is passed individually to wt.exe (no shell: true),
 * so `;` is transmitted literally as wt's subcommand separator
 * without being re-interpreted by cmd.exe.
 */
export function launchWindows(entries: LaunchEntry[], config: Config): void {
  const args = buildWtArgs(entries, config)
  const proc = spawn('wt', args, { detached: true, stdio: 'ignore' })
  proc.unref()
}

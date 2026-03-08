import { spawn, execSync } from 'child_process'
import path from 'path'
import { app } from 'electron'

export function runAppBootstrap(): void {
  try {
    if (app.isPackaged) return

    const repoPath = app.getAppPath()
    const scriptPath = path.join(repoPath, '.claude', 'scripts', 'bootstrap.sh')

    if (process.platform === 'win32') {
      const wslScript = execSync(`wsl wslpath -u "${scriptPath}"`).toString().trim()
      const wslRepo = execSync(`wsl wslpath -u "${repoPath}"`).toString().trim()
      const proc = spawn('wsl', ['bash', wslScript, wslRepo], { detached: true, stdio: 'ignore' })
      proc.unref()
    } else {
      const proc = spawn('bash', [scriptPath, repoPath], { detached: true, stdio: 'ignore' })
      proc.unref()
    }
  } catch (err) {
    console.error('[bootstrap]', err)
  }
}

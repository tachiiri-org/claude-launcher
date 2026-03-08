import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('electron', () => ({
  app: {
    isPackaged: false,
    getAppPath: () => '/home/user/project/claude-launcher',
    getPath: () => '/home/user/.config/claude-launcher',
  },
}))

vi.mock('child_process', () => ({
  spawn: vi.fn(() => ({ unref: vi.fn() })),
  execSync: vi.fn(() => Buffer.from('/home/user/project/claude-launcher\n')),
}))

describe('runAppBootstrap', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('does not run when app.isPackaged is true', async () => {
    const { app } = await import('electron')
    const { spawn } = await import('child_process')
    ;(app as any).isPackaged = true

    const { runAppBootstrap } = await import('../bootstrap')
    runAppBootstrap()

    expect(spawn).not.toHaveBeenCalled()

    ;(app as any).isPackaged = false
  })

  it('spawns bash on linux', async () => {
    const originalPlatform = process.platform
    Object.defineProperty(process, 'platform', { value: 'linux', configurable: true })

    const { runAppBootstrap } = await import('../bootstrap')
    const { spawn } = await import('child_process')
    runAppBootstrap()

    expect(spawn).toHaveBeenCalledWith(
      'bash',
      expect.arrayContaining([expect.stringContaining('bootstrap.sh')]),
      expect.objectContaining({ detached: true, stdio: 'ignore' }),
    )

    Object.defineProperty(process, 'platform', { value: originalPlatform, configurable: true })
  })

  it('spawns wsl on win32', async () => {
    const originalPlatform = process.platform
    Object.defineProperty(process, 'platform', { value: 'win32', configurable: true })

    const { runAppBootstrap } = await import('../bootstrap')
    const { spawn } = await import('child_process')
    runAppBootstrap()

    expect(spawn).toHaveBeenCalledWith(
      'wsl',
      expect.arrayContaining(['bash']),
      expect.objectContaining({ detached: true, stdio: 'ignore' }),
    )

    Object.defineProperty(process, 'platform', { value: originalPlatform, configurable: true })
  })
})

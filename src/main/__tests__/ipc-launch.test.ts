import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('electron', () => ({
  ipcMain: {
    handle: vi.fn(),
  },
}))

vi.mock('../config', () => ({
  getConfig: vi.fn(() => ({ wslRoot: '~/project', wslDistro: 'Ubuntu', exclude: [], lastSelection: [], presets: {}, groups: {}, dirCommands: {} })),
  saveConfig: vi.fn(),
}))

describe('ipc launch handler (per-entry)', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('registers launch handler that forwards entries to launcher', async () => {
    const launcherMock = vi.fn()
    vi.doMock('../launcher', () => ({ launcher: launcherMock }))

    const { registerIpcHandlers } = await import('../ipc')
    const { ipcMain } = await import('electron')

    registerIpcHandlers()

    // Find the registered handler for 'launch'
    const calls = vi.mocked(ipcMain.handle).mock.calls
    const launchCall = calls.find((c) => c[0] === 'launch')
    expect(launchCall).toBeTruthy()
    const handler = launchCall![1] as (event: unknown, payload: unknown) => unknown

    const entries = [
      { dir: 'a', command: 'claude "/onboarding"' },
      { dir: 'b', command: 'claude "/pr"' },
    ]
    await handler({}, { entries } as unknown as { entries: Array<{ dir: string; command: string }> })

    expect(launcherMock).toHaveBeenCalledWith(entries, expect.objectContaining({ wslRoot: '~/project' }))
  })
})

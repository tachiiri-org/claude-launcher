import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('child_process', () => ({
  spawn: vi.fn(() => ({ unref: vi.fn() })),
  spawnSync: vi.fn(() => ({ status: 1 })),
}))

describe('launchLinux on native Linux (per-entry)', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('falls back to xterm when no known terminal is available', async () => {
    const spawnMock = vi.fn(() => ({ unref: vi.fn() }))
    const { spawn, spawnSync } = await import('child_process')
    vi.mocked(spawnSync).mockReturnValue({ status: 1 } as ReturnType<typeof spawnSync>)
    vi.mocked(spawn).mockImplementation(spawnMock)

    const { launchLinux } = await import('../launch-linux')
    launchLinux([
      { dir: 'my-repo', command: 'claude "/onboarding"' },
      { dir: 'another', command: 'claude "/commit"' },
    ], { wslRoot: '~/project', wslDistro: 'Ubuntu', exclude: [], lastSelection: [], presets: {}, groups: {}, dirCommands: {} } as any)

    expect(spawnMock).toHaveBeenCalledWith(
      'xterm',
      expect.any(Array),
      expect.objectContaining({ detached: true, stdio: 'ignore' }),
    )
    // Ensure both commands were attempted
    const calls = spawnMock.mock.calls.filter((c) => c[0] === 'xterm')
    const argStr = calls.map((c) => (c[1] as string[]).join(' ')).join(' ')
    expect(argStr).toContain('claude "/onboarding"')
    expect(argStr).toContain('claude "/commit"')
  })
})

import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('child_process', () => ({
  spawn: vi.fn(() => ({ unref: vi.fn() })),
}))

vi.mock('../platform', () => ({
  isWsl2: vi.fn(() => true),
}))

describe('launchWsl2 (per-entry)', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('spawns wt.exe when isWsl2() returns true', async () => {
    vi.doMock('../platform', () => ({ isWsl2: vi.fn(() => true) }))
    const spawnMock = vi.fn(() => ({ unref: vi.fn() }))
    vi.doMock('child_process', () => ({ spawn: spawnMock }))

    const { launchWsl2 } = await import('../launch-wsl2')
    launchWsl2([
      { dir: 'my-repo', command: 'claude "/onboarding"' },
    ], { wslRoot: '~/project', wslDistro: 'Ubuntu', exclude: [], lastSelection: [], presets: {}, groups: {}, dirCommands: {} } as any)

    expect(spawnMock).toHaveBeenCalledWith(
      'wt.exe',
      expect.any(Array),
      expect.objectContaining({ detached: true, stdio: 'ignore' }),
    )
  })

  it('includes tab args for each entry with its command', async () => {
    const { buildWtArgs } = await import('../launch-wsl2')
    const args = buildWtArgs([
      { dir: 'repo-a', command: 'claude "/onboarding"' },
      { dir: 'repo-b', command: 'claude "/pr"' },
    ], { wslRoot: '~/project', wslDistro: 'Ubuntu', exclude: [], lastSelection: [], presets: {}, groups: {}, dirCommands: {} } as any)

    expect(args).toContain('new-tab')
    expect(args).toContain(';')
    expect(args).toContain('repo-a')
    expect(args).toContain('repo-b')
    const joined = args.join(' ')
    expect(joined).toContain('claude "/onboarding"')
    expect(joined).toContain('claude "/pr"')
  })
})

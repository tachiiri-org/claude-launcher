import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('electron', () => ({
  app: {
    getPath: () => '/home/user/.config/claude-launcher',
  },
}))

describe('DEFAULT_CONFIG includes dirCommands', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('getConfig() returns dirCommands default', async () => {
    const { getConfig } = await import('../config')
    const cfg = getConfig()
    expect(cfg).toHaveProperty('dirCommands')
    expect(cfg.dirCommands).toBeTypeOf('object')
  })
})

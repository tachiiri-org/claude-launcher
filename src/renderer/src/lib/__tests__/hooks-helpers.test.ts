import { describe, it, expect } from 'vitest'
import { computeInitialSelection, pruneSelection, buildEntries } from '../hooks-helpers'
import { DEFAULT_LAUNCH_COMMAND } from '../../../../shared/constants'

describe('hooks helpers', () => {
  it('computeInitialSelection filters to scanned dirs', () => {
    const sel = computeInitialSelection(['a', 'b'], ['b', 'c'])
    expect([...sel]).toEqual(['b'])
  })

  it('pruneSelection drops dirs not present', () => {
    const pruned = pruneSelection(new Set(['a', 'b', 'c']), ['a', 'c'])
    expect([...pruned].sort()).toEqual(['a', 'c'])
  })

  it('buildEntries uses dir-specific or default command', () => {
    const entries = buildEntries(new Set(['a', 'b']), { a: 'claude "/pr"' }, DEFAULT_LAUNCH_COMMAND)
    expect(entries).toEqual([
      { dir: 'a', command: 'claude "/pr"' },
      { dir: 'b', command: DEFAULT_LAUNCH_COMMAND },
    ])
  })
})

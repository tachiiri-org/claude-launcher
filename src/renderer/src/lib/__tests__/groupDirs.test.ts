import { describe, it, expect } from 'vitest'
import { groupDirs } from '../groupDirs'

describe('groupDirs', () => {
  it('returns ungrouped dirs and preserves groups', () => {
    const dirs = ['a', 'b', 'c', 'd']
    const groups = { Team: ['a', 'z'], Tools: ['c'] }
    const result = groupDirs(dirs, groups)
    expect(result.ungrouped.sort()).toEqual(['b', 'd'])
    expect(result.groups).toBe(groups)
  })
})


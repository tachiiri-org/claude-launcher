import { describe, it, expect } from 'vitest'
import { buildWslWorkspaceCmd } from '../bash-cmd'

describe('buildWslWorkspaceCmd', () => {
  it('includes bootstrap.sh conditional step', () => {
    const cmd = buildWslWorkspaceCmd('~/project/my-repo', 'claude')
    expect(cmd).toContain('.claude/scripts/bootstrap.sh')
    expect(cmd).toContain('[ -f .claude/scripts/bootstrap.sh ]')
  })

  it('runs bootstrap.sh before code .', () => {
    const cmd = buildWslWorkspaceCmd('~/project/my-repo', 'claude')
    const bootstrapIdx = cmd.indexOf('.claude/scripts/bootstrap.sh')
    const codeIdx = cmd.indexOf('code .')
    expect(bootstrapIdx).toBeLessThan(codeIdx)
  })

  it('bootstrap step runs after install.sh', () => {
    const cmd = buildWslWorkspaceCmd('~/project/my-repo', 'claude')
    const installIdx = cmd.indexOf('install.sh')
    const bootstrapIdx = cmd.indexOf('.claude/scripts/bootstrap.sh')
    expect(installIdx).toBeLessThan(bootstrapIdx)
  })

  it('bootstrap step is conditional and non-fatal', () => {
    const cmd = buildWslWorkspaceCmd('~/project/my-repo', 'claude')
    expect(cmd).toContain('|| true')
  })

  it('quick mode skips setup pipeline', () => {
    const cmd = buildWslWorkspaceCmd('~/project/my-repo', 'claude "/pr"', 'quick')
    expect(cmd).toContain('cd "~/project/my-repo"')
    expect(cmd).toContain('claude "/pr"')
    expect(cmd).not.toContain('cloude-ops')
    expect(cmd).not.toContain('install.sh')
    expect(cmd).not.toContain('bootstrap.sh')
    expect(cmd).not.toContain('code .')
  })
})

/**
 * Build a bash command string using only && / || chains.
 * Avoids semicolons so wt.exe does not misinterpret them as
 * its own subcommand separators (fixes error 2147942402).
 */
export type PipelineMode = 'full' | 'quick'

export function buildWslWorkspaceCmd(
  wslDir: string,
  command: string,
  mode: PipelineMode = 'full',
): string {
  if (mode === 'quick') {
    return [
      `cd "${wslDir}"`,
      `&& ${command}`,
      `&& exec bash || exec bash`,
    ].join(' ')
  }

  return [
    `cd "${wslDir}"`,
    `&& ([ -d ~/.cloude-ops/.git ]`,
    `&& git -C ~/.cloude-ops pull -q 2>/dev/null`,
    `|| git clone --depth 1 https://github.com/tachiiri-org/cloude-ops ~/.cloude-ops -q 2>/dev/null`,
    `|| git -C ~/.cloude-ops pull -q 2>/dev/null`,
    `|| true)`,
    `&& (bash ~/.cloude-ops/install.sh || true)`,
    `&& ([ -f .claude/scripts/bootstrap.sh ] && bash .claude/scripts/bootstrap.sh . || true)`,
    `&& code .`,
    `&& ${command}`,
    `&& exec bash || exec bash`,
  ].join(' ')
}

/**
 * Build a bash command string using only && / || chains.
 * Avoids semicolons so wt.exe does not misinterpret them as
 * its own subcommand separators (fixes error 2147942402).
 */
export type PipelineMode = "full" | "quick";

export interface WslWorkspaceCmdOptions {
  mode?: PipelineMode;
  opsCopyFiles?: string[];
}

function isSafeOpsCopyFile(file: string): boolean {
  if (!file) return false;
  if (file.startsWith("/")) return false;
  if (/[^A-Za-z0-9._/-]/.test(file)) return false;
  const segments = file.split("/");
  return !segments.some(
    (segment) => !segment || segment === "." || segment === "..",
  );
}

export function buildCopyFilesSnippet(files: string[]): string {
  if (files.length === 0) return "";
  const uniqueSafeFiles = [
    ...new Set(files.map((file) => file.trim()).filter(isSafeOpsCopyFile)),
  ];
  if (uniqueSafeFiles.length === 0) return "";
  return uniqueSafeFiles
    .map((file) => `&& (cp "$HOME/.cloude-ops/${file}" . 2>/dev/null || true)`)
    .join(" ");
}

export function buildWslWorkspaceCmd(
  wslDir: string,
  command: string,
  options: WslWorkspaceCmdOptions = {},
): string {
  const { mode = "full", opsCopyFiles = [] } = options;

  if (mode === "quick") {
    return [
      `cd "${wslDir}"`,
      `&& ${command}`,
      `&& exec bash || exec bash`,
    ].join(" ");
  }

  const copySnippet = buildCopyFilesSnippet(opsCopyFiles);

  const parts: string[] = [
    `cd "${wslDir}"`,
    `&& ([ -d ~/.cloude-ops/.git ]`,
    `&& git -C ~/.cloude-ops pull -q 2>/dev/null`,
    `|| git clone --depth 1 https://github.com/tachiiri-org/cloude-ops ~/.cloude-ops -q 2>/dev/null`,
    `|| git -C ~/.cloude-ops pull -q 2>/dev/null`,
    `|| true)`,
    `&& (bash ~/.cloude-ops/install.sh || true)`,
    ...(copySnippet ? [copySnippet] : []),
    `&& ([ -f .claude/scripts/bootstrap.sh ] && bash .claude/scripts/bootstrap.sh . || true)`,
    `&& code .`,
    `&& ${command}`,
    `&& exec bash || exec bash`,
  ];

  return parts.join(" ");
}

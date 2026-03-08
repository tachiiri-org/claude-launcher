import { describe, it, expect } from "vitest";
import { buildWslWorkspaceCmd, buildCopyFilesSnippet } from "../bash-cmd";

describe("buildCopyFilesSnippet", () => {
  it("returns empty string for empty array", () => {
    expect(buildCopyFilesSnippet([])).toBe("");
  });

  it("generates one cp per file prefixed with $HOME/.cloude-ops/", () => {
    const snippet = buildCopyFilesSnippet(["CLAUDE.md", "principles.md"]);
    expect(snippet).toContain('cp "$HOME/.cloude-ops/CLAUDE.md" .');
    expect(snippet).toContain('cp "$HOME/.cloude-ops/principles.md" .');
  });

  it("each cp is non-fatal (|| true) with stderr redirect (2>/dev/null)", () => {
    const snippet = buildCopyFilesSnippet(["CLAUDE.md"]);
    expect(snippet).toContain("2>/dev/null");
    expect(snippet).toContain("|| true");
  });

  it("drops unsafe and duplicate filenames", () => {
    const snippet = buildCopyFilesSnippet([
      "CLAUDE.md",
      "../bad.md",
      "CLAUDE.md",
      "bad;rm -rf /",
    ]);
    expect(snippet).toContain("CLAUDE.md");
    expect(snippet).not.toContain("../bad.md");
    expect(snippet).not.toContain("bad;rm -rf /");
    expect((snippet.match(/CLAUDE\.md/g) ?? []).length).toBe(1);
  });
});

describe("buildWslWorkspaceCmd", () => {
  it("includes bootstrap.sh conditional step", () => {
    const cmd = buildWslWorkspaceCmd("~/project/my-repo", "claude");
    expect(cmd).toContain(".claude/scripts/bootstrap.sh");
    expect(cmd).toContain("[ -f .claude/scripts/bootstrap.sh ]");
  });

  it("runs bootstrap.sh before code .", () => {
    const cmd = buildWslWorkspaceCmd("~/project/my-repo", "claude");
    const bootstrapIdx = cmd.indexOf(".claude/scripts/bootstrap.sh");
    const codeIdx = cmd.indexOf("code .");
    expect(bootstrapIdx).toBeLessThan(codeIdx);
  });

  it("bootstrap step runs after install.sh", () => {
    const cmd = buildWslWorkspaceCmd("~/project/my-repo", "claude");
    const installIdx = cmd.indexOf("install.sh");
    const bootstrapIdx = cmd.indexOf(".claude/scripts/bootstrap.sh");
    expect(installIdx).toBeLessThan(bootstrapIdx);
  });

  it("bootstrap step is conditional and non-fatal", () => {
    const cmd = buildWslWorkspaceCmd("~/project/my-repo", "claude");
    expect(cmd).toContain("|| true");
  });

  it("quick mode skips setup pipeline", () => {
    const cmd = buildWslWorkspaceCmd("~/project/my-repo", 'claude "/pr"', {
      mode: "quick",
    });
    expect(cmd).toContain('cd "~/project/my-repo"');
    expect(cmd).toContain('claude "/pr"');
    expect(cmd).not.toContain("cloude-ops");
    expect(cmd).not.toContain("install.sh");
    expect(cmd).not.toContain("bootstrap.sh");
    expect(cmd).not.toContain("code .");
  });
});

describe("buildWslWorkspaceCmd with opsCopyFiles", () => {
  it("copy snippet appears after install.sh and before bootstrap.sh in full mode", () => {
    const cmd = buildWslWorkspaceCmd("~/project/my-repo", "claude", {
      mode: "full",
      opsCopyFiles: ["CLAUDE.md"],
    });
    const installIdx = cmd.indexOf("install.sh");
    const copyIdx = cmd.indexOf('cp "$HOME/.cloude-ops/CLAUDE.md"');
    const bootstrapIdx = cmd.indexOf(".claude/scripts/bootstrap.sh");
    expect(installIdx).toBeLessThan(copyIdx);
    expect(copyIdx).toBeLessThan(bootstrapIdx);
  });

  it("no snippet in quick mode regardless of opsCopyFiles", () => {
    const cmd = buildWslWorkspaceCmd("~/project/my-repo", "claude", {
      mode: "quick",
      opsCopyFiles: ["CLAUDE.md"],
    });
    expect(cmd).not.toContain("cp ~/.cloude-ops/CLAUDE.md");
  });

  it("no snippet when opsCopyFiles is empty", () => {
    const cmd = buildWslWorkspaceCmd("~/project/my-repo", "claude", {
      mode: "full",
      opsCopyFiles: [],
    });
    expect(cmd).not.toContain("$HOME/.cloude-ops/");
  });
});

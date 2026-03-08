import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("electron", () => ({
  app: {
    getPath: () => "/home/user/.config/claude-launcher",
  },
}));

describe("DEFAULT_CONFIG includes dirCommands", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("getConfig() returns dirCommands default", async () => {
    const { getConfig } = await import("../config");
    const cfg = getConfig();
    expect(cfg).toHaveProperty("dirCommands");
    expect(cfg.dirCommands).toBeTypeOf("object");
  });
});

describe("DEFAULT_CONFIG includes opsCopyFiles", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("getConfig() returns opsCopyFiles as array with defaults", async () => {
    const { getConfig } = await import("../config");
    const cfg = getConfig();
    expect(cfg).toHaveProperty("opsCopyFiles");
    expect(Array.isArray(cfg.opsCopyFiles)).toBe(true);
    expect(cfg.opsCopyFiles.length).toBeGreaterThan(0);
  });
});

describe("sanitizeOpsCopyFiles", () => {
  it("filters unsafe values and deduplicates", async () => {
    const { sanitizeOpsCopyFiles } = await import("../config");
    const files = sanitizeOpsCopyFiles([
      "CLAUDE.md",
      " ../secrets ",
      "/root.txt",
      "good/path.md",
      "good/path.md",
      "bad;rm -rf /",
    ]);

    expect(files).toEqual(["CLAUDE.md", "good/path.md"]);
  });

  it("returns fallback when non-array input is provided", async () => {
    const { sanitizeOpsCopyFiles } = await import("../config");
    const files = sanitizeOpsCopyFiles("not-an-array", ["CLAUDE.md"]);
    expect(files).toEqual(["CLAUDE.md"]);
  });
});

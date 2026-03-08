import { readFileSync, writeFileSync, mkdirSync } from "fs";
import path from "path";
import { app } from "electron";
import type { Config } from "@shared/types";

const CONFIG_PATH = path.join(app.getPath("userData"), "config.json");

const DEFAULT_CONFIG: Config = {
  exclude: [".git", ".claude", "node_modules"],
  lastSelection: [],
  presets: {},
  groups: {},
  wslDistro: "Ubuntu",
  wslRoot: "~/project",
  dirCommands: {},
  opsCopyFiles: ["CLAUDE.md", "principles.md", "architecture.mmd"],
};

export function sanitizeOpsCopyFiles(
  files: unknown,
  fallback: string[] = [],
): string[] {
  if (!Array.isArray(files)) return [...fallback];

  const seen = new Set<string>();
  const sanitized: string[] = [];

  for (const raw of files) {
    if (typeof raw !== "string") continue;
    const item = raw.trim();
    if (!item) continue;
    if (item.startsWith("/")) continue;
    if (/[^A-Za-z0-9._/-]/.test(item)) continue;

    const segments = item.split("/");
    if (
      segments.some(
        (segment) => !segment || segment === "." || segment === "..",
      )
    )
      continue;

    if (seen.has(item)) continue;
    seen.add(item);
    sanitized.push(item);
  }

  return sanitized;
}

export function getConfig(): Config {
  try {
    const raw = readFileSync(CONFIG_PATH, "utf-8");
    const parsed = JSON.parse(raw) as Partial<Config>;
    return {
      ...DEFAULT_CONFIG,
      ...parsed,
      opsCopyFiles: sanitizeOpsCopyFiles(
        parsed.opsCopyFiles,
        DEFAULT_CONFIG.opsCopyFiles,
      ),
    };
  } catch {
    return { ...DEFAULT_CONFIG };
  }
}

export function saveConfig(cfg: Config): void {
  mkdirSync(path.dirname(CONFIG_PATH), { recursive: true });
  writeFileSync(
    CONFIG_PATH,
    JSON.stringify(
      { ...cfg, opsCopyFiles: sanitizeOpsCopyFiles(cfg.opsCopyFiles) },
      null,
      2,
    ),
    "utf-8",
  );
}

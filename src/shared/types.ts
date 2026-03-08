export interface Config {
  exclude: string[]
  lastSelection: string[]
  presets: Record<string, string[]>
  groups: Record<string, string[]>
  wslDistro: string
  wslRoot: string
  dirCommands: Record<string, string>
  opsCopyFiles: string[]
}

// Entry used across IPC boundary for launching workspaces
export interface LaunchEntry {
  dir: string
  command: string
}

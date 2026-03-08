import { readFileSync } from 'fs'

export function isWsl2(): boolean {
  try {
    return readFileSync('/proc/version', 'utf-8').toLowerCase().includes('microsoft')
  } catch {
    return false
  }
}

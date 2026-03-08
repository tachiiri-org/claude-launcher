import { useEffect } from 'react'
import type { Config } from '@shared/types'
import DirList from './components/DirList'
import PresetPanel from './components/PresetPanel'
import ExcludePanel from './components/ExcludePanel'
import OpsCopyPanel from './components/OpsCopyPanel'
import Settings from './components/Settings'
import { useConfig } from './hooks/useConfig'
import { useDirSelection } from './hooks/useDirSelection'
import { useLaunch } from './hooks/useLaunch'
import { DEFAULT_LAUNCH_COMMAND } from '@shared/constants'

export default function App() {
  const { config, dirs, setConfig, updateConfig } = useConfig()
  const { selected, toggleDir, setInitialSelection, pruneToDirs, setFromPreset } = useDirSelection()
  const { launching, launch } = useLaunch(setConfig)

  const handleConfigChange = (updates: Partial<Config>) => updateConfig(updates)

  useEffect(() => {
    if (config && dirs.length) {
      setInitialSelection(dirs, config.lastSelection)
    }
  }, [config, dirs, setInitialSelection])

  if (!config) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-900 text-slate-400 text-sm">
        Loading…
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-slate-900 text-slate-100 select-none">
      {/* Header */}
      <header className="px-4 py-2.5 bg-slate-800 border-b border-slate-700 shrink-0">
        <div className="flex items-center gap-3">
          <h1 className="text-base font-semibold text-blue-400 tracking-tight">Claude Workspace Launcher</h1>
          <div className="ml-auto text-sm text-slate-400">Per-directory commands in cards</div>
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: directory list */}
        <div className="flex-1 overflow-y-auto border-r border-slate-700">
          <DirList
            dirs={dirs}
            groups={config.groups || {}}
            dirCommands={config.dirCommands || {}}
            selected={selected}
            onToggle={toggleDir}
            onCommandChange={async (dir, cmd) => {
              await updateConfig({ dirCommands: { ...(config.dirCommands || {}), [dir]: cmd || DEFAULT_LAUNCH_COMMAND } })
            }}
            onOpenVSCode={(dir) => window.api.open.vscode(dir)}
            onOpenExplorer={(dir) => window.api.open.explorer(dir)}
            onAddGroup={() => handleConfigChange({ groups: { ...config.groups, ['New Group']: [] } })}
            onDeleteGroup={(name) => {
              const { [name]: _removed, ...rest } = config.groups
              // Move deleted group's dirs back to ungrouped by dropping mapping
              handleConfigChange({ groups: rest })
            }}
            onRenameGroup={(oldName, newName) => {
              if (oldName === newName) return
              const { [oldName]: list = [], ...rest } = config.groups
              handleConfigChange({ groups: { ...rest, [newName]: list } })
            }}
            onMoveDir={(dir, targetGroup) => {
              const nextGroups: Record<string, string[]> = {}
              // Remove from all groups
              for (const [g, arr] of Object.entries(config.groups)) {
                nextGroups[g] = arr.filter((d) => d !== dir)
              }
              if (targetGroup) {
                nextGroups[targetGroup] = [...(nextGroups[targetGroup] || []), dir]
              }
              handleConfigChange({ groups: nextGroups })
            }}
          />
        </div>

        {/* Right: panels */}
        <div className="w-72 flex flex-col overflow-y-auto shrink-0">
          <PresetPanel
            presets={config.presets}
            selected={selected}
            onApply={(presetDirs) => setFromPreset(presetDirs)}
            onSave={(name, presetDirs) =>
              handleConfigChange({ presets: { ...config.presets, [name]: presetDirs } })
            }
            onDelete={(name) => {
              const { [name]: _removed, ...rest } = config.presets
              handleConfigChange({ presets: rest })
            }}
          />
          <ExcludePanel
            exclude={config.exclude}
            onChange={async (exclude) => {
              const { newDirs } = await updateConfig({ exclude })
              if (newDirs) pruneToDirs(newDirs)
            }}
          />
          <OpsCopyPanel
            opsCopyFiles={config.opsCopyFiles ?? []}
            onChange={(opsCopyFiles) => updateConfig({ opsCopyFiles })}
          />
          <Settings
            wslDistro={config.wslDistro}
            wslRoot={config.wslRoot || '~/project'}
            onChange={(updates) => handleConfigChange(updates)}
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="px-4 py-3 bg-slate-800 border-t border-slate-700 shrink-0">
        <button
          onClick={() => launch(config, selected)}
          disabled={selected.size === 0 || launching}
          className="w-full py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-600 disabled:cursor-not-allowed rounded-lg font-semibold text-sm transition-colors"
        >
          {launching ? 'Launching…' : `Launch (${selected.size})`}
        </button>
      </footer>
    </div>
  )
}

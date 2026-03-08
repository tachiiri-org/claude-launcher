import { useMemo, useState } from 'react'
import DirCard from './DirCard'
import GroupHeader from './GroupHeader'
import { groupDirs } from '../lib/groupDirs'
import { DEFAULT_LAUNCH_COMMAND } from '@shared/constants'

interface Props {
  dirs: string[]
  groups: Record<string, string[]>
  dirCommands: Record<string, string>
  selected: Set<string>
  onToggle: (dir: string) => void
  onCommandChange: (dir: string, cmd: string) => void
  onOpenVSCode: (dir: string) => void
  onOpenExplorer: (dir: string) => void
  onAddGroup: () => void
  onDeleteGroup: (name: string) => void
  onRenameGroup: (oldName: string, newName: string) => void
  onMoveDir: (dir: string, targetGroup: string | null) => void
}

// DirRow moved to separate file to keep this component tidy

// GroupHeader moved to separate file

export default function DirList({
  dirs,
  groups,
  dirCommands,
  selected,
  onToggle,
  onCommandChange,
  onOpenVSCode,
  onOpenExplorer,
  onAddGroup,
  onDeleteGroup,
  onRenameGroup,
  onMoveDir,
}: Props) {
  const grouped = useMemo(() => groupDirs(dirs, groups), [dirs, groups])

  const renderDir = (dir: string) => (
    <DirCard
      key={dir}
      dir={dir}
      checked={selected.has(dir)}
      command={dirCommands[dir] || DEFAULT_LAUNCH_COMMAND}
      onToggle={() => onToggle(dir)}
      onCommandChange={(cmd) => onCommandChange(dir, cmd)}
      onOpenVSCode={() => onOpenVSCode(dir)}
      onOpenExplorer={() => onOpenExplorer(dir)}
    />
  )

  return (
    <div className="p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1">Directories</div>
        <button onClick={onAddGroup} className="text-sm text-slate-500 hover:text-slate-300">+ Group</button>
      </div>

      {/* Ungrouped */}
      <GroupHeader
        name="Ungrouped"
        onRename={() => {}}
        onDelete={() => {}}
        droppable
        onDropDir={(dir) => onMoveDir(dir, null)}
      />
      {grouped.ungrouped.length === 0 && (
        <div className="text-slate-500 text-sm px-1 mb-2">No ungrouped directories</div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
        {grouped.ungrouped.map(renderDir)}
      </div>

      {/* Groups */}
      {Object.entries(grouped.groups).map(([name, list]) => (
        <div key={name} className="mt-3">
          <GroupHeader
            name={name}
            onRename={(newName) => onRenameGroup(name, newName)}
            onDelete={() => onDeleteGroup(name)}
            droppable
            onDropDir={(dir) => onMoveDir(dir, name)}
          />
          {list.length === 0 && <div className="text-slate-500 text-sm px-1 mb-2">Empty</div>}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
            {list.map(renderDir)}
          </div>
        </div>
      ))}
    </div>
  )
}

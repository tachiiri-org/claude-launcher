import { useState } from 'react'

interface Props {
  presets: Record<string, string[]>
  selected: Set<string>
  onApply: (dirs: string[]) => void
  onSave: (name: string, dirs: string[]) => void
  onDelete: (name: string) => void
}

export default function PresetPanel({ presets, selected, onApply, onSave, onDelete }: Props) {
  const [newName, setNewName] = useState('')
  const [showInput, setShowInput] = useState(false)

  function handleSave() {
    const name = newName.trim()
    if (!name) return
    onSave(name, [...selected])
    setNewName('')
    setShowInput(false)
  }

  return (
    <div className="p-3 border-b border-slate-700">
      <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
        Presets
      </div>
      <div className="flex flex-wrap gap-1.5 mb-2">
        {Object.entries(presets).map(([name, dirs]) => (
          <div key={name} className="flex items-center rounded-full overflow-hidden">
            <button
              onClick={() => onApply(dirs)}
              className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-sm transition-colors"
              title={dirs.join(', ')}
            >
              {name}
            </button>
            <button
              onClick={() => onDelete(name)}
              className="px-2 py-1 bg-slate-700 hover:bg-red-900 text-slate-400 hover:text-red-300 text-sm border-l border-slate-600 transition-colors"
              title="Delete preset"
            >
              ×
            </button>
          </div>
        ))}
        {Object.keys(presets).length === 0 && (
          <span className="text-sm text-slate-500">No presets yet</span>
        )}
      </div>
      {showInput ? (
        <div className="flex gap-1.5">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSave()
              if (e.key === 'Escape') setShowInput(false)
            }}
            placeholder="preset name"
            className="flex-1 bg-slate-700/80 rounded px-2 py-1 text-sm outline-none min-w-0 focus:ring-1 ring-blue-500"
            autoFocus
          />
          <button
            onClick={handleSave}
            className="text-sm text-blue-400 hover:text-blue-300 px-1.5"
          >
            Save
          </button>
          <button
            onClick={() => setShowInput(false)}
            className="text-sm text-slate-500 hover:text-slate-300 px-1.5"
          >
            ✕
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowInput(true)}
          className="text-sm text-slate-500 hover:text-slate-300"
        >
          + Save current selection
        </button>
      )}
    </div>
  )
}

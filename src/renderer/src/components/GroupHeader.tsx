import { useState } from 'react'

interface Props {
  name: string
  onRename: (newName: string) => void
  onDelete: () => void
  droppable: boolean
  onDropDir: (dir: string) => void
}

export default function GroupHeader({ name, onRename, onDelete, droppable, onDropDir }: Props) {
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(name)
  const [highlight, setHighlight] = useState(false)

  return (
    <div
      className={`flex items-center justify-between px-1 mb-2 rounded ${highlight ? 'ring-1 ring-blue-500' : ''}`}
      onDragOver={(e) => {
        if (!droppable) return
        e.preventDefault()
        e.dataTransfer.dropEffect = 'move'
        setHighlight(true)
      }}
      onDragLeave={() => setHighlight(false)}
      onDrop={(e) => {
        if (!droppable) return
        e.preventDefault()
        const dir = e.dataTransfer.getData('text/plain')
        if (dir) onDropDir(dir)
        setHighlight(false)
      }}
    >
      {editing ? (
        <input
          className="bg-slate-700/80 rounded px-2 py-1 text-sm outline-none focus:ring-1 ring-blue-500"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => {
            const newName = value.trim()
            if (newName && newName !== name) onRename(newName)
            setEditing(false)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') (e.target as HTMLInputElement).blur()
            if (e.key === 'Escape') {
              setValue(name)
              setEditing(false)
            }
          }}
          autoFocus
        />
      ) : (
        <button
          className="text-xs font-semibold text-slate-400 uppercase tracking-wider"
          onClick={() => setEditing(true)}
          title="Rename group"
        >
          {name}
        </button>
      )}
      <button onClick={onDelete} className="text-slate-500 hover:text-red-400 text-sm" title="Delete group">
        ×
      </button>
    </div>
  )
}


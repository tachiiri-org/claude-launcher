import { useState, useEffect } from 'react'

interface Props {
  wslDistro: string
  wslRoot: string
  onChange: (updates: { wslDistro?: string; wslRoot?: string }) => void
}

export default function Settings({ wslDistro, wslRoot, onChange }: Props) {
  const [distro, setDistro] = useState(wslDistro)
  const [root, setRoot] = useState(wslRoot)

  useEffect(() => setDistro(wslDistro), [wslDistro])
  useEffect(() => setRoot(wslRoot), [wslRoot])

  return (
    <div className="p-3">
      <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
        WSL Settings
      </div>
      <div className="space-y-3">
        <div>
          <label className="text-xs text-slate-400 uppercase tracking-wide block mb-1">Distro</label>
          <input
            type="text"
            value={distro}
            onChange={(e) => setDistro(e.target.value)}
            onBlur={() => onChange({ wslDistro: distro })}
            className="w-full bg-slate-700/80 rounded px-2 py-1.5 text-sm outline-none focus:ring-1 ring-blue-500"
          />
        </div>
        <div>
          <label className="text-xs text-slate-400 uppercase tracking-wide block mb-1">WSL Root</label>
          <input
            type="text"
            value={root}
            onChange={(e) => setRoot(e.target.value)}
            onBlur={() => onChange({ wslRoot: root })}
            className="w-full bg-slate-700/80 rounded px-2 py-1.5 text-sm outline-none focus:ring-1 ring-blue-500"
          />
        </div>
      </div>
    </div>
  )
}

import { useState } from "react";

interface Props {
  opsCopyFiles: string[];
  onChange: (files: string[]) => void;
}

export default function OpsCopyPanel({ opsCopyFiles, onChange }: Props) {
  const [newItem, setNewItem] = useState("");
  const [showInput, setShowInput] = useState(false);

  function handleAdd(): void {
    const item = newItem.trim();
    if (!item || opsCopyFiles.includes(item)) return;
    onChange([...opsCopyFiles, item]);
    setNewItem("");
    setShowInput(false);
  }

  return (
    <div className="p-3 border-b border-slate-700">
      <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
        Ops Copy Files
      </div>
      <div className="flex flex-wrap gap-1.5 mb-2">
        {opsCopyFiles.map((item) => (
          <div
            key={item}
            className="flex items-center gap-1 bg-slate-700 rounded-full px-2.5 py-1 text-sm"
          >
            <span className="text-slate-300">{item}</span>
            <button
              onClick={() => onChange(opsCopyFiles.filter((f) => f !== item))}
              aria-label={`Remove ${item} from ops copy files`}
              className="text-slate-500 hover:text-red-400 leading-none"
              title="Remove from ops copy files"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      {showInput ? (
        <div className="flex gap-1.5">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAdd();
              if (e.key === "Escape") setShowInput(false);
            }}
            placeholder="filename"
            pattern="[A-Za-z0-9._/-]+"
            title="Allowed: letters, numbers, dot, underscore, slash, hyphen"
            className="flex-1 bg-slate-700/80 rounded px-2 py-1 text-sm outline-none min-w-0 focus:ring-1 ring-blue-500"
            autoFocus
          />
          <button
            onClick={handleAdd}
            aria-label="Add ops copy file"
            className="text-sm text-blue-400 hover:text-blue-300 px-1.5"
          >
            Add
          </button>
          <button
            onClick={() => setShowInput(false)}
            aria-label="Cancel adding ops copy file"
            className="text-sm text-slate-500 hover:text-slate-300 px-1.5"
          >
            ✕
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowInput(true)}
          aria-label="Show input to add ops copy file"
          className="text-sm text-slate-500 hover:text-slate-300"
        >
          + Add
        </button>
      )}
    </div>
  );
}

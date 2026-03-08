import { useState } from "react";
import { LAUNCH_COMMANDS } from "@shared/constants";

interface Props {
  dir: string;
  checked: boolean;
  command: string;
  onToggle: () => void;
  onOpenVSCode: () => void;
  onOpenExplorer: () => void;
  onCommandChange: (cmd: string) => void;
}

export default function DirCard({
  dir,
  checked,
  command,
  onToggle,
  onOpenVSCode,
  onOpenExplorer,
  onCommandChange,
}: Props) {
  const [dragging, setDragging] = useState(false);
  return (
    <div
      draggable
      onDragStart={(e) => {
        setDragging(true);
        e.dataTransfer.setData("text/plain", dir);
        e.dataTransfer.effectAllowed = "move";
      }}
      onDragEnd={() => setDragging(false)}
      className={`group flex flex-col gap-2 px-3 py-2 rounded-lg border transition-colors ${
        checked
          ? "bg-slate-700/60 border-blue-500"
          : "bg-slate-800/50 border-slate-700 hover:border-slate-500"
      } ${dragging ? "opacity-70" : ""}`}
    >
      {/* Row 1: checkbox + dir label */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={checked}
          onChange={onToggle}
          className="accent-blue-400 shrink-0"
        />
        <div className="truncate text-sm flex-1">{dir}</div>
      </div>
      {/* Row 2: command select + action buttons */}
      <div className="flex items-center gap-2">
        <select
          value={command}
          onChange={(e) => onCommandChange(e.target.value)}
          className="flex-1 min-w-0 bg-slate-700/80 rounded px-2 py-1 text-xs outline-none focus:ring-1 ring-blue-500"
          title="Launch command"
        >
          {LAUNCH_COMMANDS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <button
          onClick={(e) => {
            e.preventDefault();
            onOpenVSCode();
          }}
          aria-label={`Open ${dir} in VSCode`}
          className="opacity-80 hover:opacity-100 transition-opacity text-slate-400 hover:text-blue-300 text-xs"
          title="Open in VSCode"
        >
          {"</>"}
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            onOpenExplorer();
          }}
          aria-label={`Open ${dir} in file explorer`}
          className="opacity-80 hover:opacity-100 transition-opacity text-slate-400 hover:text-emerald-300 text-xs"
          title="Open in Explorer"
        >
          {"🗁"}
        </button>
      </div>
    </div>
  );
}

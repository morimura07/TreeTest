import { useEffect, useId, useState } from "react";
import { IconCheck, IconClose, IconPlus } from "@/components/icons/GoalIcons";
import { IconButton } from "@/components/ui/IconButton";
import {
  goalAccentBarClasses,
  goalCardSurfaceClasses,
  goalStatusLabel,
  goalStatusTextClasses,
} from "@/lib/goalNodeStyles";
import type { GoalNode } from "@/types/goal";

type GoalTreeNodeProps = {
  node: GoalNode;
  /** True if any ancestor was rejected — this node is inert + muted */
  lockedByAncestor: boolean;
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
  onAddChild: (parentId: string, title: string) => void;
};

export function GoalTreeNode({
  node,
  lockedByAncestor,
  onAccept,
  onReject,
  onAddChild,
}: GoalTreeNodeProps) {
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState("");
  const formId = useId();

  const subtreeLockedForChildren = lockedByAncestor || node.status === "rejected";
  const interactive = !lockedByAncestor && node.status !== "rejected";
  const ctx = { subtreeLocked: lockedByAncestor };

  useEffect(() => {
    if (!interactive) {
      setAdding(false);
      setDraft("");
    }
  }, [interactive]);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const t = draft.trim();
    if (!t) return;
    onAddChild(node.id, t);
    setDraft("");
    setAdding(false);
  };

  return (
    <li className="relative">
      <div
        className={[
          "group relative flex gap-0 overflow-hidden rounded-xl border",
          goalCardSurfaceClasses(node.status, ctx),
        ].join(" ")}
      >
        <div
          className={["w-1 shrink-0 self-stretch", goalAccentBarClasses(node.status, ctx)].join(" ")}
          aria-hidden
        />
        <div className="flex min-w-0 flex-1 flex-col gap-3 p-4 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div className="min-w-0 flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={[
                  "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide",
                  goalStatusTextClasses(node.status, ctx),
                  lockedByAncestor ? "bg-zinc-900/80" : "bg-black/25",
                ].join(" ")}
              >
                {goalStatusLabel(node.status)}
              </span>
            </div>
            <p
              className={[
                "text-[15px] font-medium leading-snug tracking-tight sm:text-base",
                lockedByAncestor ? "text-zinc-500" : "text-zinc-100",
              ].join(" ")}
            >
              {node.goal}
            </p>
            {adding && interactive && (
              <form id={formId} onSubmit={handleAddSubmit} className="flex flex-col gap-2 pt-1">
                <label htmlFor={`${formId}-input`} className="sr-only">
                  New child goal
                </label>
                <input
                  id={`${formId}-input`}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Describe the new goal…"
                  autoFocus
                  className="w-full rounded-lg border border-zinc-700/80 bg-night-950/80 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-sunset-500/60 focus:outline-none focus:ring-2 focus:ring-sunset-500/25"
                />
                <div className="flex flex-wrap gap-2">
                  <button
                    type="submit"
                    className="rounded-lg bg-sunset-500/90 px-3 py-1.5 text-sm font-medium text-night-950 transition hover:bg-sunset-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sunset-400/80"
                  >
                    Add goal
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAdding(false);
                      setDraft("");
                    }}
                    className="rounded-lg border border-zinc-700/80 bg-transparent px-3 py-1.5 text-sm font-medium text-zinc-300 hover:bg-zinc-800/60"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>

          {interactive && !adding && (
            <div className="flex shrink-0 items-center gap-1.5 self-start sm:self-center">
              <IconButton
                label="Accept goal"
                variant="success"
                onClick={() => onAccept(node.id)}
                disabled={node.status === "completed"}
              >
                <IconCheck className="h-4 w-4" />
              </IconButton>
              <IconButton
                label="Reject goal"
                variant="danger"
                onClick={() => onReject(node.id)}
                disabled={node.status === "rejected"}
              >
                <IconClose className="h-4 w-4" />
              </IconButton>
              <IconButton
                label="Add child goal"
                variant="ghost"
                className="text-sunset-400 hover:text-sunset-300"
                onClick={() => setAdding(true)}
              >
                <IconPlus className="h-4 w-4" />
              </IconButton>
            </div>
          )}
        </div>
      </div>

      {node.children.length > 0 && (
        <ul className="relative ml-4 mt-5 space-y-6 border-l border-zinc-800/90 pl-6">
          {node.children.map((child) => (
            <GoalTreeNode
              key={child.id}
              node={child}
              lockedByAncestor={subtreeLockedForChildren}
              onAccept={onAccept}
              onReject={onReject}
              onAddChild={onAddChild}
            />
          ))}
        </ul>
      )}

    </li>
  );
}

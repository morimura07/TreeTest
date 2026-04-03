import { GoalTreeView } from "@/components/goal-tree/GoalTreeView";
import { useGoalTree } from "@/hooks/useGoalTree";

export function App() {
  const { root, accept, reject, addChild, reset } = useGoalTree();

  return (
    <div className="relative min-h-dvh overflow-x-hidden bg-night-950 text-zinc-100">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(249,115,22,0.14),transparent)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_100%_0%,rgba(251,146,60,0.08),transparent)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-3xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <header className="mb-10 flex flex-col gap-6 border-b border-zinc-800/80 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sunset-400/90">
              Agent goals
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
              Goal tree visualizer
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-zinc-400">
              Review the plan, accept or reject branches, and extend the tree with new child goals.
              Rejecting a node mutes its entire subtree.
            </p>
          </div>
          <button
            type="button"
            onClick={reset}
            className="shrink-0 self-start rounded-lg border border-zinc-700/80 bg-zinc-900/40 px-3 py-2 text-sm font-medium text-zinc-300 transition hover:border-zinc-600/80 hover:bg-zinc-800/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sunset-400/80 sm:self-auto"
          >
            Reset demo
          </button>
        </header>

        <section aria-label="Goal tree">
          <GoalTreeView root={root} onAccept={accept} onReject={reject} onAddChild={addChild} />
        </section>
      </div>
    </div>
  );
}

import type { GoalStatus } from "@/types/goal";

export type GoalNodeVisualContext = {
  /** True when an ancestor was rejected — subtree is inert */
  subtreeLocked: boolean;
};

const ACCENT: Record<GoalStatus, { bar: string; glow: string; label: string }> = {
  completed: {
    bar: "bg-emerald-400",
    glow: "shadow-[0_0_0_1px_rgba(52,211,153,0.25)]",
    label: "text-emerald-300/90",
  },
  in_progress: {
    bar: "bg-amber-400",
    glow: "shadow-[0_0_0_1px_rgba(251,191,36,0.22)]",
    label: "text-amber-200/90",
  },
  pending: {
    bar: "bg-zinc-500",
    glow: "shadow-[0_0_0_1px_rgba(113,113,122,0.35)]",
    label: "text-zinc-400",
  },
  rejected: {
    bar: "bg-rose-500",
    glow: "shadow-[0_0_0_1px_rgba(244,63,94,0.28)]",
    label: "text-rose-300/90",
  },
};

const LOCKED = {
  bar: "bg-zinc-600",
  glow: "shadow-[0_0_0_1px_rgba(63,63,70,0.45)]",
  label: "text-zinc-500",
};

export function goalStatusLabel(status: GoalStatus): string {
  switch (status) {
    case "completed":
      return "Completed";
    case "in_progress":
      return "In progress";
    case "pending":
      return "Pending";
    case "rejected":
      return "Rejected";
  }
}

export function goalCardSurfaceClasses(status: GoalStatus, ctx: GoalNodeVisualContext): string {
  if (ctx.subtreeLocked) {
    return [
      "border-zinc-800/80 bg-zinc-950/40",
      LOCKED.glow,
      "opacity-55",
    ].join(" ");
  }
  switch (status) {
    case "completed":
      return ["border-emerald-500/25 bg-emerald-950/20", ACCENT.completed.glow].join(" ");
    case "in_progress":
      return ["border-amber-500/25 bg-amber-950/15", ACCENT.in_progress.glow].join(" ");
    case "pending":
      return ["border-zinc-700/80 bg-zinc-950/50", ACCENT.pending.glow].join(" ");
    case "rejected":
      return ["border-rose-500/30 bg-rose-950/25", ACCENT.rejected.glow].join(" ");
  }
}

export function goalAccentBarClasses(status: GoalStatus, ctx: GoalNodeVisualContext): string {
  if (ctx.subtreeLocked) return LOCKED.bar;
  return ACCENT[status].bar;
}

export function goalStatusTextClasses(status: GoalStatus, ctx: GoalNodeVisualContext): string {
  if (ctx.subtreeLocked) return LOCKED.label;
  return ACCENT[status].label;
}

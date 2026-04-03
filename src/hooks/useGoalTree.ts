import { useCallback, useState } from "react";
import { createInitialGoalTree } from "@/data/initialGoalTree";
import { appendChildGoal, setNodeStatus } from "@/lib/goalTreeMutations";
import type { GoalNode } from "@/types/goal";

export function useGoalTree() {
  const [root, setRoot] = useState<GoalNode>(() => createInitialGoalTree());

  const accept = useCallback((id: string) => {
    setRoot((t) => setNodeStatus(t, id, "completed"));
  }, []);

  const reject = useCallback((id: string) => {
    setRoot((t) => setNodeStatus(t, id, "rejected"));
  }, []);

  const addChild = useCallback((parentId: string, goal: string) => {
    const trimmed = goal.trim();
    if (!trimmed) return;
    setRoot((t) => appendChildGoal(t, parentId, trimmed));
  }, []);

  const reset = useCallback(() => {
    setRoot(createInitialGoalTree());
  }, []);

  return { root, accept, reject, addChild, reset };
}

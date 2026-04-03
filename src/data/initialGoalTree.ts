import type { GoalNode, GoalStatus } from "@/types/goal";

type SeedGoal = {
  goal: string;
  status: GoalStatus;
  children: SeedGoal[];
};

export const INITIAL_GOAL_TREE_SEED: SeedGoal = {
  goal: "Add Stripe webhook handling",
  status: "in_progress",
  children: [
    {
      goal: "Create webhook endpoint",
      status: "completed",
      children: [],
    },
    {
      goal: "Parse subscription events",
      status: "in_progress",
      children: [
        {
          goal: "Handle upgrade event",
          status: "pending",
          children: [],
        },
        {
          goal: "Handle cancellation event",
          status: "pending",
          children: [],
        },
      ],
    },
    {
      goal: "Write tests",
      status: "pending",
      children: [],
    },
  ],
};

function assignIds(node: SeedGoal): GoalNode {
  return {
    id: crypto.randomUUID(),
    goal: node.goal,
    status: node.status,
    children: node.children.map(assignIds),
  };
}

export function createInitialGoalTree(): GoalNode {
  return assignIds(INITIAL_GOAL_TREE_SEED);
}

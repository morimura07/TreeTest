/** Canonical goal status from data + user actions */
export type GoalStatus = "completed" | "in_progress" | "pending" | "rejected";

export interface GoalNode {
  id: string;
  goal: string;
  status: GoalStatus;
  children: GoalNode[];
}

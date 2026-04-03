import type { GoalNode, GoalStatus } from "@/types/goal";

function updateNodeById(
  node: GoalNode,
  id: string,
  updater: (n: GoalNode) => GoalNode,
): GoalNode {
  if (node.id === id) return updater(node);
  return {
    ...node,
    children: node.children.map((c) => updateNodeById(c, id, updater)),
  };
}

export function setNodeStatus(tree: GoalNode, id: string, status: GoalStatus): GoalNode {
  return updateNodeById(tree, id, (n) => ({ ...n, status }));
}

export function appendChildGoal(tree: GoalNode, parentId: string, goal: string): GoalNode {
  const child: GoalNode = {
    id: crypto.randomUUID(),
    goal,
    status: "pending",
    children: [],
  };
  return updateNodeById(tree, parentId, (n) => ({
    ...n,
    children: [...n.children, child],
  }));
}

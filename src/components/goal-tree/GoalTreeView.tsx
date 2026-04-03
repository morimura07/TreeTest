import { GoalTreeNode } from "@/components/goal-tree/GoalTreeNode";
import type { GoalNode } from "@/types/goal";

type GoalTreeViewProps = {
  root: GoalNode;
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
  onAddChild: (parentId: string, title: string) => void;
};

export function GoalTreeView({ root, onAccept, onReject, onAddChild }: GoalTreeViewProps) {
  return (
    <ul className="m-0 list-none p-0">
      <GoalTreeNode
        node={root}
        lockedByAncestor={false}
        onAccept={onAccept}
        onReject={onReject}
        onAddChild={onAddChild}
      />
    </ul>
  );
}

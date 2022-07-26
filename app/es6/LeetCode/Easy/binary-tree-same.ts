import { TreeNode } from "./binary-tree-inorder-traversal";

function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean
{
    if (!p && !q) return true;

    if (!p && q || p && !q || p!.val !== q!.val) return false;

    return isSameTree(p!.left, q!.left) && isSameTree(p!.right, q!.right);
};
isSameTree(new TreeNode(1, new TreeNode(2)), new TreeNode(1, new TreeNode(3)));

export class TreeNode
{
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null)
    {
        this.val = (val === undefined ? 0 : val);
        this.left = (left === undefined ? null : left);
        this.right = (right === undefined ? null : right);
    }
}

function inorderTraversal(root: TreeNode | null): number[]
{
    const res: number[] = [];

    traverse(root, res);

    return res;
};
function traverse(root: TreeNode | null, result: number[]): number[] | void
{
    if (!root) return [];

    traverse(root.left, result);

    result.push(root.val);

    traverse(root.right, result);
}

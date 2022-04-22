export default class ListNode
{
    constructor(val?: number, next?: ListNode | null)
    {
        this.val = val === undefined ? 0 : val;
        this.next = next === undefined ? null : next;
    }
    val: number;
    next: ListNode | null;
    public readonly iterateListNode = (nextNode: ListNode = this, arr: number[] = []): number[] =>
    {
        if (!this.val) return arr;

        arr.push(nextNode.val);

        if (nextNode.next)
        {
            this.iterateListNode(nextNode.next, arr);
        }
        return arr;
    };
    /**
     * @returns retrun a new ListNode that sorted
     */
    public readonly sortListNode = (): ListNode | null =>
    {
        const arr_unsort = this.iterateListNode();

        return arrToListNode(arr_unsort.sort((a, b) => a - b));
    };
}


export const arrToListNode = (arr: number[], isLoopLink: boolean = false): ListNode | null =>
{
    if (!arr.length) return null;

    const head = new ListNode(arr[0]);

    let nextNode = head;

    for (let i = 1; i < arr.length; i++)
    {
        nextNode.next = new ListNode(arr[i]);
        nextNode = nextNode.next;
    }

    if (isLoopLink) nextNode.next = head;

    return head;
};

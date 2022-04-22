
class ListNode
{
    constructor(val?: number, next?: ListNode | null)
    {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
    }
    val: number;
    next: ListNode | null;
}

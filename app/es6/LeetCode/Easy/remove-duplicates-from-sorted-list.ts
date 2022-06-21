import ListNode from '../../util/ListNode';


function deleteDuplicates(head: ListNode | null): ListNode | null
{
    if (!head) return head;

    if (head.next)
    {
        if (head.val === head.next.val)
        {
            head.next = head.next.next;
            deleteDuplicates(head);
            return head;
        } else
        {
            deleteDuplicates(head.next);
            return head;
        }
    } else
    {
        return head;
    }

};
deleteDuplicates(new ListNode(1, new ListNode(1, new ListNode(2))));

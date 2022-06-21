import ListNode from '../../util/ListNode';


function deleteDuplicates(head: ListNode | null): ListNode | null
{
    let curre = head;

    while (curre)
    {
        if (curre.next && curre.val === curre.next.val)
        {
            curre.next = curre.next.next;
        } else
        {
            curre = curre.next;
        }
    }

    return head;
};
deleteDuplicates(new ListNode(1, new ListNode(1, new ListNode(2))));

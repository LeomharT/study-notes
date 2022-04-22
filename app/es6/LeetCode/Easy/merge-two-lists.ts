import ListNode from "../../util/ListNode";


function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null
{
    if (!list1) return list2;
    if (!list2) return list1;

    if (list1.val < list2.val)
    {
        list1.next = mergeTwoLists(list1.next, list2);
        return list1;
    } else
    {
        list2.next = mergeTwoLists(list1, list2.next);
        return list2;
    }
};

const list_1: ListNode = new ListNode(1, new ListNode(2, new ListNode(4)));
const list_2: ListNode = new ListNode(1, new ListNode(2, new ListNode(3)));

const list_unsort: ListNode = new ListNode(4, new ListNode(1, new ListNode(3, new ListNode(5, new ListNode(2)))));

console.log(list_unsort.sortListNode());

// console.log(list_sort);
// mergeTwoLists(list_1, list_2);

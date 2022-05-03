import arrToNumber from "../../util/arrToNumber";
import ListNode, { arrToListNode } from "../../util/ListNode";

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null
{
    if (!l1 || !l2) return null;

    const num: number = arrToNumber(l1.iterateListNode()) + arrToNumber(l2.iterateListNode());

    const numArr: number[] = [];
    num.toString().split('').map(v =>
    {
        numArr.unshift(Number.parseInt(v));
    });
    return arrToListNode(numArr);
};


const l1 = new ListNode(1, new ListNode(0, new ListNode(9)));
const l2 = new ListNode(5, new ListNode(7, new ListNode(8)));

console.log(addTwoNumbers(l1, l2));

// https://leetcode.com/problems/sort-list/
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const sortList = head => {
    const arr = [];
    let current = head;
    while (current) {
        arr.push(current.val);
        current = current.next;
    }
    arr.sort((a, b) => a - b);
    current = head;
    let counter = 0;
    while (current) {
        current.val = arr[counter++];
        current = current.next;
    }
    return head;
};


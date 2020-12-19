// https://leetcode.com/problems/add-two-numbers/submissions/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
const addTwoNumbers = (l1, l2) => {
  let result = new ListNode();
  const start = result;
  let carry = 0;
  while (l1 || l2) {
    const a = l1 ? l1.val : 0;
    const b = l2 ? l2.val : 0;
    const sum = a + b + carry;
    result.val = sum % 10;
    carry = Math.floor(sum / 10);
    if (l1) {
      l1 = l1.next;
    }
    if (l2) {
      l2 = l2.next;
    }
    if (l1 || l2) {
      result.next = new ListNode();
      result = result.next;
    }
  }
  if (carry) {
    result.next = new ListNode(carry);
  }
  return start;
};

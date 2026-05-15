// https://leetcode.com/problems/linked-list-cycle/

const hasCycle = head => {
  if (!head) {
    return false;
  }
  let slow = head;
  let fast = head.next;
  while (slow && fast) {
    if (slow === fast) {
      return true;
    }
    slow = slow.next;
    fast = fast.next;
    if (fast) {
      fast = fast.next;
    }
  }
  return false;
};

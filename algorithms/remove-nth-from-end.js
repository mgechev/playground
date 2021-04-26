// https://leetcode.com/problems/remove-nth-node-from-end-of-list

const removeNthFromEnd = (head, n) => {
  return helper(head, null, head, { n, end: false })
};

const helper = (head, prev, current, pointer) => {
  if (!current) {
    pointer.end = true;
    return head;
  } else {
    helper(head, current, current.next, pointer); 
  }
  if (pointer.n === 0) {
    return head;
  }
  if (pointer.end) {
    pointer.n--;
  }
  if (pointer.n === 0) {
    if (current === head) {
      return current.next;
    }
    prev.next = current.next;
    return head;
  }
  return head;
};


const list = {
  val: 1,
  next: {
    val: 2,
    next: null
  }
};

console.log(removeNthFromEnd(list, 1));


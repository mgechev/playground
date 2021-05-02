// https://leetcode.com/problems/swap-nodes-in-pairs/
const swapPairs = head => {
  if (!head || !head.next) {
    return head;
  }
  let prev = null;
  let current = head;
  let next = head.next;
  while (current && next) {
    if (!prev) {
      head = next;
    } else {
      prev.next = next;
    }
    current.next = next.next;
    next.next = current;
    prev = current;
    current = current.next;
    if (!prev.next) {
      return head;
    }
    next = prev.next.next;
  }
  return head;
};

console.log(JSON.stringify(swapPairs({
  val: 1,
  next: {
    val: 2,
    next: {
      val: 3,
      next: {
        val: 4,
        next: null
      }
    }
  }
})));


const deleteDuplicates = (head) => {
  if (!head) return head;
  if (!head.next) return head;
  let current = head;
  let prev = null;
  while (current) {
    // duplicate found
    let duplicate = false;
    while (current && current.next && current.next.val === current.val) {
      current = current.next;
      duplicate = true;
    }
    if (!duplicate) {
      prev = current;
      current = current.next;
      continue;
    }
    if (head.val === current.val) {
      head = prev = current.next;
    } else {
      prev.next = current.next;
    }
    current = current.next;
  }
  return head;
};

const stringify = (head) => {
  if (!head) return '';
  let current = head;
  let result = '';
  while (current) {
    result += current.val;
    if (current.next) {
      result += '->';
    }
    current = current.next;
  }
  return result;
};

console.log(
  stringify(
    deleteDuplicates({
      val: 3,
      next: {
        val: 3,
        next: {
          val: 4,
          next: {
            val: 4,
            next: null,
          },
        },
      },
    })
  )
);

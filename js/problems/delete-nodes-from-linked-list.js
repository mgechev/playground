// https://leetcode.com/problems/delete-nodes-from-linked-list-present-in-array/
const modifiedList = (nums, head) => {
    const exists = new Set();
    for (const el of nums) {
        exists.add(el);
    }

    let current = head;
    let prev = undefined;
    while (current) {
        if (!exists.has(current.val)) {
            prev = current;
            current = current.next;
            continue;
        }
        if (current === head) {
            head = head.next;
            current.next = undefined;
            current = head;
            continue;
        }
        prev.next = current.next;
        current.next = undefined;
        current = prev.next;
        continue;
    }
    return head;
};


// https://leetcode.com/problems/linked-list-in-binary-tree/

const helper = (head, root) => {
    if (!head) {
        return true;
    }
    if (!root) {
        return false;
    }
    if (head.val !== root.val) {
        return false;
    }
    return helper(head.next, root.left) || helper(head.next, root.right);
};

const isSubPath = (head, root) => {
    if (!root) {
        return false;
    }
    const match = helper(head, root);
    return match || isSubPath(head, root.left) || isSubPath(head, root.right);
};

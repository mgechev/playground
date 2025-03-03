// https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/
const helper = (root, depth = 0, result = []) => {
    if (!root) {
        return result;
    }
    result[depth] = result[depth] || [];
    result[depth].push(root.val);
    helper(root.left, depth + 1, result);
    helper(root.right, depth + 1, result);
    return result;
};

const zigzagLevelOrder = root => {
    const result = helper(root);
    return zigify(result);
};

const zigify = levels => {
    for (let i = 0; i < levels.length; i++) {
        if (i % 2) {
            levels[i] = levels[i].reverse();
        }
    }
    return levels;
};

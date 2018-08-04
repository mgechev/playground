// https://leetcode.com/problems/balanced-binary-tree/description/

const height = (n, c) => {
  if (c.has(n)) {
    return c.get(n);
  }
  if (!n) {
    return 0;
  }
  const res = 1 + Math.max(height(n.left, c), height(n.right, c));
  c.set(n, res);
  return res;
};

const isBalanced = (node, cache = new Map()) => {
  if (!node) {
    return true;
  }
  return Math.abs(height(node.left, cache) - height(node.right, cache)) <= 1 &&
    isBalanced(node.left, cache) && isBalanced(node.right, cache);
};


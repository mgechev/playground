const kthSmallest2 = (root, k) => {
  const traverse = (root, nodes = []) => {
    if (!root) {
      return nodes;
    }
    traverse(root.left, nodes);
    nodes.push(root.val);
    traverse(root.right, nodes);
    return nodes;
  };
  if (!root) return undefined;
  return traverse(root)[k - 1];
};

const kthSmallest = (root, k, p = { k }) => {
  if (!root) {
    return p.r;
  }
  kthSmallest(root.left, k, p);
  p.k--;
  if (p.k === 0) {
    p.r = root.val;
    return p.r;
  }
  kthSmallest(root.right, k, p);
  return p.r;
};

const tree1 = {
  val: 3,
  left: {
    val: 1,
    right: {
      val: 2
    }
  },
  right: {
    val: 4
  }
};

const tree2 = {
  val: 5,
  left: {
    val: 3,
    left: {
      val: 2,
      left: {
        val: 1
      }
    },
    right: {
      val: 4
    }
  },
  right: {
    val: 6
  }
};

console.log(kthSmallest(tree1, 1));
console.log(kthSmallest(tree2, 3));

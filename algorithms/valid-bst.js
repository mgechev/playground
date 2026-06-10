const isValidBST = (root, min = -Infinity, max = Infinity) => {
  if (!root) {
    return true;
  }

  if (root.val >= max || root.val <= min) {
    return false;
  }

  return isValidBST(root.left, min, Math.min(max, root.val)) && isValidBST(root.right, Math.max(min, root.val), max);
};

const tree = {
  val: 5,
  left: {
    val: 4
  },
  right: {
    val: 6,
    left: {
      val: 3
    },
    right: {
      val: 7
    }
  }
};

const tree2 = {
  val: 2,
  left: {
    val: 1
  },
  right: {
    val: 3
  }
};

const tree3 = {
  val: 2,
  left: {
    val: 2
  },
  right: {
    val: 2
  }
};


console.log(isValidBST(tree));
console.log(isValidBST(tree2));
console.log(isValidBST(tree3));

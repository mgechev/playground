const mirror = tree => {
  if (!tree) {
    return;
  }
  const newLeft = tree.right;
  const newRight = tree.left;
  tree.left = newLeft;
  tree.right = newRight;
  mirror(newLeft);
  mirror(newRight);
  return tree;
};

const tree = {
  value: 1,
  left: {
    value: 2,
    left: {
      value: 3,
      left: {
        value: 4,
        left: {
          value: 9
        }
      },
    },
    right: {
      value: 5
    }
  },
  right: {
    value: 6,
    left: {
      value: 7,
    },
    right: {
      value: 8
    }
  }
};

console.log(JSON.stringify(mirror(tree), null, 2));


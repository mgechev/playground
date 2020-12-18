const longestPath = tree => {
  if (!tree) {
    return [];
  }
  const leftPath = longestPath(tree.left);
  const rightPath = longestPath(tree.right);
  let result = rightPath;
  if (leftPath.length > rightPath.length) {
    result = leftPath;
  }
  result.push(tree);
  return result;
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

console.log(longestPath(tree).map(node => node.value));


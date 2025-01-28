// https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/
//
const distanceK = (root, target, k) => {
    const matrix = createMatrix(root);
    const visited = new Set();
    const queue = [];

    const result = [];

    queue.push({ node: target.val, distance: 0 });
    while (visited.size < matrix.length && queue.length) {
        current = queue.shift();
        if (visited.has(current.node)) {
            continue;
        }
        if (current.distance === k) {
          result.push(current.node);
        }
        visited.add(current.node);
        const nodes = (matrix[current.node] ?? []).map((_, idx) => idx).filter(el => matrix[current.node][el] === 1);

        for (const node of nodes) {
            queue.push({
              node, distance: current.distance + 1
            });
        }
    }

    return result;
};


const distanceOf = (target, k, prev, el) => {
    let current = el;
    while (k) {
        k--;
        current = prev[current]
        if (current === undefined) {
            return false;
        }
        if (current === target && k === 0) {
            return true;
        }
    }
    return false;
};

const createMatrix = (root, m = []) => {
    if (!root) {
        return m;
    }

    const addEdge = (parent, child) => {
        if (!child) {
            return;
        }
        const {val} = parent;
        const val2 = child.val;
        m[val] = m[val] ?? [];
        m[val][val2] = 1;
        m[val2] = m[val2] ?? [];
        m[val2][val] = 1;
    };

    addEdge(root, root.left);
    addEdge(root, root.right);

    createMatrix(root.left, m);

    return createMatrix(root.right, m);
};


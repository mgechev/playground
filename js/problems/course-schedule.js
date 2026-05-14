// https://leetcode.com/problems/course-schedule

class Node {
    constructor(node) {
        this.id = node;
        this.children = {};
    }
}

const hasCycle = (node, path = {}, noCycle) => {
    if (noCycle[node.id]) return false;
    if (path[node.id]) {
        return true;
    }
    path[node.id] = true;
    for (const c of Object.keys(node.children)) {
        if (hasCycle(node.children[c], path, noCycle)) {
            return true;
        }
    }
    path[node.id] = false;
    return false;
};

function canFinish(numCourses, pre) {
    const nodes = [];
    for (const pair of pre) {
        let a = nodes[pair[0]];
        let b = nodes[pair[1]];
        if (!a) {
            nodes[pair[0]] = new Node(pair[0]);
        }
        if (!b) {
            nodes[pair[1]] = new Node(pair[1]);
        }
        a = nodes[pair[0]];
        b = nodes[pair[1]];
        a.children[b.id] = b;
    }
    let noCycle = [];
    for (const node of nodes) {
        if (!node) {
          continue;
        }
        if (hasCycle(node, {}, noCycle)) {
            return false;
        } else {
            noCycle[node.id] = true;
        }
    }
    return true;
};


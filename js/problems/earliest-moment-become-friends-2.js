/**
 * @param {number[][]} logs
 * @param {number} n
 * @return {number}
 */
const earliestAcq = (logs, n) => {
    logs.sort((a, b) => a[0] - b[0]);
    const graph = new Array(n).map((_, i) => i);
    for (let i = 0; i < logs.length; i++) {
        const [timestamp, a, b] = logs[i];
        connect(graph, a, b);
        if (allConnected(graph, n)) {
            return timestamp;
        }
    }
    return -1;
};

const connect = (graph, a, b) => {
    graph[a] = graph[a] ?? new Set();
    graph[b] = graph[b] ?? new Set();
    graph[a].add(b);
    graph[b].add(a);
    const joint = new Set([...graph[b], ...graph[a]]);
    for (const el of joint) {
        graph[el] = joint;
    }
};

const allConnected = (graph, n) => {
    for (const el of graph) {
        if (el && el.size === n) {
            return true;
        }
    }
    return false;
};


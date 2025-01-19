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
    graph[a].add(...graph[b]);
    graph[b].add(...graph[a]);
};

const allConnected = (graph, n) => {
    const visited = new Set();
    const stack = [0];
    while (stack.length) {
        const current = stack.pop();
        if (visited.has(current)) {
            continue;
        }
        visited.add(current);
        n--;
        stack.push(...(graph[current] ?? []));
    }
    return n === 0;
};


Infinity = float('inf')
graph = [[Infinity, 7,        9,        Infinity, Infinity, 16],
  [7,        Infinity, 10,       15,       Infinity, Infinity],
  [9,        10,       Infinity, 11,       Infinity, 2],
  [Infinity, 15,       11,       Infinity, 6,        Infinity],
  [Infinity, Infinity, Infinity, 6,        Infinity, 9],
  [16,       Infinity, 2,        Infinity, 9,        Infinity]];

# Dumb Dijkstra, without any optimizations
def dijkstra(graph, src, dest):
    queue = [src]
    dist = {}
    nodes = range(len(graph))
    for node in nodes:
        dist[node] = Infinity
    dist[src] = 0
    while len(queue):
        minDistance = Infinity
        currentNode = -1
        for node in queue:
            if dist[node] < minDistance:
                minDistance = dist[node]
                currentNode = node
        if currentNode == -1:
            return Infinity
        queue.remove(currentNode)
        for n in nodes:
            if dist[currentNode] + graph[currentNode][n] < dist[n]:
                if dist[n] == Infinity:
                    queue.append(n)
                dist[n] = dist[currentNode] + graph[currentNode][n]
    return dist[dest]

print(dijkstra(graph, 0, 2))

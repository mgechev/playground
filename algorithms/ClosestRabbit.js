/* global console */

// TopCoder http://community.topcoder.com/stat?c=problem_statement&pm=13366

// Gets array of all free cells
function getFreeCells(board) {
  'use strict';
  var res = [];
  for (var i = 0; i < board.length; i += 1) {
    for (var j = 0; j < board[i].length; j += 1) {
      if (board[i][j] === '.') {
        res.push([i, j]);
      }
    }
  }
  return res;
}

// Returns array, which contains all
// k-combinations of the elements of given array
var combinations = (function () {
  'use strict';
  var res = [];
  function combinations(arr, r, start, index, current) {
    if (index >= r) {
      res.push(current.slice());
      return;
    }
    for (var i = start; i < arr.length; i += 1) {
      current[index] = arr[i];
      combinations(arr, r, i + 1, index + 1, current);
    }
  }
  return function (arr, r) {
    res = [];
    combinations(arr, r, 0, 0, []);
    return res;
  };
}());

// Gets all combinations of free cells
function getAllCombinations(board, r) {
  'use strict';
  var freeCells = getFreeCells(board);
  return combinations(freeCells, r);
}

// Gets distance between two points - a and b
function getDistance(a, b) {
  'use strict';
  return Math.sqrt((a[0] - b[0]) * (a[0] - b[0]) +
  (a[1] - b[1]) * (a[1] - b[1]));
}

// Gets all neighbors of given cell
function getNeighbor(current, all) {
  'use strict';
  var closest = -1,
      minDistance = Infinity,
      col = Infinity, row = Infinity;
  for (var i = 0; i < all.length; i += 1) {
    var d = getDistance(current, all[i]);
    if (d < minDistance && d !== 0) {
      if ((minDistance !== d) ||
          (minDistance === d && all[i][0] < row) ||
          (minDistance === d && all[i][0] === row && all[i][1] < col)) {
        closest = i;
        minDistance = d;
        col = all[i][1];
        row = all[i][0];
      }
    }
  }
  return closest;
}

// Builds graph by creating a list of neighbors (in our case only one neighbor)
function buildGraph(current) {
  'use strict';
  var temp = [],
      graph = [];
  for (var i = 0; i < current.length; i += 1) {
    temp[i] = getNeighbor(current[i], current);
  }
  for (i = 0; i < current.length; i += 1) {
    graph[i] = [];
    for (var j = 0; j < current.length; j += 1) {
      graph[i][j] = 0;
      if (i === j) {
        graph[i][j] = 1;
      }
    }
  }
  for (i = 0; i < temp.length; i += 1) {
    graph[i][temp[i]] = 1;
    graph[temp[i]][i] = 1;
  }
  return graph;
}

// Depth-first search
function dfs(graph, i, visited) {
  'use strict';
  if (graph.length <= i ||
      visited[i]) {
    return;
  }
  visited[i] = true;
  for (var k = 0; k < graph.length; k += 1) {
    if (graph[i][k] && !visited[k]) {
      dfs(graph, k, visited);
    }
  }
}

// Counts the connected components
function getConnectedComponents(graph) {
  'use strict';
  var visited = [],
      components = 0;
  for (var i = 0; i < graph.length; i += 1) {
    visited[i] = false;
  }
  for (i = 0; i < graph.length; i += 1) {
    if (!visited[i]) {
      dfs(graph, i, visited);
      components += 1;
    }
  }
  return components;
}

// Gets the average of all connected components,
// considered all possible combinations
function getExpected(board, r) {
  'use strict';
  var combinations = getAllCombinations(board, r);
  return combinations.reduce(function (old, current) {
    return old + getConnectedComponents(buildGraph(current));
  }, 0) / combinations.length;
}

// console.log(getExpected(['.#.#.'], 2));
// console.log(getExpected(['..###.', '.###.#'], 4));
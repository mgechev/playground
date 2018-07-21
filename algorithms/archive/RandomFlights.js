/* global console */

// TopCoder http://community.topcoder.com/stat?c=problem_statement&pm=13342
// NOTE!!!!!
// The solution is wrong according to the exercise statement!
// For shortest distance here is used the minimum amount of
// edges requred to pass reaching the destination, instead of
// the Euclidian distance. For proper solution use Dijkstra's
// algorithm for shortest distance and after defining matrix
// which instead of '0' and '1's contains the weights of the
// edges (i.e. the euclidian distance between every two nodes).

function getNonConnectedNodes(to, matrix) {
  'use strict';
  var visited, result;

  // Drawback of this definition is the fact that the function
  // will be recreated each call of getNonConnectedNodes
  function pathExists(current, target, matrix) {
    if (target === current) {
      return true;
    }
    visited[current] = true;
    var result = false;
    for (var i = 0; i < matrix[current].length; i += 1) {
      if (current !== i && !visited[i] && matrix[i][current] === '1') {
        result = result || pathExists(i, target, matrix);
      }
    }
    return result;
  }
  result = [];
  for (var i = 0; i < matrix.length; i += 1) {
    visited = [];
    if (i !== to && !pathExists(i, to, matrix)) {
      result.push(i);
    }
  }
  return result;
}

var getPermutations = (function () {
  'use strict';
  var result;

  function swap(arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  function permutations(arr, idx) {
    if (idx === arr.length) {
      return result.push(arr.slice());
    }
    for (var i = idx; i < arr.length; i += 1) {
      swap(arr, idx, i);
      permutations(arr, i + 1);
      swap(arr, idx, i);
    }
  }

  return function (arr) {
    result = [];
    permutations(arr, 0);
    return result;
  };
}());

function addEdge(i, j, matrix) {
  'use strict';
  var temp = matrix[i].split('');
  temp[j] = '1';
  matrix[i] = temp.join('');
  temp = matrix[j].split('');
  temp[i] = '1';
  matrix[j] = temp.join('');
  return matrix;
}

function getShortestPath(matrix, from, to) {
  'use strict';
  var parent = [],
      visited = [],
      queue = [],
      path = [],
      c, pathFound = false;
  queue.push(from);
  while (queue.length && !pathFound) {
    c = queue.shift();
    if (c === to) {
      pathFound = true;
    } else {
      for (var i = 0; i < matrix[c].length; i += 1) {
        if (!visited[matrix[c][i]] && matrix[c][i] === '1') {
          parent[i] = c;
          queue.push(i);
        }
      }
    }
  }
  if (pathFound) {
    c = to;
    path.push(c);
    while (c !== from) {
      c = parent[c];
      path.push(c);
    }
  }
  return path;
}

function getPointDistance(x1, y1, x2, y2) {
  'use strict';
  return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
}

function getDistance(matrix, x, y) {
  'use strict';
  var path = getShortestPath(matrix, 0, 1),
      distance = 0;
  for (var i = path.length - 1; i > 0; i -= 1) {
    distance +=
      getPointDistance(x[path[i]], y[path[i]], x[path[i - 1]], y[path[i - 1]]);
  }
  return distance;
}

function makeConnected(matrix, p) {
  'use strict';
  var i = 0;
  while (getNonConnectedNodes(0, matrix).length && i < p.length) {
    addEdge(0, p[i], matrix);
    i += 1;
  }
  return matrix;
}

function expectedDistance(x, y, flights) {
  'use strict';
  var nodes = getNonConnectedNodes(0, flights),
      nodesPerm = getPermutations(nodes),
      distances = nodesPerm.map(function (p) {
        return getDistance(makeConnected(flights.slice(), p), x, y);
      });
  return distances.reduce(function (o, d) {
    return o + d;
  }, 0) / distances.length;
}

// console.log(expectedDistance([7, 10, 9], [1, 3, 3],
// ['000',
//  '001',
//  '010']
// ));
// 
// console.log(expectedDistance([4, 1, 5, 6, 6], [1, 5, 10, 3, 4],
// ['00110',
//  '00101',
//  '11000',
//  '10001',
//  '01010']
// ));
// 
// console.log(expectedDistance([97, 27, 20, 34, 30, 37, 65, 21, 74, 27, 84, 79, 15, 78, 16, 7, 11, 24], [1, 72, 20, 73, 58, 55, 45, 19, 48, 4, 33, 22, 25, 95, 100, 85, 65, 53],
// ['000000000000000100',
//  '001010000001000000',
//  '010010000000000000',
//  '000000000000100001',
//  '011000000001000000',
//  '000000001000000010',
//  '000000000000010000',
//  '000000000000000100',
//  '000001000100001010',
//  '000000001000000010',
//  '000000000000100000',
//  '010010000000000000',
//  '000100000010000001',
//  '000000100000000000',
//  '000000001000000010',
//  '100000010000000000',
//  '000001001100001000',
//  '000100000000100000']
// ));
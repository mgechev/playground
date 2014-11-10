// TopCoder http://community.topcoder.com/stat?c=problem_statement&pm=13497
function getSum(rowStart, colStart, rowEnd, colEnd, chocolate) {
  'use strict';
  var sum = 0;
  for (var i = rowStart; i < rowEnd; i += 1) {
    for (var j = colStart; j < colEnd; j += 1) {
      sum += parseInt(chocolate[i][j], 10);
    }
  }
  return sum;
}

function findSmallestValue(rF, rS, cF, cS, chocolate) {
  'use strict';
  var rows = [0, rF, rS, chocolate.length],
      cols = [0, cF, cS, chocolate[0].length],
      vals = [];
  for (var i = 0; i < rows.length - 1; i += 1) {
    for (var j = 0; j < cols.length - 1; j += 1) {
      vals.push(getSum(rows[i], cols[j], rows[i + 1], cols[j + 1], chocolate));
    }
  }
  return Math.min.apply(Math, vals);
}

function getBestForRowDivision(f, s, chocolate) {
  'use strict';
  var current = 0,
      max = -Infinity,
      colLen = chocolate[0].length;
  for (var i = 1; i < colLen; i += 1) {
    for (var j = i + 1; j < colLen - 1; j += 1) {
      current = findSmallestValue(f, s, i, j, chocolate);
      if (max < current) {
        max = current;
      }
    }
  }
  return max;
}

function findBest(chocolate) {
  'use strict';
  var current = 0,
      max = 0;
  for (var i = 1; i < chocolate.length; i += 1) {
    for (var j = i + 1; j < chocolate[0].length - 1; j += 1) {
      current = getBestForRowDivision(i, j, chocolate);
      if (max < current) {
        max = current;
      }
    }
  }
  return max;
}

// console.log(findBest(['9768',
// '6767',
// '5313']));
// 
//  console.log(findBest(['36753562',
//  '91270936',
//  '06261879',
//  '20237592',
//  '28973612',
//  '93194784']));
// 
//  console.log(findBest(['012',
// '345',
// '678']));
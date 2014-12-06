function knapsack(items, max) {
  'use strict';

  function calcPrice(items, extra) {
    return items.reduce(function (old, c) {
      return old + c[1];
    }, extra[1]);
  }

  function calcWeight(items, extra) {
    return items.reduce(function (old, c) {
      return old + c[0];
    }, extra[0]);
  }

  var result = [[]];
  for (var i = 1; i <= max; i += 1) {
    var maxPrice = -Infinity;
    for (var j = 0; j < i; j += 1) {
      for (var k = 0; k < items.length; k += 1) {
        if (calcWeight(result[j], items[k]) <= i &&
            calcPrice(result[j], items[k]) > maxPrice) {
          maxPrice = calcPrice(result[j], items[k]);
          result[i] = result[j].concat([items[k]]);
        }
      }
    }
  }
  return result[max];
}

// var items = [
//   [1, 2],
//   [2, 2],
//   [4, 10],
//   [12, 4]
// ];
// 
// console.log(knapsack(items, 15));


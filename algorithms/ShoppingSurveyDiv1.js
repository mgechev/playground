/* global console */
// Solution of http://community.topcoder.com/stat?c=problem_statement&pm=13455

var combinations = (function () {
  'use strict';
  var result = [];

  function combinations(arr, k, start, index, current) {
    if (index >= k) {
      result.push(current.slice());
      return;
    }
    for (var i = start; i < arr.length; i += 1) {
      current[index] = arr[i];
      combinations(arr, k, i + 1, index + 1, current);
    }
  }

  return function (arr, k) {
    result = [];
    combinations(arr, k, 0, 0, []);
    return result;
  };
}());

function getCombinationsForProduct(c, sales) {
  'use strict';
  var clients = [];
  for (var i = 0; i < c; i += 1) {
    clients.push(i);
  }
  return combinations(clients, sales);
}

function getBestShoppers(deals, K) {
  'use strict';
  var shoppers = [], current;
  for (var i = 0; i < deals.length; i += 1) {
    for (var j = 0; j < deals[i].length; j += 1) {
      current = deals[i][j];
      shoppers[current] = shoppers[current] || 0;
      shoppers[current] += 1;
    }
  }
  return shoppers.reduce(function (s, el) {
    if (el >= K) {
      s += 1;
    }
    return s;
  }, 0);
}

function getAllBestShoppers(deals, currentDeals, current, shoppers, K) {
  'use strict';
  if (deals.length <= current) {
    shoppers.push(getBestShoppers(currentDeals, K));
    return;
  }
  for (var i = 0; i < deals[current].length; i += 1) {
    currentDeals[current] = deals[current][i];
    getAllBestShoppers(deals, currentDeals, current + 1, shoppers, K);
  }
}


function minValue(N, K, s) {
  'use strict';
  var combinations = [];
  for (var i = 0; i < s.length; i += 1) {
    combinations.push(getCombinationsForProduct(N, s[i]));
  }
  var shoppers = [];
  getAllBestShoppers(combinations, [], 0, shoppers, K);
  return shoppers.reduce(function (min, current) {
    if (min > current) {
      return current;
    }
    return min;
  }, Infinity);
}

// console.log(minValue(10, 2, [1, 2, 3])); // 0
// console.log(minValue(5, 2,  [1, 2, 3])); // 1
// console.log(minValue(4, 4,  [4, 4, 4, 2])); // 2
// console.log(minValue(4, 2, [1, 2, 1, 1, 3, 1, 2, 2, 1, 2, 1])); // 2
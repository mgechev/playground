// Solution of http://community.topcoder.com/stat?c=problem_statement&pm=2402&rd=5009

function maxDonations(donations) {

  function neighbours(i, nodes, arrLen) {
    for (var k = 0; k < nodes.length; k += 1) {
      var j = nodes[k];
      if (Math.abs(i - j) === 1) {
        return true;
      }
      if (i === arrLen - 1 && j === 0) {
        return true;
      }
    }
    return false;
  }

  function sum(arr) {
    return arr.reduce(function (s, el) {
      return s + donations[el];
    }, 0);
  }
  var result = donations.map(function (el, idx) {
    return [idx];
  });
  var maxIdx = -1,
      maxSum = -Infinity;
  for (var i = 2; i < donations.length; i += 1) {
    maxIdx = -1;
    maxSum = -Infinity;
    for (var j = 0; j < i; j += 1) {
      if (!neighbours(i, result[j], donations.length)) {
        if (maxSum < sum(result[j])) {
          maxIdx = j;
          maxSum = sum(result[j]);
        }
      }
    }
    if (maxIdx > -1) {
      result[i] = result[maxIdx].concat(result[i]);
    }
  }
  var max = result.reduce(function (s, el) {
    if (sum(el) > s) {
      return sum(el);
    }
    return s;
  }, sum(result[0]));
  return max;
}

//var array = [94, 40, 49, 65, 21, 21, 106, 80, 92, 81, 679, 4, 61,
//  6, 237, 12, 72, 74, 29, 95, 265, 35, 47, 1, 61, 397,
//  52, 72, 37, 51, 1, 81, 45, 435, 7, 36, 57, 86, 81, 72];
//
//console.log(array);
//console.log(maxDonations(array));
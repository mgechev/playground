//Solution of http://community.topcoder.com/stat?c=problem_statement&pm=1918&rd=5006

function swap(i, j, array) {
  'use strict';
  var temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

function getOrdering(height, bloom, wilt) {
  'use strict';

  // Could be optimized with
  // insertion sort (quicksort not necessary)
  function sort() {
    var max,
        maxIdx;
    for (var i = 0; i < height.length; i += 1) {
      max = height[i];
      maxIdx = [i];
      for (var j = i + 1; j < height.length; j += 1) {
        if (max < height[j]) {
          maxIdx = j;
          max = height[j];
        }
      }
      swapTripple(i, maxIdx);
    }
  }

  function swapTripple(i, j) {
    swap(j, i, height);
    swap(j, i, bloom);
    swap(j, i, wilt);
  }

  sort();

  // i is always closer position
  function dependsOn(i, j) {
    if ((wilt[i] >= bloom[j] && wilt[i] <= wilt[j]) ||
        (bloom[i] >= bloom[j] && bloom[i] <= wilt[j]) ||
        (wilt[j] >= bloom[i] && wilt[j] <= wilt[i]) ||
        (bloom[j] >= bloom[i] && bloom[j] <= wilt[i])) {
      return true;
    }
    return false;
  }

  if (height.length < 2) {
    return height;
  }

  var result = [0];
  for (var i = 1; i < height.length; i += 1) {
    var dependsOnPos = -1;
    for (var j = 0; j < result.length; j += 1) {
      if (dependsOn(i, result[j])) {
        dependsOnPos = j;
        break;
      }
    }
    var newRes = [];
    for (var k = 0; k < result.length; k += 1) {
      if (k === dependsOnPos) {
        newRes.push(i);
      }
      newRes.push(result[k]);
    }
    if (dependsOnPos < 0) {
      newRes.push(i);
    }
    result = newRes;
  }
  return result.map(function (idx) {
    return height[idx];
  });
}

/*
{5, 4,   3,  2,  1}
{1, 5, 10, 15, 20}
{5,10,14, 20, 25}


{3,2,5,4}
{1,2,11,10}
{4,3,12,13}

*/
//console.log(getOrdering([5, 4, 3, 2, 1], [1, 5, 10, 15, 20], [5, 10, 14, 20, 25]));
//console.log(getOrdering([3, 2, 5, 4], [1, 2, 11, 10], [4, 3, 12, 13]));
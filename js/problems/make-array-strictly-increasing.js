// https://leetcode.com/problems/make-array-strictly-increasing/
// Brute force. Does not past tests above 10.
//
const makeArrayIncreasingHelper = (arr1, arr2, total = 0, startFrom = 0, replaceFrom = 0, memo = {}) => {
  if (startFrom >= arr1.length || replaceFrom >= arr2.length) {
    return increasing(arr1) ? total : Infinity;
  }
  let min = makeArrayIncreasingHelper(arr1, arr2, total, startFrom + 1, replaceFrom, memo);
  for (let i = replaceFrom; i < arr2.length; i++) {
    const temp = arr1[startFrom];
    if (arr1[startFrom - 1] !== undefined && arr2[i] <= arr1[startFrom - 1]) continue;
    arr1[startFrom] = arr2[i];
    min = Math.min(min, makeArrayIncreasingHelper(arr1, arr2, total + 1, startFrom + 1, i + 1, memo));
    arr1[startFrom] = temp;
  }
  memo[startFrom] = memo[startFrom] ?? [];
  memo[startFrom][replaceFrom] = min;
  return min;
};


const increasing = arr => {
  if (arr.length === 1) {
    return true;
  }
  if (arr.length === 2) {
    return arr[0] < arr[1];
  }
  for (let i = 1; i < arr.length - 1; i++) {
    if (arr[i - 1] >= arr[i] || arr[i] >= arr[i + 1]) {
      return false;
    }
  }
  return true;
};

const makeArrayIncreasing = (arr1, arr2) => {
    arr2.sort((a, b) => a - b);
    const result = makeArrayIncreasingHelper(arr1, arr2);
    if (Number.isFinite(result)) {
        return result;
    }
    return -1;
};



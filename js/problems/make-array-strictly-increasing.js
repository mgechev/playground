const binarySearch = (arr, val) => {
  let left = 0;
  let right = arr.length;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === val) {
      return mid;
    } else if (arr[mid] > val) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  return right;
};

const makeArrayIncreasingHelper = (arr1, arr2, total = 0, startFrom = 0, replaceFrom = 0, memo = {}) => {
  if (memo[startFrom] && memo[startFrom][replaceFrom] !== undefined) {
    return memo[startFrom][replaceFrom];
  }
  if (startFrom >= arr1.length || replaceFrom >= arr2.length) {
    return increasing(arr1) ? total : Infinity;
  }
  let min = makeArrayIncreasingHelper(arr1, arr2, total, startFrom + 1, replaceFrom === 0 && startFrom !== 0 ? binarySearch(arr2, arr1[startFrom]) : replaceFrom, memo);
  for (let i = replaceFrom; i < arr2.length; i++) {
    const temp = arr1[startFrom];
    if (arr1[startFrom - 1] !== undefined && arr2[i] <= arr1[startFrom - 1]) continue;
    arr1[startFrom] = arr2[i];
    min = Math.min(min, makeArrayIncreasingHelper(arr1, arr2, total + 1, startFrom + 1, i + 1, memo));
    arr1[startFrom] = temp;
  }
  memo[startFrom] = memo[startFrom] ?? [];
  if (Number.isFinite(min)) {
    memo[startFrom][replaceFrom] = min;
  }
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
    const set = new Set();
    for (const el of arr2) {
      set.add(el);
    }
    arr2 = [...set];
    arr2.sort((a, b) => a - b);
    const result = makeArrayIncreasingHelper(arr1, arr2);
    if (Number.isFinite(result)) {
        return result;
    }
    return -1;
};

console.log(makeArrayIncreasing([1,5,3,6,7], [1,3,2,4]));
//console.log(makeArrayIncreasing([9,18,3,8,21,6,7,2,7,28,23,16,33,2,25,14,15], [13,2,15,30,31,30,9,10,7,30,31,4,33,10,25,28,19,6,15,6,19,30,25,14,7,28,23,20,1,2,25,16]));


console.log(makeArrayIncreasing([15,10,25,4,19,30,21,0,7,10,25,20,11,6,21,32,7,10,25,20], [22,29,24,23,2,1,12,27,30,5,24,31,34,17,4,35,22,37,0]));


// https://leetcode.com/problems/make-array-strictly-increasing/

const binarySearch = (arr, val) => {
    let left = 0;
    let right = arr.length;
    while (left < right) {
        let mid = Math.floor((left + right) / 2);
        if (arr[mid] <= val) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return left;
};

const helper = (currentIdx, prev, arr1, arr2, memo) => {
    if (memo[currentIdx] && memo[currentIdx][prev]) {
        return memo[currentIdx][prev];
    }
    if (currentIdx >= arr1.length) {
        return 0;
    }

    let result = Infinity;
    if (arr1[currentIdx] > prev) {
        result = helper(currentIdx + 1, arr1[currentIdx], arr1, arr2, memo);
    }

    let idx = binarySearch(arr2, prev);
    if (idx < arr2.length) {
        result = Math.min(result, 1 + helper(currentIdx + 1, arr2[idx], arr1, arr2, memo));
    }

    memo[currentIdx] = memo[currentIdx] ?? {};
    memo[currentIdx][prev] = result;

    return result;
};

const makeArrayIncreasing = (arr1, arr2) => {
    const set = new Set(arr2);
    arr2 = [...set].sort((a, b) => a - b);
    const memo = [];

    const result = helper(0, -1, arr1, arr2, memo);

    return Number.isFinite(result) ? result : -1;
};


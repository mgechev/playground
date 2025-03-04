// https://leetcode.com/problems/maximum-length-of-repeated-subarray/
// Naive
const findLength = (nums1, nums2) => {
    let max = 0;
    for (let i = 0; i < nums1.length; i++) {
        for (let j = 0; j < nums2.length; j++) {
            if (nums1[i] === nums2[j]) {
                max = Math.max(max, lengthOfCommonSubsequence(nums1, nums2, i, j));
            }
        }
    }
    return max;
};

const lengthOfCommonSubsequence = (a, b, i, j) => {
    let length = 0;
    while (a[i + length] === b[j + length] && i + length < a.length && j + length < b.length) length++;
    return length;
};

// Recoursive DP
const findLength = (nums1, nums2, i = 0, j = 0, cache = {}) => {
    if (i >= nums1.length || j >= nums2.length) {
        return 0;
    }
    if (cache[i] && cache[i][j] !== undefined) {
        return cache[i][j];
    }
    let max = lengthOfCommonSubsequence(nums1, nums2, i, j);
    cache[i] = cache[i] || {};
    cache[i][j] = Math.max(
        max,
        findLength(nums1, nums2, i + 1, j + 1, cache),
        findLength(nums1, nums2, i + 1, j, cache),
        findLength(nums1, nums2, i, j + 1, cache),
    );
    return cache[i][j];
};

const lengthOfCommonSubsequence = (a, b, i, j) => {
    let length = 0;
    while (a[i + length] === b[j + length] && i + length < a.length && j + length < b.length) length++;
    return length;
};

// Iterative DP
const findLength = (nums1, nums2) => {
    const memo = new Array(nums1.length + 1).fill(0).map(() => new Array(nums2.length + 1).fill(0));
    for (let i = 1; i <= nums1.length; i++) {
        for (let j = 1; j <= nums2.length; j++) {
            if (nums1[i - 1] !== nums2[j - 1]) {
                continue;
            }
            memo[i][j] = 1 + memo[i - 1][j - 1];
        }
    }
    let max = 0;
    for (let i = 0; i < memo.length; i++) {
        for (let j = 0; j < memo[i].length; j++) {
            max = Math.max(max, memo[i][j]);
        }
    }
    return max;
};

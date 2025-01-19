// https://leetcode.com/problems/split-array-with-same-average/
/**
 * This solution only works with
 * small arrays since it's brute force.
 *
 * We'll have over 1b subproblems
 * with the problem constraints.
 */
const splitArraySameAverage = (nums, i = 0, a = [], b = []) => {
    if (i >= nums.length) {
        return average(a) === average(b);
    }
    return splitArraySameAverage(nums, i + 1, [...a, nums[i]], b) || splitArraySameAverage(nums, i + 1, a, [...b, nums[i]]);
};

const average = arr => {
    return arr.reduce((a, b) => a + b, 0) / arr.length;
};


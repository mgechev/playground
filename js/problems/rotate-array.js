// https://leetcode.com/problems/rotate-array/
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
const rotate = (nums, k) => {
    k %= nums.length;
    const result = nums.slice(nums.length - k, nums.length).concat(nums.slice(0, nums.length - k));
    for (let i = 0; i < nums.length; i++) {
        nums[i] = result[i];
    }
};


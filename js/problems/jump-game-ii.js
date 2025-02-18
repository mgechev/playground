// https://leetcode.com/problems/jump-game-ii/
const jump = (nums, start = 0, cache = {}) => {
    if (start >= nums.length - 1) {
        return cache[start] = 0;
    }
    if (cache[start]) {
        return cache[start];
    }
    let result = Infinity;
    for (let i = nums[start]; i > 0; i--) {
        result = Math.min(1 + jump(nums, start + i, cache), result);
    }
    return cache[start] = result;
};

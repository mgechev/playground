// https://leetcode.com/problems/jump-game/
const canJump = (nums, idx = 0, memo = {}) => {
    if (idx === nums.length - 1) {
        return true;
    }
    if (memo[idx] !== undefined) {
        return memo[idx];
    }
    const current = nums[idx];
    for (let i = current; i > 0; i--) {
        if (canJump(nums, i + idx, memo)) {
            return memo[idx] = true;
        }
    }
    return memo[idx] = false;
};


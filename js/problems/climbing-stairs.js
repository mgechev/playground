// https://leetcode.com/problems/climbing-stairs/

/**
 * @param {number} n
 * @return {number}
 */
const climbStairs = (n, memo = {}) => {
    if (memo[n]) {
        return memo[n];
    }
    if (n === 0) {
        return 0;
    }
    if (n === 1) {
        return 1;
    }
    if (n === 2) {
        return 2;
    }
    memo[n - 1] = climbStairs(n - 1, memo);
    memo[n - 2] = climbStairs(n - 2, memo);
    return memo[n - 1] + memo[n - 2];
};

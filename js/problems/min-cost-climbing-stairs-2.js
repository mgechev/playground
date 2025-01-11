// https://leetcode.com/problems/min-cost-climbing-stairs/
/**
 * @param {number[]} cost
 * @return {number}
 */
const minCostClimbingStairs = cost => {
    const {length} = cost;
    const memo = [];
    memo[length - 1] = cost[length - 1];
    memo[length - 2] = cost[length - 2];
    for (let i = length - 3; i >= 0; i--) {
        console.log(cost[i], Math.min(memo[i + 1], memo[i + 2]))
        memo[i] = cost[i] + Math.min(memo[i + 1], memo[i + 2]);
    }
    return Math.min(memo[0], memo[1]);
};

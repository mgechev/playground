// https://leetcode.com/problems/min-cost-climbing-stairs/
/**
 * @param {number[]} cost
 * @return {number}
 */
const calculate = (cost, n, memo) => {
    const {length} = cost;
    if (n === length - 1 || n === length - 2) {
        return cost[n];
    }
    const oneStep = cost[n] + calculate(cost, n + 1, memo);
    const twoStep = cost[n] + calculate(cost, n + 2, memo);
    memo[n + 1] = oneStep;
    memo[n + 2] = twoStep;
    return Math.min(oneStep, twoStep);
};

const minCostClimbingStairs = cost => {
    const memo = {};
    return Math.min(calculate(cost, 0, memo), calculate(cost, 1, memo));
};

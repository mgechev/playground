// https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/
/**
 * @param {number[]} prices
 * @return {number}
 */
const maxProfit = (prices, day = 0, profit = 0, cache = {}) => {
    if (day >= prices.length) {
        return profit;
    }
    if (cache[day] && cache[day][profit] !== undefined) {
        return cache[day][profit];
    }
    let max = profit;
    for (let i = day + 1; i < prices.length; i++) {
        if (prices[i] - prices[day] <= 0) {
            max = Math.max(max, profit, maxProfit(prices, i, profit, cache));
        } else {
            max = Math.max(max, profit, maxProfit(prices, i, profit + prices[i] - prices[day], cache));
        }
    }
    cache[day] = cache[day] || {};
    cache[day][profit] = max;
    return max;
};

// Optimal approach
const maxProfit2 = prices => {
    let max = 0;
    for (let i = 1; i < prices.length; i++) {
        if (prices[i] > prices[i - 1]) {
            max += prices[i] - prices[i - 1];
        }
    }
    return max;
};


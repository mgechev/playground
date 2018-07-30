// https://www.geeksforgeeks.org/maximum-profit-by-buying-and-selling-a-share-at-most-k-times/

const maximizeProfit = (arr, k, idx = 0, start = undefined, memo = {}) => {
  memo[idx] = memo[idx] || [];
  if (memo[idx][k] !== undefined && start !== undefined) {
    return memo[idx][k];
  }
  if (!k) return 0;
  if (idx >= arr.length) {
    return 0;
  }
  let total = 0;
  for (let i = idx; i < arr.length; i += 1) {
    let sum = 0;
    if (start === undefined) {
      sum = maximizeProfit(arr, k, i + 1, arr[i], memo);
    } else {
      sum = (arr[i] - start) + maximizeProfit(arr, k - 1, i + 1, undefined, memo);
    }
    total = Math.max(total, sum);
  }
  memo[idx][k] = total;
  return total;
};

console.log(maximizeProfit([10, 22, 5, 75, 65, 80], 2));
console.log(maximizeProfit([12, 14, 17, 10, 14, 13, 12, 15], 3));
console.log(maximizeProfit([100, 30, 15, 10, 8, 25, 80], 3));
console.log(maximizeProfit([90, 80, 70, 60, 50], 1));


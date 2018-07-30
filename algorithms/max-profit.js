// https://www.geeksforgeeks.org/maximum-profit-by-buying-and-selling-a-share-at-most-k-times/

const maximizeProfit = (arr, k, idx = 0, memo = {}) => {
  memo[idx] = memo[idx] || [];
  if (memo[idx][k] !== undefined) {
    return memo[idx][k];
  }
  if (!k) return 0;
  if (idx >= arr.length) {
    return 0;
  }
  let total = 0;
  for (let i = idx; i < arr.length - 1; i += 1) {
    let sum = 0;
    for (let j = i + 1; j < arr.length; j += 1) {
      sum = (arr[j] - arr[i]) + maximizeProfit(arr, k - 1, j + 1, memo);
      total = Math.max(total, sum);
    }
  }
  memo[idx][k] = total;
  return total;
};

console.log(maximizeProfit([10, 22, 5, 75, 65, 80], 2));
console.log(maximizeProfit([12, 14, 17, 10, 14, 13, 12, 15], 3));
console.log(maximizeProfit([100, 30, 15, 10, 8, 25, 80], 3));
console.log(maximizeProfit([90, 80, 70, 60, 50], 1));


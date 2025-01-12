// https://leetcode.com/problems/unique-paths/

const memo = [];

const factorial = n => {
  if (memo[n]) return memo[n];
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  memo[n] = result;
  return result;
};

const combinations = (m, n) => {
  return factorial(m) / (factorial(n) * factorial(m - n));
};

const uniquePaths = (m, n) => {
  return Math.round(combinations((m - 1 + n - 1), (n - 1)));
};

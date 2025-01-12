// https://leetcode.com/problems/unique-paths/
const uniquePaths = (m, n) => {
  if (n === 1 && m === 1) {
    return 1;
  }
  const memo = [];
  for (let i = 0; i <= m; i++) {
    memo[i] = new Array(n + 1).fill(0);
  }
  memo[0][0] = 0;
  memo[0][1] = 1;
  memo[1][0] = 1;
  memo[1][1] = 2;
  for (let i = 2; i <= m; i++) {
    for (let j = 2; j <= n; j++) {
        memo[i][j] = 1 + memo[i - 1][j] + memo[i][j - 1];
    }
  }
  return memo[m][n] + 1;
};

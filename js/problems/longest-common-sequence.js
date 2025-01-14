// https://leetcode.com/problems/longest-common-subsequence/
/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
const longestCommonSubsequence = (text1, text2) => {
    const memo = [];
    const n = text1.length;
    const m = text2.length;

    for (let i = 0; i <= n; i++) {
        memo.push(new Array(m + 1).fill(0));
    }

    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                memo[i][j] = memo[i - 1][j - 1] + 1;
            }
            memo[i][j] = Math.max(memo[i][j], memo[i - 1][j]);
            memo[i][j] = Math.max(memo[i][j], memo[i][j - 1]);
        }
    }
    return memo[n][m];
};

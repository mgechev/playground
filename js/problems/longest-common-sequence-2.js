// https://leetcode.com/problems/longest-common-subsequence/

/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
const longestCommonSubsequence = (text1, text2, n = 0, m = 0, memo = []) => {
    if (!memo[n]) {
        memo[n] = [];
    }
    if (memo[n][m] !== undefined) {
        return memo[n][m];
    }

    if (n >= text1.length || m >= text2.length) {
        return 0;
    }
    const toAdd = text1[n] === text2[m] ? 1 : 0;
    const result = [longestCommonSubsequence(text1, text2, n + 1, m + 1, memo)];
    if (!toAdd) {
        result.push(
            longestCommonSubsequence(text1, text2, n, m + 1, memo),
            longestCommonSubsequence(text1, text2, n + 1, m, memo),
        );
    }
    memo[n][m] = toAdd + Math.max(...result);
    return memo[n][m];
};

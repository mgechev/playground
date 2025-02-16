// https://leetcode.com/problems/unique-length-3-palindromic-subsequences/
const countPalindromicSubsequence = s => {
    const found = new Set();
    for (let i = 0; i < s.length - 2; i++) {
        for (let j = i + 1; j < s.length - 1; j++) {
            for (let k = j + 1; k < s.length; k++) {
                if (s[i] === s[k]) {
                    found.add(s[i] + s[j] + s[k]);
                }
            }
        }
    }
    return found.size;
};
// https://leetcode.com/problems/unique-length-3-palindromic-subsequences/
const countPalindromicSubsequence = s => {
    const map = {};
    for (let i = 0; i < s.length; i++) {
        map[s[i]] = map[s[i]] ?? { total: 0, start: i, end: i };
        map[s[i]].total++;
        map[s[i]].end = i;
    }
    let total = 0;
    for (let key in map) {
        const item = map[key];
        const unique = new Set();
        for (let i = item.start + 1; i < item.end; i++) {
            unique.add(s[i]);
        }
        total += unique.size;
    }
    return total;
};

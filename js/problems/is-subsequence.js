// https://leetcode.com/problems/is-subsequence/
const isSubsequence = (s, t) => {
    if (s === '' && t === '') return true;
    let c = 0;
    for (let i = 0; i < t.length; i++) {
        if (t[i] === s[c]) {
            c++;
        }
        if (c >= s.length) {
            return true;
        }
    }
    return false;
};

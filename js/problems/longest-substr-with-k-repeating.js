// https://leetcode.com/problems/longest-substring-with-at-least-k-repeating-characters/
// Naive solution
const longestSubstring = (s, k) => {
    let max = -Infinity;
    for (let i = 0; i < s.length - 1; i++) {
        for (let j = i + 1; j < s.length; j++) {
            const substr = s.substring(i, j);
            const freq = {};
            for (let k = 0; k < substr.length; k++) {
                freq[substr[k]] = (freq[substr[k]] || 0) + 1;
            }
            let success = true;
            for (let l in freq) {
                if (freq[l] < k) {
                    success = false;
                }
            }
            if (success) {
                max = Math.max(max, substr.length);
            }
        }
    }
    return max;
};

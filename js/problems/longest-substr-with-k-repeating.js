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

// Working solution
const longestSubstring = (s, k) => {
    if (s.length === 0) {
        return 0;
    }
    const freq = {};
    for (let i = 0; i < s.length; i++) {
        freq[s[i]] = freq[s[i]] || [];
        freq[s[i]].push(i);
    }
    let split = [-1, s.length];
    let totalLess = 0;
    for (const c in freq) {
        if (freq[c].length < k) {
            split = split.concat(freq[c])
            totalLess++;
        }
    }
    if (totalLess >= Object.keys(freq).length) {
        return 0;
    }
    if (totalLess === 0) {
        return s.length;
    }
    split.sort((a, b) => a - b);
    let max = 0;
    for (let i = 0; i < split.length - 1; i++) {
        const length = longestSubstring(s.substring(split[i] + 1, split[i + 1]), k);
        max = Math.max(length, max);
    }
    return max;
};


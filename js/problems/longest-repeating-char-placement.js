// https://leetcode.com/problems/longest-repeating-character-replacement/
const characterReplacement = (s, k) => {
    let left = 0;
    let right = 1;
    let max = 0;
    while (true) {
        while (right < s.length && s[left] === s[right]) {
            right++;
        }
        max = Math.max(max, findMaxExtension(s, left, right - 1, k));
        if (right >= s.length) {
            break;
        }
        left = right;
        right = left + 1;
    }
    return max;
};

const findMaxExtension = (s, left, right, k, char, extra) => {
    if (k < 0) {
        return -Infinity;
    }
    if (left === 0 && right === s.length - 1) {
        return right - left + 1;
    }
    if (left < 0 || right >= s.length) {
        return -Infinity;
    }
    if (k === 0) {
        while (s[left] === s[right]) right++;
        right--;
        while (s[left] === s[right]) left--;
        left++;
        return right - left + 1;
    }
    let results = [];
    if (left - 1 >= 0 && s[left - 1] !== s[right]) {
        const ns = s.split('');
        ns[left - 1] = s[right];
        results.push(findMaxExtension(ns.join(''), left - 1, right, k - 1));
    }
    if (left - 1 >= 0 && s[left - 1] === s[right]) {
        results.push(findMaxExtension(s, left - 1, right, k));
    }
    if (right + 1 <= s.length - 1 && s[left] !== s[right + 1]) {
        const ns = s.split('');
        ns[right + 1] = s[left];
        results.push(findMaxExtension(ns.join(''), left, right + 1, k - 1));
    }
    if (right + 1 <= s.length - 1 && s[left] === s[right + 1]) {
        results.push(findMaxExtension(s, left, right + 1, k));
    }
    return Math.max(...results);
};


const characterReplacement = (s, k) => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    let max = 0;
    for (const letter of letters) {
        let left = 0;
        let right = 0;
        let replaced = 0;
        while (right < s.length) {
            if (s[right] === letter) {
                right++;
            } else if (replaced < k) {
                replaced++;
                right++;
            } else if (s[left] === letter) {
                left++;
            } else {
                left++;
                replaced--;
            }
            max = Math.max(max, right - left);
        }
    }
    return max;
};


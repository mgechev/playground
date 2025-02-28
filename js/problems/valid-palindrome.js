// https://leetcode.com/problems/valid-palindrome/
const isPalindrome = s => {
    s = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    for (let i = 0; i < Math.floor(s.length / 2); i++) {
        if (s[i] !== s[s.length - 1 - i]) {
            return false;
        }
    }
    return true;
};

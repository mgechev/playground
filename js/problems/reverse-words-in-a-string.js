// https://leetcode.com/problems/reverse-words-in-a-string/
const reverseWords = s => s.split(' ').filter(s => s.trim().length > 0).reverse().join(' ');
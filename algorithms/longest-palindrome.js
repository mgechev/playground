// https://leetcode.com/problems/longest-palindromic-substring/description/

const longestPalindrome = (str, s = 0, e = str.length, m = {}) => {
  m[s] = m[s] || [];
  if (!str.length) {
    return '';
  }
  if (m[s][e]) {
    return m[s][e];
  }
  if (s + 1 >= e) {
    return str[s];
  }
  let pal = true;
  for (let i = s; i <= Math.floor((e - s) / 2) && pal; i += 1) {
    if (str[i] !== str[s + e - i - 1]) {
      pal = false;
    }
  }
  if (pal) {
    return str.substring(s, e);
  }
  let max = '';
  for (let i = e - 1; i >= s; i -= 1) {
    const c = longestPalindrome(str, s, i, m);
    if (max.length < c.length) {
      max = c;
    }
  }
  const next = longestPalindrome(str, s + 1, e, m);
  const res = next.length > max.length ? next : max;
  m[s][e] = res;
  return res;
};

console.log(longestPalindrome('babad'));
console.log(longestPalindrome('cbbd'));
console.log(longestPalindrome('bb'));
console.log(longestPalindrome('abb'));

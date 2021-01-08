// https://leetcode.com/problems/roman-to-integer/

const map = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000
};

const seq = {
  IV: 4,
  IX: 9,
  XL: 40,
  XC: 90,
  CD: 400,
  CM: 900
};

/**
 * @param {string} s
 * @return {number}
 */
const romanToInt = s => {
  let result = 0;
  for (let i = 0; i < s.length; i++) {
    let current = s[i];
    if (i < s.length - 1) {
      current = s.substr(i, 2);
    }
    if (seq[current]) {
      i++;
    }
    result += seq[current] || map[current[0]];
  }
  return result;
};


/**
 * @param {string} s
 * @return {number}
 */

const max = Math.pow(2, 31) - 1;
const min = -Math.pow(2, 31);

const num = c => c.charCodeAt(0) >= 48 && c.charCodeAt(0) <= 57;
const space = c => c === ' ';
const op = c => c === '-' || c === '+';
const cr = c => !num(c) && !space(c) && !op(c);

const myAtoi = s => {
  let idx = 0;
  let inNum = false;
  let length = -1;
  let startIdx = -1;
  let sign = 1;
  while (idx < s.length) {
    const char = s[idx];
    if (cr(char)) break;
    if (!num(char) && inNum) break;
    if ((op(char) && !inNum) || num(char)) {
      if (op(char)) {
        sign = char === '-' ? -1 : 1;
      }
      inNum = true;
      if (!op(char)) {
        length++;
      }
      if (!op(char) && startIdx === -1) {
        startIdx = idx;
      }
    }
    idx++;
  }
  if (length === -1 || startIdx === -1) {
    return 0;
  }
  let endIdx = idx;
  idx = startIdx;
  inNum = false;
  let res = 0;
  while (idx < endIdx) {
    const char = s[idx];
    if (cr(char)) break;
    if (!num(char) && inNum) break;
    if (op(char) && !inNum) {
      inNum = true;
    }
    if (num(char)) {
      inNum = true;
      res += Math.pow(10, length) * ~~char;
      length--;
    }
    idx++;
  }
  res *= sign;
  if (res > max) return max;
  if (res < min) return min;
  return res;
};

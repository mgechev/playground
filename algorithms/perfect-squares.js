// https://leetcode.com/problems/perfect-squares/description/

const numSquares = n => {
  if (n <= 0) return 0;
  const c = [0];
  for (let i = 1; i <= n; i += 1) {
    c[i] = Infinity;
  }
  for (let i = 1; i <= n; i += 1) {
    for (let j = 1; j * j <= i; j += 1) {
      c[i] = Math.min(c[i], c[i - (j * j)] + 1);
    }
  }
  return c[n];
};

console.log(numSquares(32));
console.log(numSquares(1));
console.log(numSquares(2));
console.log(numSquares(46));


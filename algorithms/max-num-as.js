// https://www.geeksforgeeks.org/how-to-print-maximum-number-of-a-using-given-four-keys/

const maxNumAs = (n, m = 0, c = 0) => {
  if (n <= 0) {
    return m;
  }
  return Math.max(
    maxNumAs(n - 1, m + 1, c),
    maxNumAs(n - 2, m, m),
    maxNumAs(n - 1, m + c, c)
  );
};

console.log(maxNumAs(3));
console.log(maxNumAs(7));
console.log(maxNumAs(11));


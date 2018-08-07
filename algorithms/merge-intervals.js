// https://leetcode.com/problems/merge-intervals/description/

const merge = intr => {
  intr.sort((a, b) => a[0] - b[0]);
  for (let i = 0; i < intr.length - 1; i += 1) {
    const f = intr[i];
    const s = intr[i + 1];
    if ((f[1] >= s[0] && f[1] <= s[1]) ||
        (s[1] >= f[0] && s[1] <= f[1])) {
      const n = [f[0], Math.max(f[1], s[1])];
      intr[i + 1] = n;
      intr.splice(i, 1);
    }
  }
  return intr;
};

console.log(merge([[1,3],[2,6],[8,10],[15,18]]));
console.log(merge([[1,4],[4,5]]));


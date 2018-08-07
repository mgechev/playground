// https://leetcode.com/problems/merge-intervals/description/

const merge = intr => {
  intr = intr.sort((a, b) => a.start - b.start);
  for (let i = 0; i < intr.length - 1; i += 1) {
    const f = intr[i];
    const s = intr[i + 1];
    if ((f.end >= s.start && f.end <= s.end) ||
        (s.end >= f.start && s.end <= f.end)) {
      const n = [f.start, Math.max(f.end, s.end)];
      intr[i + 1] = n;
      intr.splice(i, 1);
    }
  }
  return intr;
};

console.log(merge([[1,3],[2,6],[8,10],[15,18]]));
console.log(merge([[1,3],[2,6],[8,10],[15,18]]));
console.log(merge([[1,4],[4,5]]));


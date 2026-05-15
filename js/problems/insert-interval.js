// https://leetcode.com/problems/insert-interval/

const search = (is, i) => {
    let left = 0;
    let right = is.length;
    while (left < right) {
        let mid = Math.floor((left + right) / 2);
        let e = is[mid];
        if (e[0] === i[0]) {
            return mid;
        } else if (e[0] < i[0]) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return left;
};

const insert = (intervals, newInterval) => {
  let idx = search(intervals, newInterval);
  while (idx < intervals.length && intervals[idx][0] < newInterval[0]) {
    idx++;
  }
  intervals.splice(idx, 0, newInterval);
  for (let i = 0; i < intervals.length - 1; i++) {
    const a = intervals[i];
    const b = intervals[i + 1];
    if (a[1] >= b[0]) {
      const r = [Math.min(a[0], b[0]), Math.max(a[1], b[1])];
      intervals[i] = r;
      intervals.splice(i + 1, 1);
      i--;
    }
  }
  return intervals;
};

console.log(insert([[1,2],[3,5],[6,7],[8,10],[12,16]], [4,8]));



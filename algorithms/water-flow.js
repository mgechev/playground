const a = [3, 1, 2, 2, 4, 1, 2];
const b = [10, 1, 2, 2, 4, 1, 2];
const c = [10, 1, 3];

const waterFlow = a => {
  if (a.length <= 2) {
    return 0;
  }
  let total = [];
  for (let i = 0; i < a.length - 2; i += 1) {
    let s = a[i];
    for (let j = i + 2; j < a.length; j += 1) {
      let e = a[j];
      for (let k = i + 1; k <= j; k += 1) {
        total[k] = total[k] || 0;
        total[k] = Math.max(total[k], Math.max(0, Math.min(s, e) - a[k]));
      }
    }
  }
  return total.reduce((a, c) => {
    c = c || 0;
    return a + c;
  }, 0);
};

const trapWater = a => {
  if (a.length <= 2) {
    return 0;
  }
  let index = [];
  for (let i = 0; i < a.length; i += 1) {
    index[i] = [];
    for (let j = i + 1; j < a.length; j += 1) {
      if (a[i] < a[j]) {
        index[i].push(j);
      }
    }
  }
  for (let i = 0; i < index.length; i += 1) {
    index[i] = index[i].reduce(Math.max(a, c));
  }
  let left = 0;
  let right = 0;
  let result = 0;
  while (right < a.length) {
    if (a[left] === 0) {
      a[left] += 1;
    }
    if (a[right] === 0) {
      a[right] += 1;
    }
    if (right - left <= 1) {
      right += 1;
    }
    if (a[left] > a[right]) {
      right += 1;
    }
  }
};

console.log(waterFlow(a));
console.log(waterFlow(b));
console.log(waterFlow(c));


/**
 * Problem from Pearls of Functional Algorithm Design
 *
 * Find the maximum surpasser number. A surpasser of
 * an array element is an element on the right
 * of the array, which value is bigger.
 */

const arr = 'GENERATING'.split('').map(e => e.charCodeAt(0));

/********************************************************************/
// This is an imperative O(n^2) solution of the problem.
const msc1 = (arr: number[]) => {
  let max = -Infinity;
  for (let i = 0; i < arr.length - 1; i++) {
    let total = 0;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] > arr[i]) {
        total++;
      }
    }
    max = Math.max(max, total);
  }
  return max;
};

console.log(msc1(arr.slice()));
/********************************************************************/




/********************************************************************/
// This is an O(n log n) solution if we assume that
// Array.prototype.splice is an O(1) operation.
const binarySearch = (a: number, arr: number[]) => {
  let low = 0;
  let high = arr.length;
  while (low < high) {
    let mid = low + Math.floor((high - low) / 2);
    if (arr[mid] === a) {
      return mid;
    } else if (arr[mid] > a) {
      high = mid;
    } else {
      low = mid + 1;
    }
  }
  return low;
};

const msc2 = (arr: number[]) => {
  if (arr.length <= 1) {
    return 0;
  }
  let max = -Infinity;
  const memo: number[] = [];
  for (let i = arr.length - 2; i >= 0; i--) {
    const el = arr[i];
    let position = binarySearch(el, memo);
    if (memo[position] > el) {
      memo.splice(position, 0, el);
    } else if (memo[position] === undefined) {
      memo[position] = el;
    } else if (memo[position] === el) {
      memo.splice(position, 0, el);
      while (memo[position] === el) {
        position++;
      }
    }
    max = Math.max(max, memo.length - position);
  }
  return max;
};

console.log(msc2(arr.slice()));



/********************************************************************/
// A more functional approach which produces the
// result for O(n log n). This solution is described
// in Pearls of Functional Algorithm Design.
import { length } from './utils';

const msc3 = (arr: number[]) => {
  const table = (arr: number[]): [number, number][] => {
    if (arr.length === 1) {
      return [[arr[0], 0]];
    }
    const m = length(arr);
    const n = Math.floor(m / 2);
    const ys = arr.slice(0, n);
    const zs = arr.slice(n);
    return join(m - n, table(ys), table(zs));
  };

  const join = (n: number, txs: [number, number][], tys: [number, number][]):  [number, number][] => {
    if (n === 0) {
      return txs;
    }
    if (txs.length === 0) {
      return tys;
    }
    const headTs = txs[0];
    const headTy = tys[0];
    const x = headTs[0];
    const c = headTs[1];
    const y = headTy[0];
    const d = headTy[1];
    if (x < y) {
      return [[x, c + n]].concat(join(n, txs.slice(1), tys)) as [number, number][];
    }
    return [[y, d]].concat(join(n - 1, txs, tys.slice(1))) as [number, number][];
  };

  let result = -Infinity;
  for (const row of table(arr)) {
    result = Math.max(result, row[1]);
  }
  return result;
};

console.log(msc3(arr.slice()));

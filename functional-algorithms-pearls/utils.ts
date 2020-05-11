export const range = (start: number, end: number) => {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
};

export const head = (list: number[]) => list[0];

export const difference = (l1: number[], l2: number[]) => {
  const result = [];
  for (let i = 0; i < l1.length; i++) {
    let found = false;
    for (let j = 0; j < l2.length; j++) {
      if (l1[i] === l2[j]) {
        found = true;
      }
    }
    if (!found) {
      result.push(l1[i]);
    }
  }
  return result;
};

export const compose = (...fns: any[]) => {
  return function (arg: any) {
    for (let i = fns.length - 1; i >= 0; i--) {
      arg = fns[i].apply(null, [arg]);
    }
    return arg;
  };
};

export const id = <T>(el: T) => el;

export const takeWhile = <T>(predicate: (el: T) => boolean, list: T[]) => {
  const result: T[] = [];
  for (const el of list) {
    if (predicate(el)) {
      result.push(el);
    } else {
      break;
    }
  }
  return result;
};

export const length = <T>(list: T[]) => list.length;

export const curry = (fn: any) => {
  let totalArgs = fn.length;
  const args: any[] = [];
  function curried(arg: any) {
    totalArgs--;
    args.push(arg);
    if (totalArgs === 0) {
      return fn.apply(null, args);
    }
    return curried;
  };
  return curried;
};

export const zip = <T, V>(l1: T[], l2: V[]) => {
  const result: [T, V][] = [];
  const minLen = Math.min(l1.length, l2.length);
  for (let i = 0; i < minLen; i++) {
    result.push([l1[i], l2[i]]);
  }
  return result;
};

export const repeat = <T>(val: T, times: number) => {
  const result: T[] = [];
  for (let i = 0; i < times; i++) {
    result.push(val);
  }
  return result;
};

export const filter = <T>(predicate: (arg: T) => boolean, list: T[]) => list.filter(predicate);

// See http://zvon.org/other/haskell/Outputarray/accumArray_f.html
type Entry<T> = [number, T];
type Array<T> = Entry<T>[];

export const accumArray = <T, V>(fn: (a: T, b: V) => V, s: V, range: [number, number], arr: Array<T>) => {
  const min = Math.min.apply(null, range);
  const max = Math.max.apply(null, range);
  const subarray = filter(([idx, _]: Entry<T>) => idx >= min && idx <= max, arr);
  const accum: V[] = [];
  for (const entry of subarray) {
    if (accum[entry[0]] === undefined) {
      accum[entry[0]] = fn(entry[1], s);
      continue;
    }
    accum[entry[0]] = fn(entry[1], accum[entry[0]]);
  }
  const result: Array<V> = [];
  for (let i = min; i < max; i++) {
    if (accum[i] !== undefined) {
      result.push([i, accum[i]]);
    } else {
      result.push([i, s]);
    }
  }
  return result;
};

export const map = <T, V>(arr: T[], fn: (a: T) => V): V[] => arr.map(fn);

export const partition = <T>(arr: T[], predicate: (e: T) => boolean): [T[], T[]] => {
  const us = [];
  const vs = [];
  for (const el of arr) {
    if (predicate(el)) {
      us.push(el);
    } else {
      vs.push(el);
    }
  }
  return [us, vs];
};

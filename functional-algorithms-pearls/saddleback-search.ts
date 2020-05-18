const arr = [
  [11, 21, 31, 41, 51],
  [12, 22, 32, 42, 52],
  [13, 23, 33, 43, 53],
  [14, 24, 34, 44, 54],
  [15, 25, 35, 45, 55],
];

const imperative = (arr: number[][], el: number) => {
  if (arr.length === 0) {
    return undefined;
  }
  const pos = { x: 0, y: arr[0].length - 1 };
  while (pos.x < arr.length && pos.y >= 0) {
    const current = arr[pos.x][pos.y];
    if (current === el) {
      return pos;
    } else if (current > el) {
      pos.y--;
    } else {
      pos.x++;
    }
  }
  return undefined;
};

console.log(imperative(arr, 11));
console.log(imperative(arr, 22));
console.log(imperative(arr, 23));
console.log(imperative(arr, 55));
console.log(imperative(arr, 14));
console.log(imperative(arr, 54));
console.log(imperative(arr, 51));
console.log(imperative(arr, 55));
console.log(imperative(arr, 56));

const imperativeImproved = (arr: number[][], el: number) => {
  const binarySearch = (getElement:(i: number) => number, length: number) => {
    let min = 0;
    let max = length;
    while (min < max) {
      const mid = min + Math.floor((max - min) / 2);
      if (getElement(mid) === el) {
        return mid;
      } else if (getElement(mid) > el) {
        max = mid;
      } else {
        min = mid + 1;
      }
    }
    return max - 1;
  };

  const m = binarySearch(i => arr[i][0], arr.length);
  const n = binarySearch(i => arr[0][i], arr[0].length);

  const pos = { x: m, y: 0 };
  while (pos.x >= 0 && pos.y <= n) {
    const current = arr[pos.x][pos.y];
    if (current === el) {
      return pos;
    } else if (current > el) {
      pos.x--;
    } else {
      pos.y++;
    }
  }
  return undefined;
};


console.log(imperativeImproved(arr, 11));
console.log(imperativeImproved(arr, 22));
console.log(imperativeImproved(arr, 23));
console.log(imperativeImproved(arr, 55));
console.log(imperativeImproved(arr, 14));
console.log(imperativeImproved(arr, 54));
console.log(imperativeImproved(arr, 51));
console.log(imperativeImproved(arr, 55));
console.log(imperativeImproved(arr, 56));

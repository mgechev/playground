const arr = [
  [11, 21, 31, 41, 51],
  [12, 22, 32, 42, 52],
  [13, 23, 33, 43, 53],
  [14, 24, 34, 44, 54],
  [15, 25, 35, 45, 55],
];

const imperative = (arr: number[][], el: number) => {
  const pos = { x: 0, y: arr.length - 1 };
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

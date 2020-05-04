/**
 * Problem from Pearls of Functional Algorithm Design
 *
 * The smallest free number
 *
 * Given a list of natural numbers (order not guaranteed), find the first smallest
 * number which is not part of the list.
 */

const arr = [8, 23, 9, 0, 12, 11, 1, 10, 13, 7, 41, 4, 14, 21, 5, 17, 3, 19, 2, 6];

/********************************************************************/
// Imperative solution with complexity O(n log n)
const imperativeSolution1 = (arr: number[]) => {
  arr.sort((a, b) => a - b);
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > i) {
      return i;
    }
  }
  return -1;
};

console.log(imperativeSolution1(arr.slice()));
/********************************************************************/




import { range, head, difference, length } from './utils';

/********************************************************************/
// Functional solution with complexity O(n^2)
const functionalSolution1 = (arr: number[]) => head(difference(range(0, length(arr) + 1), arr));

console.log(functionalSolution1(arr.slice()));
/********************************************************************/




/********************************************************************/
// Functional solution with complexity O(n^2)
import { takeWhile, map, id, compose, curry, zip, repeat, filter, accumArray } from './utils';

const search = (arr: boolean[]) => compose(length, curry(takeWhile)(id))(arr);

const checklist = (arr: number[]) =>
  map(
    accumArray(
      (el, ex) => el || ex,
      false,
      [0, length(arr)],
      zip(
        filter((a) => a <= arr.length, arr),
        repeat(true, length(arr))
      )
    ),
    (e) => e[1]
  );

const functionalSolution2 = (arr: number[]) => compose(search, checklist)(arr);
console.log(functionalSolution2(arr.slice()));

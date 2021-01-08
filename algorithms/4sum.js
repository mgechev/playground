// https://leetcode.com/problems/4sum/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
const fourSum = (nums, target) => {
  const doubles = {};
  for (let i = 0; i < nums.length - 1; i++) {
     for (let j = i + 1; j < nums.length; j++) {
       const sum = nums[i] + nums[j];
       doubles[sum] = doubles[sum] || [];
       doubles[sum].push(new Set([i, j]));
     }
  }
  const result = [];
  const dupes = new Set();
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      const sum = nums[i] + nums[j];
      const res = doubles[target - sum] || [];
      for (const set of res) {
        if (set && !set.has(i) && !set.has(j)) {
          const sorted = [...set, i, j].map(i => nums[i]).sort((a, b) => a - b);
          const key = sorted.join('*');
          if (!dupes.has(key)) {
            result.push(sorted);
            dupes.add(key);
          }
        }
      }
    }
  }
  return result;
};

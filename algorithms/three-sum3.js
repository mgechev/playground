// https://leetcode.com/problems/3sum-closest/submissions/
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const threeSumClosest = (nums, target) => {
  let closest = Infinity;
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      for (let k = j + 1; k < nums.length; k++) {
        const sum = nums[i] + nums[j] + nums[k];
        if (Math.abs(closest - target) > Math.abs(sum - target)) {
          closest = sum;
        }
      }
    }
  }
  return closest;
};

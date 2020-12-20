// https://leetcode.com/problems/3sum-closest/
/**
 * Suboptimal
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

/**
 * Optimal
 */
const threeSumClosest = (nums, target) => {
  let closest = Infinity;
  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length; i++) {
    let low = i + 1;
    let high = nums.length - 1;
    while (low < high) {
      const sum = nums[i] + nums[low] + nums[high];
      if (Math.abs(sum - target) < Math.abs(closest - target)) {
        closest = sum;
      }
      if (sum - target === 0) {
        return sum;
      } else if (sum > target) {
        high--;
      } else {
        low++;
      }
    }
  }
  return closest;
};

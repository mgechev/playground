// https://leetcode.com/problems/single-number-ii/description/

const singleNumber = nums => {
  const count = {};
  for (let i = 0; i < nums.length; i += 1) {
    count[nums[i]] = count[nums[i]] || 0;
    count[nums[i]]++;
  }
  for (let i = 0; i < nums.length; i += 1) {
    if (count[nums[i]] === 1) {
      return nums[i];
    }
  }
  return -1;
};

console.log(singleNumber([0, 1, 0, 1, 0, 1, 99]));

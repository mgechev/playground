// https://leetcode.com/problems/minimum-size-subarray-sum/
const minSubArrayLen = (target, nums) => {
    let left = 0;
    let right = 1;
    let currentSum = nums[left];
    let minLength = nums.length + 1;
    while (right <= nums.length) {
        if (currentSum >= target) {
            while (currentSum >= target && left < right) {
                minLength = Math.min(minLength, right - left);
                currentSum -= nums[left];
                left++;
            }
        } else {
            currentSum += nums[right];
            right++;
        }
    }
    if (minLength === nums.length + 1) {
        return 0;
    }
    return minLength;
};

console.log(minSubArrayLen(15, [1, 2, 3, 4, 5]));
console.log(minSubArrayLen(7, [2,3,1,2,4,3]));


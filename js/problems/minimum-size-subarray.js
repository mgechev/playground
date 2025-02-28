// https://leetcode.com/problems/minimum-size-subarray-sum/
const minSubArrayLen = (target, nums, start = 0) => {
    let left = 0;
    let currentSum = 0;
    let minLength = 0;
    for (let right = 0; right < nums.length; right++) {
        currentSum += nums[right];
        while (currentSum >= target) {
            if (minLength === 0 || minLength > right - left + 1) {
                minLength = right - left + 1;
            }
            currentSum -= nums[left];
            left++;
        }
    }
    return minLength;
};

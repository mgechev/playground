// https://leetcode.com/problems/subarray-product-less-than-k/
const numSubarrayProductLessThanK = (nums, k) => {
    let left = 0;
    let right = 0;
    let current = nums[left];
    let result = 0;
    while (left < nums.length) {
        if (current >= k || right >= nums.length) {
            left++;
            if (left >= nums.length) {
                break;
            }
            right = left;
            current = nums[left];
        } else {
            result++;
            right++;
            current *= nums[right];
        }
    }
    return result;
};


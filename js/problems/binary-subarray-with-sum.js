// https://leetcode.com/problems/binary-subarrays-with-sum/
// Naive
const numSubarraysWithSum = (nums, goal) => {
    let left = 0;
    let right = 0;
    let sum = 0;
    let result = 0;

    while (left < nums.length) {
        sum += nums[right];
        right++;

        if (sum === goal) {
            result++;
        }

        if (right >= nums.length) {
            left++;
            right = left;
            sum = 0;
        }
    }

    return result;
};

// Map
const numSubarraysWithSum = (nums, goal) => {
    let count = {};
    count[0] = 1;
    let currentSum = 0;
    let result = 0;

    for (const num of nums) {
        currentSum += num;
        if (count[currentSum - goal] !== undefined) {
            result += count[currentSum - goal];
        }
        count[currentSum] = (count[currentSum] || 0) + 1;
    }
    return result;
};

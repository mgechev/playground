// https://leetcode.com/problems/split-array-with-same-average/
// Another naive implementation
// that's faster because it uses
// sums instead of averages.
const splitArraySameAverage = (nums, i = 0, a = 0, aTotal = 0, b = 0, bTotal = 0) => {
    if (i >= nums.length - 1) {
        return (aTotal === 0 || bTotal === 0) ? false : a / aTotal === b / bTotal;
    }
    return splitArraySameAverage(nums, i + 1, a + nums[i], aTotal + 1, b, bTotal) || splitArraySameAverage(nums, i + 1, a, aTotal, b + nums[i], bTotal + 1);
};


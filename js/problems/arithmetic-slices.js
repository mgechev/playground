// https://leetcode.com/problems/arithmetic-slices/
const numberOfArithmeticSlices = nums => {
    let total = 0;
    let i = 0;
    while (i < nums.length - 2) {
        let j = i + 1;
        let diff = nums[i] - nums[j];
        while (nums[j - 1] - nums[j] === diff) {
            j++;
            if (j - i >= 3) {
                total++;
            }
        }
        i++;
    }
    return total;
};

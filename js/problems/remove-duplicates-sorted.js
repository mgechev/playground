// https://leetcode.com/problems/remove-duplicates-from-sorted-array/

const removeDuplicates = nums => {
    for (let i = 0; i < nums.length - 1; i++) {
        const num = nums[i];
        let j = i + 1;
        while (num === nums[j] && j < nums.length) {
            nums.splice(j, 1);
        }
    }
    return nums.length;
};

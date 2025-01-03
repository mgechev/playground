// https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/
/**
 * @param {number[]} nums
 * @return {number}
 */
const removeDuplicates = nums => {
    let k = 0;
    let removed = 0;
    for (let i = 0; i < nums.length;) {
        let current = nums[i];
        let idx = i;
        while (idx < nums.length - removed && current === nums[idx]) idx++;
        let reps = idx - i;
        let finalReps = Math.min(2, reps);
        removed += reps - finalReps;
        k += finalReps;
        let insertionIdx = i + finalReps;
        for (let j = idx; j < nums.length; j++) {
            nums[insertionIdx++] = nums[j];
        }
        i = i + finalReps;
        if (i >= nums.length - removed) {
            break;
        }
    }
    return k;
};


/**
 * @param {number[]} nums
 * @return {number}
 */
const removeDuplicates2 = nums => {
    let i = 1;
    let count = 1;
    let j = 1;
    while (j < nums.length) {
        if (nums[j] === nums[j - 1]) {
            count++;
        } else {
            count = 1;
        }

        if (count <= 2) {
            nums[i++] = nums[j];
        }
        j++;
    }
    return i;
};

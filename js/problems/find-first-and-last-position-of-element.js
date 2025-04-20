// https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/
const findFirstOccurence = (nums, target) => {
    let start = 0;
    let end = nums.length;
    let found = false;
    while (start < end) {
        let mid = Math.floor((start + end) / 2);
        if (nums[mid] === target && nums[mid - 1] !== target) {
            return mid;
        } else if (nums[mid] === target && nums[mid - 1] === target) {
            end = mid;
        } else if (nums[mid] > target) {
            end = mid;
        } else {
            start = mid + 1;
        }
    }
    return -1;
};

const findLastOccurence = (nums, target) => {
    let start = 0;
    let end = nums.length;
    let found = false;
    while (start < end) {
        let mid = Math.floor((start + end) / 2);
        if (nums[mid] === target && nums[mid + 1] !== target) {
            return mid;
        } else if (nums[mid] === target && nums[mid + 1] === target) {
            start = mid + 1;
        } else if (nums[mid] > target) {
            end = mid;
        } else {
            start = mid + 1;
        }
    }
    return -1;
};

const searchRange = (nums, target) => {
    const firstIdx = findFirstOccurence(nums, target);
    if (firstIdx === -1) {
        return [-1, -1];
    }
    const lastIdx = findLastOccurence(nums, target);
    return [firstIdx, lastIdx];
};

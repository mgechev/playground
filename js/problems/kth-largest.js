const findKthLargest = (nums, k, i = 0, j = nums.length) => {
    if (k >= j || k < 0) {
      return undefined;
    }
    const pivotIdx = partition(nums, i, j);
    if (pivotIdx === k) {
        return nums[pivotIdx];
    }
    if (pivotIdx > k) {
        return findKthLargest(nums, k, i, pivotIdx);
    } else {
        return findKthLargest(nums, k, pivotIdx + 1, j);
    }
};

const partition = (nums, i, j) => {
    let pivotIdx = j - 1;
    let pivot = nums[pivotIdx];
    for (let k = i; k < j; k++) {
        const current = nums[k];
        if (current > pivot && pivotIdx > k) {
            nums.splice(k, 1);
            nums.push(current);
            console.log(nums);
            pivotIdx--;
        }
        if (current < pivot && pivotIdx < k) {
            nums.splice(k, 1);
            nums.unshift(current);
            pivotIdx++;
        }
    }
    return pivotIdx;
};

console.log(findKthLargest([4, 2, 1], 0));
//console.log(findKthLargest([4, 2, 5, 1, 7], 4));
//console.log(findKthLargest([4, 2, 5, 1, 7], 3));
//console.log(findKthLargest([4, 2, 5, 1, 7], 2));
//console.log(findKthLargest([4, 2, 5, 1, 7], 1));
//console.log(findKthLargest([4, 2, 5, 1, 7], 0));

//console.log(findKthLargest([1, 7, 3], 0));
//console.log(findKthLargest([7, 1], 1));

//[1, 2, 4, 5, 7]

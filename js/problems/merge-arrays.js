// https://leetcode.com/problems/merge-sorted-array/

const merge = (nums1, m, nums2, n) => {
    let k = 0;
    for (let i = 0; i < n; i++) {
        while (nums1[k] <= nums2[i] && k < m + i) {
            k++;
        }
        for (let j = m + i - 1; j >= k; j--) {
            nums1[j + 1] = nums1[j];
        }
        nums1[k] = nums2[i];
        k++;
    }
    return nums1;
};

console.log(merge([1,2,3,0,0,0], 3, [2,5,6], 3));
console.log(merge([0], 0, [1], 1));

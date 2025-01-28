// https://leetcode.com/problems/maximum-beauty-of-an-array-after-applying-operation/
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const maximumBeauty = (nums, k) => {
    if (k === 0) {
        const all = [];
        let max = 0;
        for (let i = 0; i < nums.length; i++) {
            const n = nums[i];
            all[n] = all[n] ?? 0;
            all[n]++;
            max = Math.max(max, all[n]);
        }
        return max;
    }
    const catalog = [];
    for (let i = 0; i < nums.length; i++) {
        const n = nums[i];
        catalog[n] = catalog[n] ?? 0;
        catalog[n]++;
        catalog[n + 2 * k + 1] = catalog[n + 2 * k + 1] ?? 0;
        catalog[n + 2 * k + 1]--;
    }

    let result = 0;
    let sum = 0;
    for (let i = 0; i < catalog.length; i++) {
        const v = catalog[i];
        if (v !== undefined) {
            sum += v;
        }
        result = Math.max(result, sum);
    }
    return result;
};

// https://leetcode.com/problems/make-lexicographically-smallest-array-by-swapping-elements/
const lexicographicallySmallestArray = (nums, limit) => {
    const groups = [];
    const groupsMap = {};
    const sorted = nums.slice().sort((a, b) => a - b);
    for (let i = 0; i < sorted.length; i++) {
        const group = groups.at(-1);
        if (!group) {
            groups.push([sorted[i]]);
            groupsMap[sorted[i]] = groups.at(-1);
            continue;
        }
        const belongs = Math.abs(group.at(-1) - sorted[i]) <= limit;
        if (belongs) {
            group.push(sorted[i]);
            groupsMap[sorted[i]] = group;
        } else {
            groups.push([sorted[i]]);
            groupsMap[sorted[i]] = groups.at(-1);
        }
    }

    const result = [];

    for (let i = 0; i < nums.length; i++) {
        const group = groupsMap[nums[i]];
        result.push(group.shift());
    }

    return result;
};

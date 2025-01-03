// https://leetcode.com/problems/non-overlapping-intervals/
/**
 * @param {number[][]} intervals
 * @return {number}
 */
const eraseOverlapIntervals = intervals => {
    intervals.sort((a, b) => {
        if (a[1] === b[1]) {
            return a[0] - b[0];
        }
        return a[1] - b[1];
    });

    let current = intervals[0];
    let overlapping = 0;
    for (let i = 1; i < intervals.length; i++) {
        if (current[1] > intervals[i][0]) {
            overlapping++;
        } else {
            current = intervals[i];
        }
    }
    return overlapping;
};

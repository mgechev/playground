// https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/
/**
 * @param {number[][]} points
 * @return {number}
 */
const findMinArrowShots = points => {
    points.sort((a, b) => {
        if (a[1] === b[1]) {
            return a[0] - b[0];
        }
        return a[1] - b[1];
    });

    let current = points[0];
    let arrows = 1;
    for (let i = 1; i < points.length; i++) {
        if (points[i][0] <= current[1]) {
            continue;
        }
        current = points[i];
        arrows += 1;
    }
    return arrows;
};

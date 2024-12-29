// https://leetcode.com/problems/count-positions-on-street-with-required-brightness/

/**
 * @param {number} n
 * @param {number[][]} lights
 * @param {number[]} requirement
 * @return {number}
 */
const meetRequirement = (n, lights, requirement) => {
    const ranges = [];
    for (const [position, range] of lights) {
        ranges.push([Math.max(0, position - range), Math.min(n - 1, position + range)]);
    }

    const overlaps = [];
    for (const [start, end] of ranges) {
        overlaps[start] = (overlaps[start] ?? 0) + 1;
        overlaps[end + 1] = (overlaps[end + 1] ?? 0) - 1;
    }

    let current = 0;
    let result = 0;
    for (let i = 0; i < requirement.length; i++) {
        if (overlaps[i] !== undefined) {
            current += overlaps[i];
        }
        if (current >= requirement[i]) {
            result++;
        }
    }

    return result;
};


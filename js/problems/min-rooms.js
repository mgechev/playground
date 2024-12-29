// https://leetcode.com/problems/meeting-rooms-ii/
/**
 * @param {number[][]} intervals
 * @return {number}
 */
const minMeetingRooms = (intervals) => {
    const line = [];
    for (const [start, end] of intervals) {
        line[start] = (line[start] ?? 0) + 1
        line[end] = (line[end] ?? 0) - 1
    }
 
    let maxOverlap = 0;
    let currentOverlap = 0;

    for (const point of line) {
        if (point === undefined) {
            continue;
        }
        currentOverlap += point;
        if (maxOverlap < currentOverlap) {
            maxOverlap = currentOverlap;
        }
    }

    return maxOverlap;
};


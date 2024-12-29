/**
 * @param {number[][]} intervals
 * @param {number} k
 * @return {number}
 */
const minConnectedGroups = (intervals, k) => {
    intervals.sort((a, b) => {
        if (a[0] !== b[0]) {
            return a[0] - b[0];
        }
        return a[1] - b[1];
    });

    const merged = [intervals[0].slice()];
    for (const [start, end] of intervals) {
        if (start <= merged.at(-1)[1]) {
            merged[merged.length - 1][1] = Math.max(merged.at(-1)[1], end);
        } else {
            merged.push([start, end]);
        }
    }

    if (merged.length <= 1) {
        return 1;
    }

    let result = Infinity;
    for (let i = 0; i < merged.length - 1; i++) {
        let groups = i + 1;
        let total = k;
        let end = merged[i][1];
        for (let j = i + 1; j < merged.length; j++) {
            const start = merged[j][0];
            total = k - (start - end);
            if (total < 0) {
                groups += merged.length - j;
                j = merged.length;
            }
        }
        result = Math.min(result, groups);
    }
    return result;
};


//console.log(minConnectedGroups([ [ 11, 13 ], [ 14, 16 ], [ 17, 19 ] ], 4));
//console.log(minConnectedGroups([[1,3],[15,16],[11,16],[10,15],[14,18],[7,9],[4,5]], 3));
//console.log(minConnectedGroups([[12,17],[20,20],[7,7],[6,11],[17,19],[12,17],[4,5],[3,7],[8,10],[15,15]], 5));
console.log(minConnectedGroups([[16,20],[7,11],[9,9],[10,13],[7,7],[8,11],[12,16],[18,20],[8,9],[7,10]], 5));

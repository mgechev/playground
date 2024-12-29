// https://leetcode.com/problems/maximum-population-year/
//
/**
 * @param {number[][]} logs
 * @return {number}
 */
const maximumPopulation = (logs) => {
    let journal = [];
    for (const [start, end] of logs) {
        journal[start] = (journal[start] ?? 0) + 1;
        journal[end] = (journal[end] ?? 0) - 1;
    }

    let answer = 0;
    let count = 0;
    let max = 0;

    for (let i = 1950; i < journal.length; i++) {
        if (journal[i] === undefined) {
            continue;
        }
        count += journal[i];
        if (count > max) {
            max = count;
            answer = i;
        }
    }
    return answer;
};


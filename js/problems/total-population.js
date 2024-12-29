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


// Slower version
/**
 * @param {number[][]} logs
 * @return {number}
 */
const maximumPopulation2 = (logs) => {
    let min = 1950;
    let max = 2050;

    let maxPopulation = -Infinity;
    let maxYear = 1950;
    for (let i = min; i < max; i++) {
        let total = 0;
        for (const [start, end] of logs) {
            if (i >= start && i < end) {
                total++;
            }
        }
        if (maxPopulation < total) {
            maxYear = i;
            maxPopulation = total;
        }
    }
    return maxYear;
};

// https://leetcode.com/problems/count-and-say
/**
 * @param {number} n
 * @return {string}
 */
const countAndSay = (n, rl = '1') => {
    if (n === 1) {
        return rl;
    }
    rl = runLength(rl);
    return countAndSay(n - 1, rl);
};

// 1211
// 1112
const runLength = str => {
    let output = '';
    for (let i = 0; i < str.length;) {
        let current = str[i];
        let total = 0;
        do {
            i++;
            total++;
        } while (i < str.length && current === str[i]);
        output += total.toString() + current;
    }
    return output;
};

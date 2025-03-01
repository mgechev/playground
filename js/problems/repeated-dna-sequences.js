// https://leetcode.com/problems/repeated-dna-sequences/
// Naive
const exists = (sub, s, skip) => {
    for (let i = 0; i < s.length - 9; i++) {
        if (i === skip) {
            continue;
        }
        if (sub === s.substring(i, i + 10)) {
            return true;
        }
    }
    return false;
};

const findRepeatedDnaSequences = s => {
    const result = new Set();
    for (let i = 0; i < s.length - 9; i++) {
        const sub = s.substring(i, i + 10);
        if (exists(sub, s, i)) {
            result.add(sub);
        }
    }
    return Array.from(result);
};

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


// Naive optimized
const findRepeatedDnaSequences2 = s => {
    let left = 0;
    let right = left + 1;
    let leftBak = 0;
    let start = -1;
    const result = new Set();
    while (left < s.length - 1) {
        right = left + 1;
        let foundMatch = false;
        for (let i = right; i < s.length - 9 && !foundMatch; i++) {
            if (s[left] === s[i]) {
                let ri = i;
                let li = left;
                while (s[ri] === s[li] && ri - i < 10 && ri < s.length) {
                    ri++;
                    li++;
                }
                if (ri - i >= 10) {
                    result.add(s.substring(i, i + 10));
                    foundMatch = true;
                }
            }
        }
        left++;
    }
    return Array.from(result);
};

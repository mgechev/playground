/**
 * @param {string} s
 * @return {string}
 */
const reorganizeString = s => {
    const charFreq = getCharacterFrequency(s);
    let result = '';
    let maxHeap = Object.keys(charFreq).map(key => [charFreq[key], key]).sort((a, b) => {
        return b[0] - a[0];
    });
    while (maxHeap.length >= 2) {
        let first = maxHeap.shift();
        let second = maxHeap.shift();
        result += first[1] + second[1];

        if (first[0] - 1 > 0) {
            first[0]--;
            maxHeap.push(first);
        }
        if (second[0] - 1 > 0) {
            second[0]--;
            maxHeap.push(second);
        }
        maxHeap.sort((a, b) => b[0] - a[0]);
    }

    if (maxHeap.length > 0) {
        const first = maxHeap.shift();
        if (first[0] > 1) {
            return '';
        }
        result += first[1];
    }

    return result;
};

const getCharacterFrequency = str => {
    const map = {};
    for (let c of str) {
        map[c] = map[c] ?? 0;
        map[c]++;
    }
    return map;
};

// abcaad
// abacad
/*

abc
aba
single_character_reps > Math.ceil(str.length / 2)
return '';
{
    a: 3,
    b: 1,
    c: 1,
    d: 1
}

*/
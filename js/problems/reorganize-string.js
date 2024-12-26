// https://leetcode.com/problems/reorganize-string/
//
/**
 * @param {string} s
 * @return {string}
 */
const reorganizeString = s => {
    const charFreq = getCharacterFrequency(s);
    let result = '';
    let current = null;
    for (let i = 0; i < s.length; i++) {
        const frequent = pickMostFrequentDifferentThan(charFreq, current);
        if (frequent === null) {
            return '';
        }
        current = frequent;
        result += current;
        charFreq[current]--;
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

const pickMostFrequentDifferentThan = (map, s) => {
    let mostCommon = null;
    let mostCommonReps = -1;
    for (let key in map) {
        if (mostCommonReps < map[key] && map[key] > 0 && key !== s) {
            mostCommon = key;
            mostCommonReps = map[key];
        }
    }
    return mostCommon;
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
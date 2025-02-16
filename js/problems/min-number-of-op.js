// https://leetcode.com/problems/minimum-number-of-operations-to-move-all-balls-to-each-box/
/**
 * @param {string} boxes
 * @return {number[]}
 */
const minOperations = boxes => {
    const result = new Array(boxes.length).fill(0);
    for (let i = 0; i < boxes.length; i++) {
        for (let j = 0; j < boxes.length; j++) {
            if (boxes[j] === '1') {
                result[i] += Math.abs(i - j);
            }
        }
    }
    return result;
};

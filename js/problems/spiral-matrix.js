// https://leetcode.com/problems/spiral-matrix/
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
const spiralOrder = matrix => {
    const result = [];
    let padding = 0;
    let totalItems = matrix.length * matrix[0].length;
    let inserted = new Set();
    while (result.length < totalItems) {
        for (let i = padding; i < matrix[padding].length - padding; i++) {
            !inserted.has(`${padding}, ${i}`) && result.push(matrix[padding][i]);
            inserted.add(`${padding}, ${i}`);
        }
        for (let i = padding + 1; i < matrix.length - padding; i++) {
            !inserted.has(`${i}, ${matrix[i].length - 1 - padding}`) && result.push(matrix[i][matrix[i].length - 1 - padding]);
            inserted.add(`${i}, ${matrix[i].length - 1 - padding}`);
        }
        // Index here is a bit off so I added the set to prevent duplicate
        for (let i = matrix[0].length - 2 - padding; i >= padding; i--) {
            !inserted.has(`${matrix.length - 1 - padding}, ${i}`) && result.push(matrix[matrix.length - 1 - padding][i]);
            inserted.add(`${matrix.length - 1 - padding}, ${i}`);
        }
        for (let i = matrix.length - 1 - padding - 1; i >= padding + 1; i--) {
            !inserted.has(`${i}, ${padding}`) && result.push(matrix[i][padding]);
            inserted.add(`${i}, ${padding}`);
        }
        padding++;
    }
    return result;
};

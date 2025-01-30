// https://leetcode.com/problems/maximal-square/
// Still exceeds the max time limit
/**
 * @param {character[][]} matrix
 * @return {number}
 */
const maximalSquare = matrix => {
    let result = -Infinity;
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            result = Math.max(result, maxSquareAt(i, j, matrix, result));
        }
    }
    return result;
};

const maxSquareAt = (i, j, matrix, maxSoFar) => {
    if (i < 0 || j < 0 || i >= matrix.length || j >= matrix[i].length || matrix[i][j] === '0') {
        return 0;
    }
    let maxSide = Math.min(matrix.length - i, matrix[i].length - j);

    if (maxSoFar > maxSide * maxSide) {
        return maxSoFar;
    }
    
    while (maxSide >= 0 && maxSide * maxSide > maxSoFar) {
        let foundZero = false;
        for (let a = i; a < i + maxSide && !foundZero; a++) {
            for (let b = j; b < j + maxSide && !foundZero; b++) {
                if (matrix[a][b] === '0') {
                    foundZero = true;
                }
            }
        }

        if (!foundZero) {
            return maxSide * maxSide;
        }

        maxSide--;
    }

    return maxSide * maxSide;
};

// https://leetcode.com/problems/largest-1-bordered-square/
/**
 * @param {number[][]} grid
 * @return {number}
 */
const largest1BorderedSquare = grid => {
    let max = -Infinity;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            max = Math.max(max, maxAt(i, j, grid));
        }
    }
    return max;
};

const maxAt = (i, j, grid) => {
    let maxSide = Math.min(grid.length - i, grid[i].length - j);
    for (let s = maxSide; s > 0; s--) {
        if (isBorder(i, j, s, grid)) {
            return s * s;
        }
    }
    return 0;
};

const isBorder = (x, y, s, grid) => {
    for (let i = x; i < x + s; i++) {
        if (grid[i][y] !== 1 || grid[i][y + s - 1] !== 1) {
            return false;
        }
    }
    for (let j = y; j < y + s; j++) {
        if (grid[x][j] !== 1 || grid[x + s - 1][j] !== 1) {
            return false;
        }
    }
    return true;
};

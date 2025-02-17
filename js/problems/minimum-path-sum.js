// https://leetcode.com/problems/minimum-path-sum/
const minPathSum = function(grid) {
    let memo = [];
    for (let i = 0; i < grid.length; i++) {
        memo.push(new Array(grid[i].length).fill(0));
    }
    memo[0][0] = grid[0][0];

    for (let i = 1; i < grid.length; i++) {
        memo[i][0] = memo[i - 1][0] + grid[i][0];
    }

    for (let i = 1; i < grid[0].length; i++) {
        memo[0][i] = memo[0][i - 1] + grid[0][i];
    }

    for (let i = 1; i < grid.length; i++) {
        for (let j = 1; j < grid[i].length; j++) {
            memo[i][j] = grid[i][j] + Math.min(
                memo[i][j - 1],
                memo[i - 1][j],
            );
        }
    }

    return memo.at(-1).at(-1);
};

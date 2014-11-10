// TopCoder http://community.topcoder.com/stat?c=problem_statement&pm=13506&rd=16080

var Colors = {
  WHITE: '.',
  BLACK: '#'
};

function hasPath(board) {
  function hasPathHelper(board, i, j) {
    if (i < 0 || i > 1 || j < 0 || j >= board[0].length || board[i][j] !== Colors.WHITE) {
      return false;
    }
    if (board[i][j] === Colors.WHITE && board[0].length - 1 === j) {
      return true;
    }
    setCell(board, i, j, Colors.BLACK);
    return hasPathHelper(board, i + 1, j) || hasPathHelper(board, i, j + 1) || hasPathHelper(board, i - 1, j);
  }
  return hasPathHelper(board.slice(), 0, 0) || hasPathHelper(board.slice(), 1, 0);
}

function setCell(board, i, j, color) {
  var temp = board[i].split('');
  temp[j] = color;
  board[i] = temp.join('');
}

function getMaxMoves(board, i, j) {
  if (board[i][j] !== Colors.WHITE || !hasPath(board)) {
    return 0;
  }
  setCell(board, i, j, Colors.BLACK);
  var max = -Infinity,
      current = 0;
  for (var k = 0; k < board.length; k += 1) {
    for (var u = 0; u < board[0].length; u += 1) {
      current = getMaxMoves(board, k, u);
      if (current > max) {
        max = current;
      }
    }
  }
  max += 1;
  setCell(board, i, j, Colors.WHITE);
  return max;
}

function calc(board) {
  var max = -Infinity, current;
  for (var i = 0; i < board.length; i += 1) {
    for (var j = 0; j < board[0].length; j += 1) {
      current = getMaxMoves(board, i, j);
      if (current > max) {
        max = current;
      }
    }
  }
  return max - 1;
}

console.log(calc(['#....',
                  '...#.']));

console.log(calc(['.',
                  '.']));

console.log(calc(['....#.##.....#...........',
                  '..#......#.......#..#....']));
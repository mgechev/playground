// https://www.geeksforgeeks.org/bresenhams-line-generation-algorithm/

// Also you can avoid floating point arithmetics.
const arr = [[0,0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0,0]];


const draw = (c, x, y, d) => c[x][y] = d;

const drawLine = (canvas, s, e) => {
  const dx = Math.abs(s[0] - e[0]);
  const dy = Math.abs(s[1] - e[1]);
  const cx = s[0] > e[0] ? -1 : 1;
  const cy = s[1] > e[1] ? -1 : 1;
  let err = dx - dy;
  let x1 = s[0];
  let y1 = s[1];
  while (x1 !== e[0] || y1 !== e[1]) {
    draw(canvas, x1, y1, 1);
    const dbl = err + err;
    if (dbl > -dy) {
      err -= dy;
      x1 += cx;
    }
    if (dbl < dx) {
      err += dx;
      y1 += cy;
    }
  }
  draw(canvas, e[0], e[1], 1);
};

drawLine(arr, [1, 4], [9, 6]);
console.log(arr.map(r => r.join(' ')).join('\n'));


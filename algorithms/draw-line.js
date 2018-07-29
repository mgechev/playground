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
  let minX = Math.min(s[0], e[0]);
  let minY = Math.min(s[1], e[1]);
  let maxX = Math.max(s[0], e[0]);
  let maxY = Math.max(s[1], e[1]);
  let diffX = maxX - minX;
  let diffY = maxY - minY;
  let mX = (maxX >= maxY) ? 1 : maxX / maxY;
  let mY = (maxY >= maxX) ? 1 : maxY / maxX;
  let currentX = minX;
  let currentY = minY;
  while (true) {
    draw(canvas, Math.floor(currentX), Math.floor(currentY), 1);
    currentX += mX;
    currentY += mY;
    if (currentX >= maxX || currentY >= maxY) break;
  }
  draw(canvas, maxX, maxY, 1);
};

drawLine(arr, [2, 2], [9, 6]);
console.log(arr.map(r => r.join(' ')).join('\n'));


var inputs = readline().split(" ");
const W = parseInt(inputs[0]); // width of the building.
const H = parseInt(inputs[1]); // height of the building.
const N = parseInt(readline()); // maximum number of turns before game over.
var inputs = readline().split(" ");
const X0 = parseInt(inputs[0]);
const Y0 = parseInt(inputs[1]);

function getLocation(min, max, dir) {
  const mid = Math.floor((max + min) / 2);
  if (dir > 0) {
    return [mid, max];
  } else if (dir < 0) {
    return [min, mid];
  } else {
    return [min, max];
  }
}

function getMid(c) {
  return Math.floor((c[0] + c[1]) / 2);
}

// game loop
let x = [0, W];
let y = [0, H];
let first = true;

while (true) {
  const bombDir = readline(); // the direction of the bombs from batman's current location (U, UR, R, DR, D, DL, L or UL)
  const vx = bombDir.includes("R") ? 1 : bombDir.includes("L") ? -1 : 0;
  const vy = bombDir.includes("D") ? 1 : bombDir.includes("U") ? -1 : 0;

  if (!first) {
    let _x = getLocation(x[0], x[1], vx);
    let _y = getLocation(y[0], y[1], vy);
    x = _x;
    y = _y;
  }
  first = false;
  console.error(x, y);
  console.log(`${getMid(x)} ${getMid(y)}`);
}

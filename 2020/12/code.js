const fs = require("fs");

const instructions = fs
  .readFileSync("./input.txt")
  .toString("utf-8")
  .trim()
  .split("\n")
  .map((line) => [line.substr(0, 1), parseInt(line.substr(1))]);

const moveVecs = [
  [1, 1],
  [-1, 1],
  [-1, -1],
  [1, -1],
];

const ret = instructions.reduce(
  ([x, y, wayPoint], [cmd, val]) => {
    let idx = (val / 90) % moveVecs.length;
    switch (cmd) {
      case "F":
        x += wayPoint[0] * val;
        y += wayPoint[1] * val;
        break;
      case "R":
        if (idx === 0) {
          wayPoint = [wayPoint[0], wayPoint[1]];
        } else if (idx === 1) {
          wayPoint = [wayPoint[1], -wayPoint[0]];
        } else if (idx === 2) {
          wayPoint = [-wayPoint[0], -wayPoint[1]];
        } else if (idx === 3) {
          wayPoint = [-wayPoint[1], wayPoint[0]];
        }
        break;
      case "L":
        if (idx < 0) {
          idx = moveVecs.length - Math.abs(idx);
        }
        if (idx === 0) {
          wayPoint = [wayPoint[0], wayPoint[1]];
        } else if (idx === 1) {
          wayPoint = [-wayPoint[1], wayPoint[0]];
        } else if (idx === 2) {
          wayPoint = [-wayPoint[0], -wayPoint[1]];
        } else if (idx === 3) {
          wayPoint = [wayPoint[1], -wayPoint[0]];
        }
        break;
      case "N":
        wayPoint = [wayPoint[0], wayPoint[1] + val];
        break;
      case "E":
        wayPoint = [wayPoint[0] + val, wayPoint[1]];
        break;
      case "S":
        wayPoint = [wayPoint[0], wayPoint[1] - val];
        break;
      case "W":
        wayPoint = [wayPoint[0] - val, wayPoint[1]];
        break;
    }
    return [x, y, wayPoint];
  },
  [0, 0, [10, 1]]
);

console.log(Math.abs(ret[0]) + Math.abs(ret[1]));

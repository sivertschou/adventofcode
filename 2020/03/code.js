const fs = require("fs");

const lines = fs
  .readFileSync("./input.txt")
  .toString("utf-8")
  .split("\n")
  .map((row) => row.split(""));

// console.log("lines:", lines);

const traverse = (x, y) => {
  let xPos = 0;
  let yPos = 0;
  let hitCounter = 0;
  while (yPos < lines.length) {
    xPos = (xPos + x) % lines[0].length;
    yPos = yPos + y;

    if (yPos < lines.length && lines[yPos][xPos] === "#") {
      hitCounter++;
    }
  }
  return hitCounter;
};

console.log(lines[0], lines[1]);
console.log("Number of trees hit:", traverse(3, 1));

const paths = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
];

console.log(
  "product:",
  paths.reduce((prod, [x, y]) => {
    const treesHit = traverse(x, y);
    console.log(`[${x},${y}]: ${treesHit}`);
    return prod * treesHit;
  }, 1)
);

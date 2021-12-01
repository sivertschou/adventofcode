const fs = require("fs");

var values = fs
  .readFileSync("./input.txt")
  .toString("utf-8")
  .split("\n")
  .map((item) => parseInt(item));

// Part 1
const part1 = values.reduce(
  ([num, prev], cur) =>
    prev != null && cur > prev ? [num + 1, cur] : [num, cur],
  [0, null]
);

console.log("Part 1:", part1[0]);

// Part 2
const sum = (a) => a.reduce((sum, i) => sum + i, 0);
const removeFirst = (a) => a.filter((_, i) => i !== 0);

const part2 = values.reduce(
  ([num, prev], cur) => {
    const next = removeFirst([...prev, cur]);
    return prev.every((n) => n != null) && sum(next) > sum(prev)
      ? [num + 1, next]
      : [num, next];
  },
  [0, [null, null, null]]
);

console.log("Part 2:", part2[0]);

const fs = require("fs");

var values = fs
  .readFileSync("./input.txt")
  .toString("utf-8")
  .split("\n")
  .map((line) => line.split(" "))
  .map(([cmd, val]) => [cmd, parseInt(val)]);

// Part 1
const [x1, z1] = values.reduce(
  ([x, z], [cmd, val]) => {
    switch (cmd) {
      case "forward":
        return [x + val, z];
      case "up":
        return [x, z - val];
      case "down":
        return [x, z + val];
    }
  },
  [0, 0]
);
console.log("Part 1:", x1 * z1);

// Part 2 2
const [x2, z2] = values.reduce(
  ([x, z, aim], [cmd, val]) => {
    switch (cmd) {
      case "forward":
        return [x + val, z + val * aim, aim];
      case "up":
        return [x, z, aim - val];
      case "down":
        return [x, z, aim + val];
    }
  },
  [0, 0, 0]
);
console.log("Part 2:", x2 * z2);

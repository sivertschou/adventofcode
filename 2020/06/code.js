const fs = require("fs");

const removeDuplicates = (input) => {
  let added = [];
  return input
    .split("")
    .filter((c) => {
      if (!added.find((inAdded) => inAdded === c)) {
        added.push(c);
        return true;
      } else {
        return false;
      }
    })
    .join("");
};

const part1 = fs
  .readFileSync("./input.txt")
  .toString("utf-8")
  .split("\n\n")
  .map((group) => removeDuplicates(group.trim().replace(/\n\b/g, "")))
  .reduce((sum, cur) => sum + cur.length, 0);

console.log(part1);

const countEvery = (g) => {
  const lines = g.split("\n");
  let count = {};
  lines.map((l) =>
    removeDuplicates(l)
      .split("")
      .map((l) => {
        if (count[l]) {
          count[l] = count[l] + 1;
        } else {
          count[l] = 1;
        }
      })
  );

  return Object.values(count).filter((v) => v === lines.length).length;
};

const part2 = fs
  .readFileSync("./input.txt")
  .toString("utf-8")
  .split("\n\n")
  .map((group) => countEvery(group.trim()))
  .reduce((sum, cur) => sum + cur, 0);

console.log(part2);

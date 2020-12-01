const fs = require("fs");

var values = fs
  .readFileSync("./input.txt")
  .toString("utf-8")
  .split("\n")
  .map((item) => parseInt(item));

// Part 1
const pair = values.reduce(
  (a1, n1) =>
    a1.length != 0
      ? a1
      : values.reduce((a2, n2) => (n1 + n2 === 2020 ? [n1, n2] : a2), []),
  []
);
console.log("Part 1");
console.log("- pair:", pair);
console.log("- product:", pair[0] * pair[1]);

// Part 2
const baseCase = (curSum, value, targetSum) =>
  curSum + value === targetSum ? [] : false;

const reduceStep = (depth, curSum, tarSum, values, used) => {
  const nextStep =
    depth === 1
      ? (value) => baseCase(curSum, value, tarSum)
      : (value) =>
          reduceStep(depth - 1, curSum + value, tarSum, values, [
            ...used,
            value,
          ]);

  const ret = values.reduce((found, value) => {
    if (found || used.find((i) => i === value)) {
      return found;
    }
    const res = nextStep(value);
    if (res) {
      return [value, ...res];
    } else {
      return found;
    }
  }, false);
  return ret;
};

// n = number of entires that should equal to s in list l
const findNumbers = (numEntries, tarSum, values) =>
  reduceStep(numEntries, 0, tarSum, values, []);

const numbers = findNumbers(3, 2020, values);

console.log("Part 2");
console.log("- numbers:", numbers);
console.log(
  "- product:",
  numbers.reduce((prod, v) => prod * v, 1)
);

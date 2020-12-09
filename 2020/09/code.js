const fs = require("fs");

const commands = fs
  .readFileSync("./input.txt")
  .toString("utf-8")
  .trim()
  .split("\n")
  .map((line) => parseInt(line));

console.log(commands);

const preambleLen = 5;
const possibleSums = {};
for (let i = preambleLen; i < commands.length; i++) {
  const possible = [];
  for (let j = 1; j <= preambleLen; j++) {
    for (let k = 1; k <= preambleLen; k++) {
      possible.push(commands[i - j] + commands[i - k]);
    }
  }
  possibleSums[i] = possible;
}

console.log(possibleSums);
for (let i = preambleLen; i < commands.length; i++) {
  const val = commands[i];
  const possible = possibleSums[i];
  if (!possible.find((v) => v === val)) {
    console.log("Invalid number:", val);

    for (let j = 0; j < commands.length; j++) {
      const range = [];
      for (let k = j; k < commands.length; k++) {
        range.push(commands[k]);
        const sum = range.reduce((sum, cur) => sum + cur, 0);
        if (sum === val) {
          const min = range.reduce((min, cur) => Math.min(min, cur), range[0]);
          const max = range.reduce((max, cur) => Math.max(max, cur), range[0]);
          console.log("min+max:", min + max);
          return;
        } else if (sum > val) {
          break;
        }
      }
    }
    break;
  }
}

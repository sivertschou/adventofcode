const fs = require("fs");
const descriptions = fs
  .readFileSync("./input.txt")
  .toString("utf-8")
  .split("\n");

const ids = descriptions.map((desc) =>
  desc
    .split("")
    .reverse()
    .reduce(
      (acc, cur, i) =>
        cur === "B" || cur === "R" ? acc + Math.pow(2, i) : acc,
      0
    )
);

const highestId = ids.reduce((highest, id) => (highest < id ? id : highest), 0);
console.log(`Highest id: ${highestId}`);

const seats = Array(highestId + 1)
  .fill(0)
  .map((_c, i) => i);

const possibleSeats = seats
  .filter(
    (id) => ids.find((i) => i === id + 1) && ids.find((i) => i === id - 1)
  )
  .filter((seat) => !ids.find((s) => s === seat));

console.log("Possible:", possibleSeats);

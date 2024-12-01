const fs = require("fs");

var values = fs
  .readFileSync("./input.txt")
  .toString("utf-8")
  .split("\n")
  .filter((line) => line !== "")
  .map((line) => line.split("   "));

const sort = (originalArray) => {
  const array = [...originalArray];
  array.sort((a, b) => a - b);
  return array;
};

const leftList = sort(values.map((pair) => parseInt(pair[0])));
const rightList = sort(values.map((pair) => parseInt(pair[1])));

let accumulatedDistance = 0;
for (let i = 0; i < leftList.length; i++) {
  accumulatedDistance += Math.abs(leftList[i] - rightList[i]);
}

console.log("Distance:", accumulatedDistance);

const occurencesIn = (value, list) => {
  let occurrences = 0;
  for (let i = 0; i < list.length; i++) {
    if (list[i] === value) occurrences++;
  }
  return occurrences;
};

const leftSimilarity = leftList
  .map((value) => value * occurencesIn(value, rightList))
  .reduce((acc, value) => acc + value, 0);

console.log("Similarity:", leftSimilarity);

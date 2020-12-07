const fs = require("fs");

const parseBag = (line) => {
  const words = line.split(" ");
  const color = words[0] + " " + words[1];
  const children = [];
  if (words[4] !== "no") {
    let i = 4;
    while (i < words.length) {
      const num = parseInt(words[i]);
      const col = `${words[i + 1]} ${words[i + 2]}`;
      children.push([num, col]);
      i += 4;
    }
  }

  return { color, children };
};

const bags = fs
  .readFileSync("./input.txt")
  .toString("utf-8")
  .split("\n")
  .map((line) => parseBag(line));

let someUpdate = true;
const canContain = {};
bags.map((bag) => {
  if (bag.children.find(([, color]) => color === "shiny gold")) {
    canContain[bag.color] = true;
  }
});

while (someUpdate) {
  someUpdate = false;
  bags.map((bag) => {
    if (bag.children.find(([, color]) => canContain[color])) {
      if (!canContain[bag.color]) {
        canContain[bag.color] = true;
        someUpdate = true;
      }
    }
  });
}

console.log(
  "Number of bags that can contain a shiny gold bag:",
  Object.entries(canContain).length
);

const calculatedContains = {};
bags.map((bag) => {
  if (bag.children.length === 0) {
    calculatedContains[bag.color] = [0];
  }
});

someUpdate = true;
while (someUpdate) {
  someUpdate = false;
  bags.map((bag) => {
    if (bag.children.every(([num, color]) => calculatedContains[color])) {
      if (!calculatedContains[bag.color]) {
        calculatedContains[bag.color] = [
          bag.children.reduce(
            (sum, [num, color]) =>
              sum + num * (calculatedContains[color][0] + 1),
            0
          ),
        ];
        someUpdate = true;
      }
    }
  });
}
console.log(
  "Number of bags a shiny gold bag contains:",
  calculatedContains["shiny gold"][0]
);

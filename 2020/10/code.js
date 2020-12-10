const fs = require("fs");

const adapters = fs
  .readFileSync("./input.txt")
  .toString("utf-8")
  .trim()
  .split("\n")
  .map((line) => parseInt(line))
  .sort((a, b) => a - b);

const isWithin3 = (curr, next) => {
  const diff = Math.abs(curr - next);
  return diff <= 3;
};

const chooseAdapter = (prevAdapter, adapters, numDiff1, numDiff3) => {
  if (adapters.length === 0) {
    numDiff3++;
    return [numDiff1 * numDiff3, prevAdapter + 3];
  }

  const possibleAdapters = adapters.filter((a) => isWithin3(prevAdapter, a));

  if (possibleAdapters.length === 0) {
    return false;
  }

  for (let i = 0; i < possibleAdapters.length; i++) {
    const chosen = possibleAdapters[i];
    const diff = Math.abs(chosen - prevAdapter);

    const [availableAdapters] = adapters.reduce(
      ([adapters, hasFiltered, toFilterOut], curr) =>
        curr === toFilterOut && !hasFiltered
          ? [adapters, true, toFilterOut]
          : [[...adapters, curr], hasFiltered, toFilterOut],
      [[], false, chosen]
    );
    const ret = chooseAdapter(
      chosen,
      availableAdapters,
      numDiff1 + (diff === 1 ? 1 : 0),
      numDiff3 + (diff === 3 ? 1 : 0)
    );

    if (ret) {
      return ret;
    }
  }
  return false;
};

const [productOfDiffs, targetJolts] = chooseAdapter(0, adapters, 0, 0);
console.log("Product of number of diff1 and number of diff3:", productOfDiffs);
console.log("Target jolts:", targetJolts);

const valuesOfPrevious = (val, adapters) => {
  return Array(3)
    .fill(true)
    .reduce((numPossilePrevs, _, i) => {
      const prev = adapters[val - (i + 1)];
      return numPossilePrevs + (prev ? prev : 0);
    }, 0);
};

const numberOfArrangements = adapters.reduce(
  (obj, curr) => ({
    ...obj,
    [curr]: valuesOfPrevious(curr, obj),
  }),
  { 0: 1 }
);

console.log(
  `Number of arrangements to get to ${targetJolts} Jolts: ${
    numberOfArrangements[targetJolts - 3]
  }.`
);

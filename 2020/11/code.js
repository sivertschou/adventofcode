const fs = require("fs");

const grid = fs
  .readFileSync("./input.txt")
  .toString("utf-8")
  .trim()
  .split("\n")
  .map((line) => line.split(""));

const getValue = (x, y, grid) => {
  if (x >= 0 && x < grid[0].length && y >= 0 && y < grid.length) {
    return grid[y][x];
  }

  return null;
};

const getNextSquareState = (x, y, grid) => {
  const vals = [
    getValue(x - 1, y - 1, grid),
    getValue(x - 1, y, grid),
    getValue(x - 1, y + 1, grid),
    getValue(x, y - 1, grid),
    getValue(x, y + 1, grid),
    getValue(x + 1, y - 1, grid),
    getValue(x + 1, y, grid),
    getValue(x + 1, y + 1, grid),
  ].filter((v) => v != null);

  const numAdjacent = vals.reduce(
    (numAdjacent, cur) => numAdjacent + (cur === "#" ? 1 : 0),
    0
  );

  if (grid[y][x] === "#" && numAdjacent >= 4) {
    return "L";
  } else if (grid[y][x] === "L" && numAdjacent === 0) {
    return "#";
  } else {
    return grid[y][x];
  }
};

const canSeeOccupied = (x, y, xDir, yDir, grid) => {
  x += xDir;
  y += yDir;
  while (x >= 0 && x < grid[0].length && y >= 0 && y < grid.length) {
    if (grid[y][x] === "#") {
      return true;
    }
    if (grid[y][x] === "L") {
      return false;
    }
    x += xDir;
    y += yDir;
  }

  return false;
};

const getNextSquareStateQueen = (x, y, grid) => {
  const vals = [
    canSeeOccupied(x, y, -1, -1, grid),
    canSeeOccupied(x, y, -1, 0, grid),
    canSeeOccupied(x, y, -1, +1, grid),
    canSeeOccupied(x, y, 0, -1, grid),
    canSeeOccupied(x, y, 0, +1, grid),
    canSeeOccupied(x, y, +1, -1, grid),
    canSeeOccupied(x, y, +1, 0, grid),
    canSeeOccupied(x, y, +1, +1, grid),
  ].filter((v) => v);

  const numAdjacent = vals.length;

  if (grid[y][x] === "#" && numAdjacent >= 5) {
    return "L";
  } else if (grid[y][x] === "L" && numAdjacent === 0) {
    return "#";
  } else {
    return grid[y][x];
  }
};

const part1 = () => {
  let someChange = true;
  let nextGrid = grid;
  while (someChange) {
    someChange = false;
    nextGrid = nextGrid.map((row, y) =>
      row.map((val, x) => {
        const nextVal = getNextSquareState(x, y, nextGrid);
        if (nextVal != val) {
          someChange = true;
        }
        return nextVal;
      })
    );
  }

  const numOccupiedSeats = nextGrid.reduce(
    (numOccupied, row) =>
      numOccupied +
      row.reduce((numOccupied, val) => numOccupied + (val === "#" ? 1 : 0), 0),
    0
  );

  return numOccupiedSeats;
};

const part2 = () => {
  let someChange = true;
  let nextGrid = grid;
  while (someChange) {
    someChange = false;
    nextGrid = nextGrid.map((row, y) =>
      row.map((val, x) => {
        const nextVal = getNextSquareStateQueen(x, y, nextGrid);
        if (nextVal != val) {
          someChange = true;
        }
        return nextVal;
      })
    );
  }

  const numOccupiedSeats = nextGrid.reduce(
    (numOccupied, row) =>
      numOccupied +
      row.reduce((numOccupied, val) => numOccupied + (val === "#" ? 1 : 0), 0),
    0
  );

  return numOccupiedSeats;
};

console.log(`Number of occupied seats: ${part1()} (part 1)`);
console.log(`Number of occupied seats: ${part2()} (part 2)`);

const fs = require("fs");

const min = (val, min) => val >= min;
const max = (val, max) => val <= max;

const minMax = (val, mi, ma) => min(val, mi) && max(val, ma);
const validHeight = (val) => {
  const type = val.slice(val.length - 2);
  const height = val.slice(0, val.length - 2);
  switch (type) {
    case "cm":
      return minMax(parseInt(height), 150, 193);
    case "in":
      return minMax(parseInt(height), 59, 76);
    default:
      return false;
  }
};

const validHairColor = (val) => {
  return new RegExp(/^(#[a-f0-9]{6})$/gm).test(val);
};

const validEyeColor = (val) => {
  return new RegExp(/^(amb|blu|brn|gry|grn|hzl|oth)$/gm).test(val);
};

const validPid = (val) => {
  return new RegExp(/^([0-9]{9})$/gm).test(val);
};
const requiredFields = [
  ["byr", (val) => val.length === 4 && minMax(parseInt(val), 1920, 2002)],
  ["iyr", (val) => val.length === 4 && minMax(parseInt(val), 2010, 2020)],
  ["eyr", (val) => val.length === 4 && minMax(parseInt(val), 2020, 2030)],
  ["hgt", (val) => validHeight(val)],
  ["hcl", (val) => validHairColor(val)],
  ["ecl", (val) => validEyeColor(val)],
  ["pid", (val) => validPid(val)],
];

const isValid = (passport) => {
  return requiredFields.every(([key, validator]) => {
    if (passport[key]) {
      return validator(passport[key]);
    } else {
      return false;
    }
  });
};

const passports = fs
  .readFileSync("./input.txt")
  .toString("utf-8")
  .split("\n\n")
  .map((line) => {
    let passport = {};
    line
      .replace(/\n/g, " ")
      .split(" ")
      .map((field) => {
        const [key, value] = field.split(":");
        passport[key] = value;
      });
    return passport;
  })
  .filter((passport) => isValid(passport));

console.log("Valid passports:", passports.length);

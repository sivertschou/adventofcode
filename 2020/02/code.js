const fs = require("fs");

var lines = fs.readFileSync("./input.txt").toString("utf-8").split("\n");

const passwordIsValidPart1 = (line) => {
  const [rule, password] = line.split(": ");

  const [ruleMin, ruleMax, character] = rule.split(/-|\s/);
  const characterCount = password
    .split("")
    .reduce((count, char) => (char === character ? count + 1 : count), 0);

  return ruleMin <= characterCount && characterCount <= ruleMax;
};
const validPart1Passwords = lines.filter((line) => passwordIsValidPart1(line));

console.log(`Number of valid passwords: ${validPart1Passwords.length}`);

const xor = (a, b, char) => {
  return a != b;
};

const passwordIsValidPart2 = (line) => {
  const [rule, password] = line.split(": ");

  let [pos1, pos2, character] = rule.split(/-|\s/);
  pos1 = parseInt(pos1) - 1;
  pos2 = parseInt(pos2) - 1;

  return (
    password[pos1] != password[pos2] &&
    (password[pos1] === character || password[pos2] === character)
  );
};
const validPart2Passwords = lines.filter((line) => passwordIsValidPart2(line));

console.log(`Number of valid passwords: ${validPart2Passwords.length}`);

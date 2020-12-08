const fs = require("fs");

const commands = fs
  .readFileSync("./input.txt")
  .toString("utf-8")
  .split("\n")
  .map((line) => {
    const [command, arg] = line.split(" ");
    return [command, parseInt(arg)];
  });

const runProgram = (commands) => {
  let acc = 0;

  const executedLines = {};
  let i = 0;
  while (i < commands.length) {
    const [command, arg] = commands[i];
    if (executedLines[i]) {
      return [false, acc, i];
    }
    executedLines[i] = true;

    switch (command) {
      case "acc":
        acc += arg;
        i++;
        break;
      case "jmp":
        i += arg;
        break;
      case "nop":
        i++;
        break;
    }
  }

  return [true, acc, 0];
};

// Part 1
const [, acc, line] = runProgram(commands);
console.log(`Repeated line ${line}. acc at return: ${acc}`);

// Part 2
let gi = 0;
while (gi < commands.length) {
  const invertedCommands = commands.map(([command, arg]) =>
    command === "acc"
      ? [command, arg]
      : command === "jmp"
      ? ["nop", arg]
      : ["jmp", arg]
  );

  const ret = runProgram(
    commands.map((cmd, i) => (i === gi ? invertedCommands[i] : cmd))
  );

  if (ret[0] === true) {
    console.log(
      `Working program when [${commands[gi].join(
        " "
      )}] at line ${gi} is changed to [${invertedCommands[gi].join(
        " "
      )}]. acc at return: ${ret[1]}`
    );
    return;
  }
  gi++;
}

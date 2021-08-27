"use strict";

const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8");

function solve(input) {
  let n = +input;
  if (n == 2) return "1";
  if (n <= 1) return -1;

  let result = "";

  for (let i = -1; i <= 1; i++) {
    let currentN = n + i;
    let counter = 0;
    // console.log(`>Start - currentN=${currentN}`);

    if (currentN % 2 === 0) {
      do {
        counter += currentN / 2;
        currentN = currentN / 2;
        // console.log(` --tik - currentN=${currentN}, counter=${counter}`);
        if (currentN == 1) {
          currentN = 0;
          break;
        }
      } while (currentN % 2 === 0);
    }

    counter += currentN;

    // console.log(`>End - currentN=${currentN}, counter=${counter}`);
    if (counter === n) {
      result += `${n + i}\n`;
    }
  }

  if (result === "") {
    return -1;
  } else {
    return result.slice(0, -1);
  }
}

console.log(solve(input));

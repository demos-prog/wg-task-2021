"use strict";

const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8");

function solve(input) {
  let set = new Set(input.split(",").sort((a, b) => a - b));
  let arr = [];

  for (const item of set) {
    arr.push(+item);
  }

  let result = "";

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] + 1 === arr[i + 1]) {
      if (result.slice(-1) === "-") {
        continue;
      } else {
        if (result.slice(-1) === ",") {
          if (arr[i] + 2 === arr[i + 2]) {
            result += `${arr[i]}-`;
          } else {
            result += `${arr[i]},`;
          }
        } else {
          result += `,${arr[i]}-`;
        }
      }
    } else {
      result += `${arr[i]},`;
    }
  }

  return result.slice(0, -1);
}
console.log(solve(input));

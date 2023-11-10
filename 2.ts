
import fs from "node:fs/promises"

let raw = (await fs.readFile("./inputs/2.txt",{encoding:"utf8"}))
.split("\n")

//advent of code day 2

let scoreStateTable ={
  "A X": 4,
  "A Y": 8,
  "A Z": 3,
  "B X": 1,
  "B Y": 5,
  "B Z": 9,
  "C X": 7,
  "C Y": 2,
  "C Z": 6,
}

let score = raw.reduce((a,b)=>a+scoreStateTable[b],0)


console.log(score)

//part 2

let scoreStateTable2 ={
  "A X": 3,
  "A Y": 4,
  "A Z": 8,
  "B X": 1,
  "B Y": 5,
  "B Z": 9,
  "C X": 2,
  "C Y": 6,
  "C Z": 7,
}

let score2 = raw.reduce((a,b)=>a+scoreStateTable2[b],0)

console.log(score2)
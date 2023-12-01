import fs from "node:fs/promises"
import { exit } from "node:process"

let raw =(await fs.readFile("inputs/1.txt",{encoding:"utf8"}))
.split('\n')


let digitState = {
  "one": 1,
  "two": 2,
  "three":3,
  "four": 4,
  "five": 5,
  "six": 6,
  "seven": 7,
  "eight": 8,
  "nine": 9,
}

function err():never{
  throw new Error("aaah")
}

let keys = Object.keys(digitState)
let keysSet = new Set(keys)
let numberRegexFirst = new RegExp( keys.join('|')+"|[0-9]")

//the beefiest regex ever
let numberRegexLast = /(?<=([one]|[two]|[three]|[four]|[five]|[six]|[seven]|[eight]|[nine]|[0-9]))(one|two|three|four|five|six|seven|eight|nine|[0-9])|([0-9])/gm

let p1 = raw.map(l=>[
(l.match(/[0-9]/) ?? err()) .at(0),
(l.match(/[0-9]/g)?? err()).at(-1)
])
.map(l=>parseInt(l.join("")))

let sum = p1.reduce((prev,curr)=>prev+curr,0)

console.log("part 1",sum)

let p2 = raw.map(l=>[
  (l.match(numberRegexFirst)).at(0) ,
  Array.from(l.matchAll(numberRegexLast)).at(-1).at(0) ,
])

console.log(p2.slice(0,5))


let p2Numbers = p2.map(l=>[
  keysSet.has(l[0]) ? digitState[l[0]]: parseInt(l[0]),
  keysSet.has(l[1]) ? digitState[l[1]]: parseInt(l[1]),
])
.map(l=>parseInt(l.join("")))

let sum2 = p2Numbers.reduce((a,b)=>a+b,0)

console.log(p2.slice(0,5))
console.log(p2Numbers.slice(0,5))
console.log("part 2",sum2)


//lower than 55929
//lower than 55903


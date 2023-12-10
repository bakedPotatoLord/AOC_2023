import fs from "node:fs/promises"

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

function reverse(str:string){
  return str.split('').toReversed().join('')
}

let digitMap = new Map(Object.entries(digitState))
let keys = Array.from(digitMap.keys())
let digitMapLast = new Map(Object.entries(digitState).map(([str,int ])=>[reverse(str),int]))
let keysLast = Array.from(digitMapLast.keys())

let numberRegexFirst = new RegExp( keys.join('|')+"|[0-9]")
let numberRegexLast = new RegExp( keysLast.join('|')+"|[0-9]")

let p1 = raw.map(l=>[
(l.match(/[0-9]/) ?? err()) .at(0),
(l.match(/[0-9]/g)?? err()).at(-1)
])
.map(l=>parseInt(l.join("")))

let sum = p1.reduce((prev,curr)=>prev+curr,0)

console.log("part 1", sum)

let p2 = raw.map(l=>[
  l.match(numberRegexFirst).at(0) ,
  reverse(l).match(numberRegexLast).at(-1) ,
])


let p2Numbers = p2.map(l=>[
  digitMap.get(l[0]) ?? parseInt(l[0]),
  digitMapLast.get(l[1]) ?? parseInt(l[1]),
])
.map(l=>parseInt(l.join("")))

let sum2 = p2Numbers.reduce((a,b)=>a+b,0)

console.log("part 2",sum2)


//lower than 55929
//lower than 55903


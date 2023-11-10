import fs from "node:fs/promises"


let raw =(await fs.readFile("inputs/1.txt",{encoding:"utf8"}))
.split("\n\n")
.map(el=>
  el.split('\n')
  .map(Number)
  .reduce((a,b)=>a+b,0)
)
.sort((a,b)=>a-b)

console.log(raw.at(-1))
console.log(raw.slice(-3).reduce((a,b)=>a+b,0))

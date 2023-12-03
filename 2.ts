import fs from "node:fs/promises"

let raw =(await fs.readFile("inputs/2.txt",{encoding:"utf8"}))
.split('\n')
.map(l=>
  l.split(":")[1]
  .split(';')
  .map(sg=>
    sg.split(',')
    .map(b=>{
      const block = b.trim()
      .split(" ")

      return {
        num:parseInt(block[0]), color:block[1],

      }
    })
    
  )
)

const colorTable = {
  red:12,
  green:13,
  blue:14,
}


let sum = raw.reduce((prev,curr,idx)=>{
return prev +

(curr.find(subgame=>
  subgame.find(block=>
    block.num > colorTable[block.color]
  )
) ? 0 : idx +1)
},0)

console.log("part 1", sum)


const powers = raw.map(l=>
  l.reduce(subgame=>)
)

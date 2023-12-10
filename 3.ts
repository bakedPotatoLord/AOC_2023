import { randomFillSync } from "node:crypto"
import fs from "node:fs/promises"

let raw = (await fs.readFile("./inputs/3.txt",{encoding:"utf8"}))
.split("\n")
.map(el=>el.split(''))

const notsymbol = /[0-9]|\./
const digit = /[0-9]/
const locatedSymbols:[number,number][] = []

raw.forEach((line,x)=>{
  line.forEach((symbol,y)=>{
    if(!notsymbol.test(symbol)){
      locatedSymbols.push([x,y])
    }
  })
})

const partNums:number[] = [];

locatedSymbols.forEach(([y,x])=>{
  findpartNum(y+1,x)
  findpartNum(y-1,x)
  findpartNum(y,x+1)
  findpartNum(y,x-1)
  findpartNum(y+1,x+1)
  findpartNum(y+1,x-1)
  findpartNum(y-1,x+1)
  findpartNum(y-1,x-1)
})

const partNumsSum = partNums.reduce((a,b)=>a+b,0)
console.log("part 1",partNumsSum)


function findpartNum(y:number,x:number){
  let str:string[] = []
  if(digit.test(raw[y][x])){
    str.push(raw[y][x])
  }else{
    return str.join('')
  }
  let testx = x+1
  while(digit.test(raw[y][testx])){
    str.push(raw[y][testx])
    raw[y][testx] = "."
    testx++
  }
  testx = x-1
  while(digit.test(raw[y][testx])){
    str.unshift(raw[y][testx])
    raw[y][testx] = "."
    testx--
  }
  if(str.length > 0){
    partNums.push(parseInt(str.join('')))
  }
}
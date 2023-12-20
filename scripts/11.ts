import { Console } from 'node:console'
import {dispMatrix, getInput, numberSum, vec2, vectorSub} from './helpers'

const raw:string[][] = (await getInput(11))
.split("\n").map(row=>row.split(""))

let emptyRows:number[]=[]
let emptycols:number[]=[]

for(let row of raw){
  if(!row.some(v=>v=="#")) emptyRows.push(raw.indexOf(row))
}

for(let i = raw[0].length-1;i>=0;i--){
  let foundGalaxy = false
  for(let j in raw) if( raw[j][i] == "#"){ foundGalaxy = true}
  if(!foundGalaxy) emptycols.push(i)
}
///form is [y,x]
const galaxies:vec2[] = []

raw.forEach((row,i)=>row.forEach((val,j)=>{ if(val == "#") galaxies.push([i,j])}))

//console.log(galaxies)
console.log("emptyRows",emptyRows)
console.log("emptycols",emptycols)

function stepDist(g1:vec2,g2:vec2,galaxyExpansionRatio:number = 1):number{
  galaxyExpansionRatio--
  const [g1y,g1x] = g1
  const [g2y,g2x] = g2
  const low:vec2 = [Math.min(g1y,g2y),Math.min(g1x,g2x)]
  const high:vec2 = [Math.max(g1y,g2y),Math.max(g1x,g2x)]
  const [a,b] = vectorSub(g1,g2)
  const yDist = Math.abs(a) + (emptyRows.filter(row=>row>low[0] && row<high[0]).length * galaxyExpansionRatio)
  const xDist = Math.abs(b) + (emptycols.filter(col=>col>low[1] && col<high[1]).length * galaxyExpansionRatio)
  return xDist + yDist
}

let distSum = 0
galaxies.forEach((g,i)=>{
  for(;i<galaxies.length;i++){
    distSum += stepDist(g,galaxies[i])
  }
})

console.log("part 1",distSum)

distSum = 0

galaxies.forEach((g,i)=>{
  for(;i<galaxies.length;i++){
    distSum += stepDist(g,galaxies[i],1e6)
  }
})

console.log("part 2",distSum)
import {getInput, numberSum} from './helpers'

const raw = (await getInput(8))
.split("\n")

const instructions = raw[0].split("")

const map = raw.slice(2).map(l=>{
  return [
    l.substring(0,3),
    l.substring(7,10),
    l.substring(12,15),
  ]
})

const rMap = new Map(map.map(el=>[el[0],[el[1],el[2]]]));


let steps = 0
let currStep = 0
let currPos = "AAA";


while(true){
  currPos = rMap.get(currPos)[instructions[currStep]=="L" ? 0 : 1]
  steps++
  currStep = (currStep+1)%instructions.length
  if(currPos=="ZZZ") break
}

console.log("part 1",steps) 

// steps = 0
// currStep = 0
// const posArr = Array.from( rMap.keys()).filter(el=>el.endsWith("A"))

// let onZ = 0 
// let maxOnZ = 0
  
// while (true){
//   onZ = 0
//   for(let i in posArr){
//     //const j = parseInt(i);
//     posArr[i] = rMap.get(posArr[i])[instructions[currStep]=="L" ? 0 : 1]  
//     if(posArr[i].endsWith('Z')) onZ ++
//   }
//   steps++
//   currStep = (currStep+1)%instructions.length
//   maxOnZ = Math.max(maxOnZ,onZ)
//   console.log(maxOnZ/posArr.length)
//   if(onZ == posArr.length) break
// }


// console.log(posArr)
// console.log("part 2:",steps)
 



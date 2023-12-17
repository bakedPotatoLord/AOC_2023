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


// let steps = 0
// let currStep = 0
// let currPos = "AAA";


// while(true){
//   currPos = rMap.get(currPos)[instructions[currStep]=="L" ? 0 : 1]
//   steps++
//   currStep = (currStep+1)%instructions.length
//   if(currPos=="ZZZ") break
// }

// console.log("part 1",steps) 


const posArr = Array.from( rMap.keys()).filter(el=>el.endsWith("A"))


//memoization

//find all positions after one loop
//find all z positions during loop

const memo = new Map(Array.from(rMap.keys()).map(el=>{
  let pos = el
  let zPos:number[] = []
  for(let [idx,inst] of Object.entries(instructions)){
    pos = rMap.get(pos)[inst=="L" ? 0 : 1]
    if(pos.endsWith("Z")) zPos.push(parseInt(idx))
  }
  return [el,{pos,zPos}]
}))

//find which keys in the map have Z overlap
//array where [instructionindex] => set of keys
let validkeyCombos = new Array(instructions.length).fill(0).map(
  (_,idx)=>new Set(
    Array.from(memo.values()).filter(el=>el.zPos.includes(idx)).map(el=>el.pos)
  )
)

console.log("valid key combos",validkeyCombos)

//go over loops, and see if there is a similar z pos for all ghosts
let loop =0
let innerLoop : number

part2:{

  while(true){
    for(let i in posArr){
      posArr[i] = memo.get(posArr[i]).pos
    }
    for(let [i,combo] of validkeyCombos.entries()){
      //console.log(posArr)
  
      if(allInSet(combo,posArr)){
        innerLoop = i;
        break part2 
      } 
    }
    loop++
  }
}



console.log("part 2:",(loop* instructions.length) + innerLoop+1)
 

function allInSet(set:Set<string>,arr:string[]){
  for(let el of arr){
    if(!set.has(el)) return false
  }
  return true
}

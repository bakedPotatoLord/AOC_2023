import {getInput, numberSum, vec2, vectorAdd, vectorEquals, vectorSub} from './helpers.js'


const matrix = (await getInput(10))
.split("\n").map(l=>l.split(""))

const len = matrix[0].length
const hei = matrix.length

const visitedMatrix:boolean[][] = Array(hei).fill(undefined).map(_=>Array(len).fill(false))


let pos:vec2;

matrix.forEach((row,x)=>{
  row.forEach((col,y)=>{
    if(col =='S') pos = [y,x]
  })
})
console.log("program start")

const pipeState:Record<string,[vec2,vec2]> ={
  "-":[[1,0],[-1,0]],
  "|":[[0,1],[0,-1]],
  "7":[[0,1],[-1,0]],
  "J":[[0,-1],[-1,0]],
  "L":[[0,-1],[1,0]],
  "F":[[0,1],[1,0]],
  
}



let movementCount = 0

let que:vec2[] = [
  pos,
]

const loop:vec2[] = []

while(que.length >0){
  let next = que.pop()
  visitedMatrix[next[1]][next[0]] = true;
  //if(vectorEquals(next,pos) && movementCount != 0) break

  let currChar = getChar(...next)
  let currPossible = pipeState[currChar]

  let surrounding = findSurroundingVectors(next).filter(v=>
    currChar == "S" || currPossible.some(cp=>vectorEquals(vectorAdd(next,cp),v)))

  let accessable = surrounding
  .filter((surr)=>{
    //console.log("surr",surr)
    //get first vector offset
    //get possible pipe offsets
    let char = getChar(...surr)
    let morePossible = pipeState[char]
    //if none, return false
    if(morePossible == undefined) return false
    let finaldest = morePossible.map(v=>vectorAdd(v,surr)) 
    //console.log("more",char,morePossible)
    //console.log("final ",finaldest) 
    return finaldest.some(v=>vectorEquals(v,next))
  })
  movementCount++
  
  if(accessable.length) que.push(accessable[0])
  loop.push(next)
}

console.log("part 1:", movementCount/2) 

function findSurroundingVectors(vec:vec2):vec2[]{
  //console.log(vec)
  return <vec2[]> [
    [vec[0]+1,vec[1]],
    [vec[0]-1,vec[1]],
    [vec[0],vec[1]+1],
    [vec[0],vec[1]-1],
    // [vec[0]+1,vec[1]+1],
    // [vec[0]-1,vec[1]-1],
    // [vec[0]-1,vec[1]+1],
    // [vec[0]+1,vec[1]-1],
  ].filter(v=>v[0]>=0 && v[1] >=0 && v[0]<len && v[1]<hei && !visitedMatrix[v[1]][v[0]],)
}

function getChar(x:number,y:number):string{
  return matrix[y][x]
}

function getVisited(x:number,y:number):boolean{
  return visitedMatrix[y][x]
}


let mx:("X"|"."|"O"|"I")[][] = visitedMatrix.map(row=>row.map(r=>r?"X":"."))

console.log(mx.map(row=>row.join("")).join("\n"))



loop.reverse()

for(let i = 0;i<loop.length-1;i++){
  let curr = loop[i]
  let next = loop[i+1]

  let diff = vectorSub(next,curr)

  //going down
  if(diff[1] == 1){
    setOutside(next[0]+1,next[1])
    setInside(next[0]-1,next[1])
    setOutside(curr[0]+1,curr[1])
    setInside(curr[0]-1,curr[1])
  }
  //going up
  if(diff[1] == -1){
    setOutside(next[0]-1,next[1])
    setInside(next[0]+1,next[1])
    setOutside(curr[0]-1,curr[1])
    setInside(curr[0]+1,curr[1])
  }

  //console.log(diff)
}


const Oque:vec2[] = []
const Ique:vec2[] = []
mx.forEach((row,y)=>{
  row.forEach((vec,x)=>{
    if(vec == "O") Oque.push([x,y])
    if(vec == "I") Ique.push([x,y])
  })
})

console.log("initial ques made")

let maxIs = 50000;

while(Oque.length > 0){
  let next = Oque.shift()
  if(visitedMatrix[next[1]][next[0]]) continue
  mx[next[1]][next[0]] = "O"
  visitedMatrix[next[1]][next[0]] = true;
  let surrounding = findSurroundingVectors(next).filter(v=>
    !visitedMatrix[v[1]][v[0]]
    )
  Oque.push(...surrounding)
}
console.log("Os filled")
while(Ique.length > 0 && maxIs-- > 0){
  let next = Ique.shift()
  if(visitedMatrix[next[1]][next[0]]) continue
  mx[next[1]][next[0]] = "I"
  visitedMatrix[next[1]][next[0]] = true;
  let surrounding = findSurroundingVectors(next).filter(v=>
    !visitedMatrix[v[1]][v[0]]
    )
  Ique.push(...surrounding)
}
console.log("(Is filled")



console.log("\n"+mx.map(row=>row.join("")).join("\n"))

const numI = mx.flat().filter(v=>v=="I").length

console.log("part 2:",numI)

function setOutside(...vals:vec2){
  const [x,y] = vals  
  if(!getVisited(x,y)) mx[y][x] = "O"
}
function setInside(...vals:vec2){
  const [x,y] = vals  
  if(!getVisited(x,y)) mx[y][x] = "I"
}


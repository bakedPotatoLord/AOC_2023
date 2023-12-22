// https://www.desmos.com/calculator/iwe1ytynmb

// https://www.wolframalpha.com/input?i=find+the+solutions+of+y%3D24614110121111+and+y%3D+55826490x-%28x%5E2%29%2C+

import {getInput, numberSum} from './helpers'

const [time,dist] = (await getInput(6))
.split("\n")
.map(line=>line.split(':')[1].trim().split('  ').filter(el=>el.length>0).map(el=>parseInt(el)))

let vals = 1
for(let i=0;i<time.length;i++){
  vals *= solve(time[i],dist[i])
}
console.log("part 1: ",vals)

const newTime:number = parseInt(time.join(''))
const newDist:number = parseInt(dist.join(''))
console.log(newTime,newDist)

console.log("part 2: ",solve(newTime,newDist))

function solve(time:number,dist:number){
  const a = -1;
  const b = time;
  const c = -dist;

  const initial = Math.sqrt((b*b)-(4*a*c));
  
  let [low,high] =[((-b)-initial)/(2*a),((-b)+initial)/(2*a)].sort((a,b)=>a-b)
  if(low == Math.round(low)) low++
  if(high == Math.round(high)) high--
  low = Math.ceil(low)
  high = Math.floor(high)
  //console.log(low,high)
  return (high-low+1)
}


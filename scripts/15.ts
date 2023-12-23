import { brotliCompress } from 'zlib'
import {getInput, numberSum} from './helpers'

const raw = (await getInput(15))
.split(",").map(h=>h.replace(/\n/g,""))

console.log("part 1: ",raw.map(hash).reduce((a,b)=>a+b,0))

const boxes = new Array(256).fill(0).map(()=>new Map<string,number>())

//[label, isEquals, box, focalLength]
const instructions :[string,boolean,number,number][] = raw.map(n=>{
  const label = n.split(/=|-/)
  return [label[0],/=/.test(n),hash(label[0]),parseInt(label[1])]
} )

//console.log(instructions)

for(let [label,isEquals,boxnum,focalLength] of instructions){
  const box = boxes[boxnum]

  if(isEquals){
    box.set(label,focalLength)
  }else{
    box.delete(label)
  }
}
let lensPower = 0;

for(const [boxNum,box] of boxes.entries()){
  let slot = 1
  for(let [_,focLen] of box.entries()){
    lensPower += (1+boxNum)* slot * focLen
    slot++
  }
}

console.log("part 2: ",lensPower)

function hash(s:string):number{
  return s.split("").reduce((a,b)=>((a+b.charCodeAt(0))*17)%256,0)
}



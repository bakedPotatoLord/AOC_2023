import fs from 'node:fs/promises'
import {getInput, numberSum} from './helpers'

const raw = (await getInput(5))

const seeds = raw.split('\n')[0].split(": ")[1].trim().split(' ').map(el=>parseInt(el))

//console.log(seeds)

const maps = raw.split('\n\n').slice(1).map(map=>
  map.split(':')[1].trim().split('\n').map(submap=>
    (<[number,number,number]>submap.split(' ').map(val=>parseInt(val)))
  )
)
.map((key,idx)=>{
  const map = new Map<number,number>()
  for(let [dest,source,len] of key){
    console.log(len)
    const diff = dest - source
    for(let i = source;i<source+len;i++){
      map.set(i,i+diff)
      console.log((i-source)/len)
    }
  }
  console.log(idx)
  return map
})


function getOutputs(keys:number[],map:Map<number,number>){
  return keys.map(key=> map.has(key) ? map.get(key) : key)
}

let locations = maps.reduce((prev,curr)=>getOutputs(prev,curr),seeds)

console.log("part 1:", Math.min(...locations))
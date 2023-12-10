import {getInput, numberSum} from './helpers'

const raw = (await getInput(5))

const seeds = raw.split('\n')[0].split(": ")[1].trim().split(' ').map(el=>parseInt(el))


const maps = raw.split('\n\n').slice(1).map(map=>
  map.split(':')[1].trim().split('\n').map(submap=>
    (<[number,number,number]>submap.split(' ').map(val=>parseInt(val)))
  )
)
.map((key)=>{
  return (num:number)=>{
    for(let [dest,source,len] of key){
      const diff = dest - source
      if(num >= source && num < source+len){
        return num + diff
      }
    }
    return num
  }
})


function getOutputs(keys:number[],map:typeof maps[0] ){
  return keys.map(k=> map(k))
}
let locations = maps.reduce((prev,curr)=>getOutputs(prev,curr),seeds)
console.log("part 1:", Math.min(...locations))




function* getSeeds(){
  for(let i = 0;i<seeds.length;i+=2){
    
    for(let j = 0;j<seeds[i+1];j++){
      console.log(j/seeds[i+1])
      yield seeds[i]+j
    }
  }
}

const realSeeds = Array.from(getSeeds())


const locations2 = maps.reduce((prev,curr)=>{
  console.log(getOutputs(prev,curr))
  return getOutputs(prev,curr)
},realSeeds.flat())

console.log("part 2:", Math.min(...locations2))
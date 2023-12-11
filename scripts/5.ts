import {getInput, numberSum} from './helpers'

const raw = (await getInput(5))

let seeds = raw.split('\n')[0].split(": ")[1].trim().split(' ').map(el=>parseInt(el))

let parsed = raw.split('\n\n').slice(1).map(map=>
  map.split(':')[1].trim().split('\n').map(submap=>
    (<[number,number,number]>submap.split(' ').map(val=>parseInt(val)))
  )
)

const maps = parsed
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

type Range = [number,number]

seeds = [1,5]
parsed = [[[2,0,3],[10,5,5]]]

const superMaps = parsed.map((key)=>{
  return (ranges: Range[])=>{
    let rs: Range[]= []
    
    for(let range of ranges){
      let rangeCopy = structuredClone(range)

      for(let [dest,source,len] of key){ 
        const sourceStart = source
        const sourceEnd = source + len -1
        const destStart = dest
        const destEnd = dest + len -1
  
        console.log("source",sourceStart,sourceEnd)
        // rs.push(...ranges.map(range=>{
        //   return getRangeOverlap(range,[sourceStart,sourceEnd])
        // }))
        
        rs.push(...getRangeOverlap(rangeCopy,[sourceStart,sourceEnd]))
      
        
      }
      
    }

    return rs
  }
})



function getRangeOverlap(range1: Range, range2: Range): Range[] | null {
  const [start1, end1] = range1;
  const [start2, end2] = range2;

  const overlapStart = Math.max(start1, start2);
  const overlapEnd = Math.min(end1, end2);

  //if no overlap
  if (overlapStart > overlapEnd) {
    return []
  }
  // if overlap in front only 
  if (start2 < start1 && end2 < end1) {
    
    return [[start1, end2]] 
  }
  // if overlap in back only
  if (overlapStart < end2 && overlapEnd > end2) {
    
  }
  //if overlap is inside
  if (overlapStart >= start2 && overlapEnd <= end2) {
    
  }
    
  
  return []

}


const ranges: Range[] =[]

for(let i = 0;i<seeds.length;i+=2){
  ranges.push([seeds[i],seeds[i]+seeds[i+1]-1])
}

console.log(ranges)

console.log(superMaps[0](ranges))


// const locations2 = maps.reduce((prev,curr)=>{
//   console.log(getOutputs(prev,curr))
//   return getOutputs(prev,curr)
// },realSeeds.flat())

//console.log("part 2:", Math.min(...locations2))
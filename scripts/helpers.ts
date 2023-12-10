import fs from 'node:fs/promises'

export function numberSum(arr:number[]){
  return arr.reduce((a,b)=>a+b,0)
}

export async function getInput(day:number){
  return await fs.readFile(`inputs/${day}.txt`,{encoding:"utf8"})
}
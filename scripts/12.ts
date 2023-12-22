import { getInput, numberSum } from './helpers'

const raw: [string[], number[]][] = (await getInput(12))
  .split("\n")
  .map(line => line.split(" "))
  .map(([a, b]) => [a.split(""), b.split(",").map(n => parseInt(n))])



const specialRaw: typeof raw = raw.map(([str, inst]) => {
  return [
    Array(5).fill(str.join("")).join("?").split(""),
    Array(5).fill(0).map(() => [...inst]).flat()
  ]
})
console.log("part 1", raw.map(el => findPossible(el).length).reduce((a, b) => a + b, 0))

const possible = specialRaw.map((el,i) => {
  console.log(`[${i}] `+(i/specialRaw.length*100).toFixed(2)+"%")
  return findPossible(el).length
})

console.log("part 2", possible, numberSum(possible) )

function findPossible(inp: typeof raw[0]) {
  const valid: string[][] = []

  tryNext(inp, valid)

  return valid
}

function tryNext([row, nums]: [string[], number[]], collector: string[][]) {
  let i = row.indexOf("?")
  const valid = checkValid([row, nums])
  if (i == -1 && valid) collector.push(row)
  //else if(valid)
  else {
    const r1 = [...row]
    const r2 = [...row]
    r1.splice(i, 1, ".")
    r2.splice(i, 1, "#")

    //console.log(r1,r2)
    if (checkValid([r1, nums])) tryNext([r1, nums], collector)
    if (checkValid([r2, nums])) tryNext([r2, nums], collector)
  }
}

function checkValid([row, nums]: [string[], number[]]) {
  nums = [...nums]
  let touchingDamaged = 0
  for (let i of row) {
    if (i == "#") {
      touchingDamaged++
    } else if (i == "." && touchingDamaged > 0) {
      const num = nums.shift()
      if (num == undefined) return false
      if (num == touchingDamaged) touchingDamaged = 0
      else return false
    } else if (i == "?") {
      return true
    } else if (i == ".") {
      continue;
    } else {
      throw new Error("invalid input" + i.toString())
    }
  }
  const num = nums.shift()
  //console.log(num)

  // if 
  if ((num == undefined && touchingDamaged == 0) || (num == touchingDamaged && nums.length == 0)) return true
  if (num != undefined) return false
  else return false
}

//console.log("test",checkValid([["#",".","#",".","#"],[1,1,1]]))
//console.log("possible : ",findPossible([["?","?","?","?","."],[1,1]]))



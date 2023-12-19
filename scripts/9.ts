import { getInput, numberSum } from './helpers'

const raw = (await getInput(9))
  .split("\n").map(l => l.split(" ").map(el => parseInt(el)))

function makeTree(arr: number[]) {
  const tree = [arr]
  while (true) {
    let last = tree.at(-1)
    if (last.length == 1) break
    tree.push(
      new Array(last.length - 1).fill(undefined).map((_, i) =>
        last[i + 1] - last[i]
      )
    )
  }
  return tree
}

function getNext(arr: number[]) {
  return makeTree(arr)
    .reduce((prev, curr) => {
      return prev + curr.at(-1)
    }, 0)
}



console.log("part 1", numberSum(raw.map(getNext)))

function getPrev(arr: number[]) {
  return makeTree(arr)
    .reduceRight((prev, curr) => {
      let val = curr.at(0) - prev
      return val
    }, 0)
}
console.log("part 2", numberSum(raw.map(getPrev))) 
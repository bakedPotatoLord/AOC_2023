import { getInput, numberSum } from './helpers'

const raw = (await getInput(14))
  .split("\n").map(row => row.split(""))
const rowLength = raw[0].length
const colLength = raw.length
console.log(["program start"])
printMatrix(raw);

let tilted = structuredClone(raw)

//tilted = pinwheel(tilted);
console.log("\n")
//printMatrix(tilted)
for(let spinCycle = 0; spinCycle < 1e9; spinCycle++){
  for (let quarterSpin = 0; quarterSpin < 4; quarterSpin++) {
    // one spin cycle
    for (let i = 0; i < rowLength; i++) {
      for (let j = 1; j < colLength; j++) {
        if (tilted[j][i] == "O") {
          for (let k = j - 1; k >= 0; k--) {
            if (tilted[k][i] != ".") {
              break;
            } else {
              tilted[k][i] = "O";
              tilted[k + 1][i] = "."
            }
          }
        }
      }
    }
    tilted = pinwheel(tilted);
  }
  if(spinCycle%1e5 == 0) console.log(((spinCycle/1e9)*100).toFixed(2)+"%")
}


console.log("\n")
printMatrix(tilted)


let totalLoad = 0

for (let [rowI, row] of tilted.entries()) {
  for (let [colI, col] of row.entries()) {
    if (col == "O") {
      totalLoad += colLength - rowI
    }
  }
}

console.log("")
console.log("total load", totalLoad)

function printMatrix(matrix: any[][]) {
  console.log(matrix.map(r => r.join("")).join("\n"))
}

function pinwheel<T>(matrix: T[][]) {
  const newMatrix = Array(matrix.length)
    .fill(0)
    .map((_, r) =>
      Array(matrix[0].length)
        .fill(0)
        .map((_, c) => matrix[matrix.length - 1 - c][r]));
  return newMatrix
}


// .....#....
// ....#...O#
// .....##...
// ...#......
// .....OOO#.
// .O#...O#.#
// ....O#...O
// ......OOOO
// #....###.O
// #.OOO#..OO

// total load 64
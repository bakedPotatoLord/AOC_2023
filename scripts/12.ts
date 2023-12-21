import {getInput, numberSum} from './helpers'

const raw:[string[],number[]][] = (await getInput(12))
.split("\n")
.map(line=>line.split(" "))
.map(([a,b])=>[a.split(""),b.split(",").map(n=>parseInt(n))])

console.log(raw)

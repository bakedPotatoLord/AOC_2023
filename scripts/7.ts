import { getCommentRange } from '../node_modules/typescript/lib/typescript'
import {getInput, numberSum} from './helpers.js'

const raw: [string,number][] = (await getInput(7))
.split("\n")
.map(l=>l.split(" "))
.map(l=>[l[0],parseInt(l[1])])



const fiveOfAKind = /(.)\1{4}/
const fourOfAKind = /(.)\1{3}/
const fullHouse = /(.)\1{2}(.)\2{1}|(.)\3{1}(.)\4{2}/ 
const threeOfAKind = /(.)\1{2}/
const twoPair = /(.)\1{1}(.)\2{1}|(.)\3{1}.(.)\4{1}/
const pair =  /(.)\1/

console.log(raw)
console.log(raw.map(h=>getRank(h[0])))

const cardState = {
  A:"A",
  K:"B",
  
}

function getRank(hand:string){
  const sorted = hand.split("").sort().join("");

  if(fiveOfAKind.test(sorted)) return 10
  else if(fourOfAKind.test(sorted)) return 9
  else if(fullHouse.test(sorted)) return 8
  else if(threeOfAKind.test(sorted)) return 7
  else if(twoPair.test(sorted)) return 6
  else if(pair.test(sorted)) return 5
  else return 4

}

console.log(
  
)


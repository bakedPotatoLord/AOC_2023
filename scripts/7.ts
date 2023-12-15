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

const cardState = {
  A:"A",
  K:"B",
  Q:"C",
  J:"D",
  "T":"E",
  "9":"F",
  "8":"G",
  "7":"H",
  "6":"I",
  "5":"J",
  "4":"K",
  "3":"L",
  "2":"M",

}

const replaced:[string,number,string][] = raw.map(l=>[...l,Array.from(l[0],c=>cardState[c]).join("")])

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

let cards: ( typeof replaced)[] = Array(11).fill(undefined).map(_=>[])

for(let hand of replaced){
  const rank = getRank(hand[0])
  cards[rank].push(hand)
}
cards.forEach(rank=>{
  rank.sort((a,b)=>-a[2].localeCompare(b[2]))
})
const flat = cards.flat()
let winnings = 0 
flat.forEach(([_,val],idx)=>{
  winnings += (val * (idx+1))
})
console.log("part 1",winnings) 

cardState["J"] = "Z"

const possibleCards = Object.keys(cardState).filter(card=>card !== "J")


function findBestRank(hand:string):number{
  const split = hand.split("")
  const numJacks = split.filter(c=>c === "J").length;
  if(numJacks >= 4) return 10
  const possibleHandsArr =possibleHands(hand)
  return possibleHandsArr.reduce((a,b)=>{
    return a > getRank(b) ? a : getRank(b)
  },4)
}


function possibleHands(hand:string,collector:string[]=[]):string[]{
  
  const split = hand.split("")
  const jIndex = split.indexOf("J")
  if(jIndex === -1) {
    collector.push(hand)
    return collector
  }
  possibleCards.forEach(card=>{
    const schrodingersHand = [...split]
    schrodingersHand[jIndex] = card
    possibleHands(schrodingersHand.join(""),collector)
  })
  return collector
}

let replaced2 : [string,number,string,number][] = raw.map(l=>[...l,Array.from(l[0],c=>cardState[c]).join(""),findBestRank(l[0])])
let cards2: ( typeof replaced2)[] = Array(11).fill(undefined).map(_=>[])


for(let hand of replaced2){
  
  cards2[hand[3]].push(hand)
  console.log(hand)
}
cards2.forEach(rank=>{
  rank.sort((a,b)=>-a[2].localeCompare(b[2]))
})
const flat2 = cards2.flat()
let winnings2 = 0 
flat2.forEach(([_,val],idx)=>{
  winnings2 += (val * (idx+1))
})

console.log(flat2)
console.log("part 2",winnings2)   

console.log(findBestRank("KTJJT")) 
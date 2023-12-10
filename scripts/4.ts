import fs from 'node:fs/promises'

let raw = (await fs.readFile("./inputs/4.txt",{encoding:"utf8"}))
.split("\n")
.map(line=>line
  .split(/\:|\|/)
  .slice(1)
  .map(el=>el.split(" ").filter(el=>/[0-9]/.test(el)).map(el=>parseInt(el))));


//console.log( raw);

const scores = raw.map(([a,b])=>{
  return 2 ** (a.filter(el=>b.includes(el)).length -1) 
})

const newCards = raw.map(([a,b])=>{
  return (a.filter(el=>b.includes(el)).length ) 
})

console.log("part 1",scores.filter(el=>el>=1).reduce((a,b)=>a+b,0))

const scoreMap = new Map(newCards.map((el,idx)=>[idx,el]));
const numCards:number[] = Array(scores.length).fill(1);

for(let card in numCards){
  const cardIndex = parseInt(card);
  const currnumCards = numCards[cardIndex];
  let score = scoreMap.get(cardIndex);
  for(let i = cardIndex+1;i < cardIndex+ score+1;i++){
    numCards[i]+=currnumCards;
  }
}

const totalNumCards = numCards.reduce((a,b)=>a+b,0);

console.log("part 2",totalNumCards)

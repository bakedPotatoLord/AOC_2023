import {Direction, getInput, getPerpendicular, numberSum} from './helpers'

const matrix = (await getInput(17))
.split("\n").map(l=>l.split("").map(el=>parseInt(el)))

const minHeatLossMatrix = new Array(matrix.length).fill(0)
.map(()=>new Array(matrix[0].length).fill(0).map(()=>new Map(
  Object.keys(Direction).map(k=>[Direction[k],new Map<number,number>()]
  
))))


class Cruciblle{
  x:number;
  y:number;
  dir:Direction;
  straightMoves = 0
  heatLoss = 0
  constructor(x:number,y:number,dir:Direction,straightMoves?:number,heatLoss?:number){
    this.x = x
    this.y = y
    this.dir = dir
    this.straightMoves = straightMoves
    this.heatLoss = heatLoss
  }

  move(){

    if(minHeatLossMatrix[this.y][this.x].get(this.dir).has(this.straightMoves) 
    && this.heatLoss > minHeatLossMatrix[this.y][this.x].get(this.dir).get(this.straightMoves)) return
    
    else minHeatLossMatrix[this.y][this.x].get(this.dir).set(this.straightMoves,this.heatLoss)

    if(this.straightMoves < 3){
      const newX = this.x + (this.dir == Direction.left ? -1 : this.dir == Direction.right ? 1 : 0)
      const newY = this.y + (this.dir == Direction.up ? -1 : this.dir == Direction.down ? 1 : 0)
      
      if(!isValid(newX,newY)) return

      crucibles.push(new Cruciblle(
        newX,
        newY,
        this.dir,
        this.straightMoves+1,
        this.heatLoss+matrix[newY][newX]
        ))
    }
    getPerpendicular(this.dir).forEach(dir=>{
      const newX = this.x + (dir == Direction.left ? -1 : dir == Direction.right ? 1 : 0)
      const newY = this.y + (dir == Direction.up ? -1 : dir == Direction.down ? 1 : 0)

      if(!isValid(newX,newY)) return

      crucibles.push(new Cruciblle(
        newX,
        newY,
        dir,
        0,
        this.heatLoss+matrix[newY][newX]
        ))

    })
  }
}

const crucibles = [new Cruciblle(0,0,Direction.right,0,0)]

const possibleHeatLoss:number[] = []

while(crucibles.length){
  const c = crucibles.shift()

  c.move()
  //console.log(crucibles.length)

  if(c.x == matrix[0].length -1 && c.y == matrix.length -1){
    possibleHeatLoss.unshift(c.heatLoss)
  }
}

//console.log(minHeatLossMatrix.map(r=>r.map(m=>m.get(Direction.right)).join(" ")).join("\n"))

console.log(possibleHeatLoss.sort((a,b)=>a-b))

function isValid(x:number,y:number):boolean{
  return x >= 0 && y >= 0 && x < matrix[0].length && y < matrix.length
}
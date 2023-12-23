import {getInput, numberSum, Direction} from './helpers'

const matrix = (await getInput(16))
.split("\n").map(row=>row.split("").map(char=>new MazeNode(char)))

const flatMatrix = matrix.flat()




class Lazer{
  x:number
  y:number
  dir:Direction

  constructor(x:number,y:number,dir:Direction){
    this.x = x
    this.y = y
    this.dir = dir
  }

  move(lazerCollector:Lazer[]){
    const node =matrix[this.y][this.x]
    node.energized = true
    node.dirSet.add(this.dir)
    const char = node.char
    if(char == "\\"){
      if(this.dir == Direction.down) this.dir = Direction.right
      else if(this.dir == Direction.up) this.dir = Direction.left
      else if(this.dir == Direction.left) this.dir = Direction.up
      else if(this.dir == Direction.right) this.dir = Direction.down
    }else if(char == '/'){
      if(this.dir == Direction.down) this.dir = Direction.left
      else if(this.dir == Direction.up) this.dir = Direction.right
      else if(this.dir == Direction.left) this.dir = Direction.down
      else if(this.dir == Direction.right) this.dir = Direction.up
    }else if(char == "|"){
      if(this.dir == Direction.left || this.dir == Direction.right){
        this.dir = Direction.up
        lazerCollector.push(new Lazer(this.x,this.y,Direction.down))
      }
    }else if(char ==  "-"){
      if(this.dir == Direction.up || this.dir == Direction.down){
        this.dir = Direction.left
        lazerCollector.push(new Lazer(this.x,this.y,Direction.right))
      }

    }

    if(this.dir == Direction.down) this.y++
    else if(this.dir == Direction.up) this.y--
    else if(this.dir == Direction.left) this.x--
    else if(this.dir == Direction.right) this.x++
    
  }

  outsideMatrix(){
    return this.x< 0 || this.y< 0 || this.x > matrix[0].length -1 || this.y > matrix.length -1
  }

  isClone(){
    const node =matrix[this.y][this.x]
    return node.dirSet.has(this.dir)
  }
}

class MazeNode{
  readonly char: string
  readonly dirSet=  new Set<Direction>()
  energized = false

  constructor(char:string){
    this.char = char
  }


  reset(){
    this.energized = false
    this.dirSet.clear()
  }
}
part1:{

  const lazers = [new Lazer(0,0,Direction.right)]
  
  while(lazers.length){
    const next = lazers.pop()
  
    while(true){
      next.move(lazers)
      if(next.outsideMatrix() || next.isClone()) break
      //console.log(next.x,next.y)
    }
  }
  
  console.log("part 1: ",flatMatrix.reduce((a,b)=>a+ (b.energized? 1:0),0))
}

const lazerPossibility:Lazer[] = [
  ...Array(matrix.length).fill(undefined).map((_,i)=>new Lazer(0,i,Direction.right)),
  ...Array(matrix.length).fill(undefined).map((_,i)=>new Lazer(matrix.length-1,i,Direction.left)),
  ...Array(matrix[0].length).fill(undefined).map((_,i)=>new Lazer(i,0,Direction.down)),
  ...Array(matrix[0].length).fill(undefined).map((_,i)=>new Lazer(i,matrix[0].length-1,Direction.down)),
]

let maxEnergized = 0

while(lazerPossibility.length){
  const next = lazerPossibility.pop()
  //reset matrix
  flatMatrix.forEach(node=>node.reset())
  //create inner lazer queue
  const lazers = [next]
  while(lazers.length){
    const next = lazers.pop()
    while(true){
      next.move(lazers)
      if(next.outsideMatrix() || next.isClone()) break
    }
  }
  const numEnergized = flatMatrix.reduce((a,b)=>a+ (b.energized? 1:0),0)
  maxEnergized = Math.max(maxEnergized,numEnergized)
}

console.log("part 2: ",maxEnergized)

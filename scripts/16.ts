import {getInput, numberSum} from './helpers'

const matrix = (await getInput(16))
.split("\n").map(row=>row.split("").map(char=>new MazeNode(char)))

enum Direction{
  left,
  right,
  up,
  down,
}


class Lazer{
  x:number
  y:number
  dir:Direction

  constructor(x:number,y:number,dir:Direction){
    this.x = x
    this.y = y
    this.dir = dir
  }

  move(){
    const node =matrix[this.y][this.x]
    node.energized = true
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
      if(this.dir == Direction.left){
        this.dir = Direction.up
      }
    }

    if(this.dir == Direction.down) this.y--
    else if(this.dir == Direction.up) this.y++
    else if(this.dir == Direction.left) this.x--
    else if(this.dir == Direction.right) this.x++
    
    
  }

  outsideMatrix(x,y){

  }
}

class MazeNode{
  readonly char: string
  readonly dirSet=  new Set<Direction>()
  energized = false

  constructor(char:string){
    this.char = char
  }
}

const lazers = [new Lazer(0,0,Direction.right)]

while(lazers.length){
  const next = lazers.pop()

  while(true){

  }

}

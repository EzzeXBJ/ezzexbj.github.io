const canvas = document.getElementById('canvas')
const ctx = canvas.getContext("2d")

const tileSize = 16
const rows = 10
const cols = 15
const scale = 2
const tileSizeS = tileSize*scale
const width = tileSizeS * cols
const height = tileSizeS * rows

canvas.width = width
canvas.height = height

class Player {
  constructor (posX,posY,spriteList,animationList) {
    this.position = {
      x: posX,
      y: posY
    }
    this.isMoving = false
    this.moveTo = {
      startPosition: {
        x: 0,
        y: 0
      },
      targetPosition: {
        x: 0,
        y: 0
      },
      duration: 0,
      lapse: 0
    }
    
  }
  update () {
    if (this.isMoving) {
      if (this.moveTo.lapse < this.moveTo.duration) {
        this.position.x = (this.moveTo.targetPosition.x * this.moveTo.lapse / this.moveTo.duration) + this.moveTo.startPosition.x
        this.position.y = (this.moveTo.targetPosition.y * this.moveTo.lapse / this.moveTo.duration) + this.moveTo.startPosition.y
        this.moveTo.lapse += time.deltaTime
        
      } else {
        this.position.x = this.moveTo.targetPosition.x + this.moveTo.startPosition.x
        this.position.y = this.moveTo.targetPosition.y + this.moveTo.startPosition.y
        this.resetMove()
      }
    }
  }
  resetMove() {
    this.moveTo.startPosition = { x: 0, y: 0 }
    this.moveTo.targetPosition = { x: 0, y: 0 }
    this.moveTo.lapse = 0
    this.moveTo.duration = 0
    this.isMoving = false
    
  }
  draw(){
    ctx.fillStyle = '#00f'
    ctx.fillRect(this.position.x, this.position.y, tileSizeS, tileSizeS)
  }
}
class Time {
  constructor () {
    this.frameRate = 0
    this.deltaTime = 0
    this.lastTime = Date.now()
    this.startTime = Date.now()
    this.clock = {
      min: 0,
      sec: 0,
      cen: 0,
      time: 0
    }
  }
  update () {
    let nowTime =  Date.now()
    this.frameRate = 1000/(nowTime-this.lastTime)
    this.lastTime = nowTime
    this.deltaTime = 1/this.frameRate
    this.clock.time += this.deltaTime
    this.updateClock()
  }
  updateClock() {
    this.clock.min = Math.trunc(this.clock.time/60)
    this.clock.sec = Math.trunc(this.clock.time-(60*this.clock.min))
    this.clock.cen = Math.trunc((this.clock.time-Math.trunc(this.clock.time))*100)
  }
  drawClock(div) {
    div.innerText = `${time.clock.min} : ${time.clock.sec} : ${time.clock.cen}`
  }
}

const time = new Time()
const player = new Player(tileSizeS*7,tileSizeS*4, 0,0)

update()

function update () {
  time.update()
  player.update()
  updateCanvas()
  requestAnimationFrame(update)
}
function updateCanvas(){
  ctx.clearRect(0,0,canvas.width,canvas.height)
  ctx.fillStyle = '#000'
  for (let i=0;i<cols;i++) {
    for (let j=0;j<rows;j++) {
      ctx.fillRect(i*tileSize*scale,j*tileSize*scale,2,2)
    }
  }
  player.draw()
  time.drawClock(document.getElementById('clock'))
}

setInterval(()=>{
  document.getElementById('fps').innerText = time.frameRate
  document.getElementById('deltaTime').innerText = time.deltaTime
},500)

function moveTo(dir) {
  if (!player.isMoving) {
    player.moveTo.startPosition.x = player.position.x
    player.moveTo.startPosition.y = player.position.y
    player.moveTo.duration = .15
    player.isMoving = true
    switch (dir) {
      case 'left':
        player.moveTo.targetPosition.x = -tileSizeS
        break
      case 'right':
        player.moveTo.targetPosition.x = tileSizeS
        break
      case 'top':
        player.moveTo.targetPosition.y = -tileSizeS
        break
      case 'down':
        player.moveTo.targetPosition.y = tileSizeS
        break
    }
  }
}
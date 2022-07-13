function Particle ({ color, weight }) {
  this.pos = createVector(random(width), random(height))
  this.vel = createVector(0, 0)
  this.acc = createVector(0, 0)
  this.maxSpeed = MAX_SPEED
  this.prevPos = this.pos.copy()
  
  this.update =  () => {
    this.vel.add(this.acc)
    this.vel.limit(this.maxSpeed)
    this.pos.add(this.vel)
    this.acc.mult(0)
  }
  
  this.applyForce = (force) => {
    this.acc.add(force)
  }
  
  this.show = () => {
    stroke(color)
    strokeWeight(weight)
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y)
    this.updatePrevious()
  }

  this.updatePrevious = () => {
    this.prevPos.x = this.pos.x
    this.prevPos.y = this.pos.y
  }

  this.edges = () => {
    if(this.pos.x > width) {
      this.pos.x = random(0, width*0.5)
      this.updatePrevious()
    }
    if(this.pos.x < 0) {
      this.pos.x = random(width*0.95, width)
      this.updatePrevious()
    }
    if(this.pos.y > height) {
      this.pos.y = random(0, height*0.5)
      this.updatePrevious()
    }
    if(this.pos.y < 0) {
      this.pos.y = random(height*0.95, height)
      this.updatePrevious()
    }
  }

  this.follow = (vectors) => {
    let x = floor(this.pos.x / SCALE)
    let y = floor(this.pos.y / SCALE)
    let index = x + y * cols;
    let force = vectors[index]
    this.applyForce(force)
  } 
}
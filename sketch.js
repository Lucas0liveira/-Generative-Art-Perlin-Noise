// const INC = 0.001
// const INCZ = 0.0001

// To-Do: pause button, n de particulas, background alpha ou sem alpha e random vs noise
// será que tem como atualizar o valor da particula ao invés de refazê-la?
const SCALE = 10
const SHOW_VECTORS = false
const INVERSE_BG = true

let INC = 0.001
let INCZ = 0.00005
let MAX_SPEED = 2
let MAX_WEIGHT = 4
let ALPHA = 16
let PARTICLES = 5000

let cols, rows
let fr;
let zoff = 0
let particles = []
let flowfield = []


function setup() {
  const parent = document.getElementById('app')
  const canvas = createCanvas(parent.clientWidth, parent.clientHeight)
  canvas.parent('app')
  cols = floor(width / SCALE)
  rows = floor(height / SCALE)

  sliderIncLabel = createSpan("X and Y Increment ");
  sliderIncLabel.parent('app')
  sliderInc = createSlider(1, 1000, 10)
  sliderInc.changed(incChanged)
  sliderInc.parent('app')

  sliderZIncLabel = createSpan("Z Increment ");
  sliderZIncLabel.parent('app')
  sliderZInc = createSlider(1, 1000, 1)
  sliderZInc.changed(zIncChanged)
  sliderZInc.parent('app')

  maxSpeedLabel = createSpan("Max Speed ");
  maxSpeedLabel.parent('app')
  maxSpeedSlider = createSlider(1, 10, 2)
  maxSpeedSlider.changed(maxSpeedChanged)
  maxSpeedSlider.parent('app')

  maxWeightLabel = createSpan("Max Weight ");
  maxWeightLabel.parent('app')
  maxWeightSlider = createSlider(1, 16, 4)
  maxWeightSlider.changed(maxWeightChanged)
  maxWeightSlider.parent('app')
  
  alphaLabel = createSpan("Particle Alpha");
  alphaLabel.parent('app')
  alphaSlider = createSlider(16, 255, 16)
  alphaSlider.changed(alphaChanged)
  alphaSlider.parent('app')

  particlesInputLabel = createSpan("Particles ");
  particlesInputLabel.parent('app')
  particlesInput = createInput(2000, 'number')
  particlesInput.parent('app')

  themSelectLabel = createSpan("Theme ");
  themSelectLabel.parent('app')
  themeSelect = createSelect()
  Object.keys(themes).forEach(theme => themeSelect.option(theme));
  themeSelect.changed(themeSelected)
  themeSelect.parent('app')

  
  flowfield = new Array(cols * rows)

  generateParticles()
  
  background(pickBackground(255, INVERSE_BG))
}

function draw() {
  // background(pickBackground(20, INVERSE_BG))
  let yoff = 0
  
  for (let y = 0; y < rows + SCALE; y++) {
    let xoff = 0;
    for (let x = 0; x < cols + SCALE; x++) {
      let index = (x + y * cols);
      let angle = noise(xoff, yoff, zoff) * TWO_PI * 4
      // let angle = random() * TWO_PI * 4
      let vector = p5.Vector.fromAngle(angle)
      flowfield[index] = vector;
      xoff += INC
      noiseDetail(1, 1)

      if(SHOW_VECTORS){
        stroke(121,162,231, 15)
        strokeWeight(1)   
        push()
        translate(x * SCALE, y * SCALE)
        rotate(vector.heading())
        line(0, 0, SCALE, 0)
        pop()
      }
    }
    yoff += INC
    zoff += INCZ
  }
  for (let i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield)
    particles[i].update()
    particles[i].edges()
    particles[i].show()
  }
}

function themeSelected() {
  setTheme(themeSelect.value())
  console.log(themeSelect.value())
  generateParticles()
}



function incChanged () {
  INC = sliderZInc.value() / 100000
  generateParticles()
}
function zIncChanged () { 
  INCZ = sliderInc.value() / 10000
  generateParticles()
}
function maxSpeedChanged () {
  MAX_SPEED = maxSpeedSlider.value()
  generateParticles()
}
function maxWeightChanged () {
  MAX_WEIGHT = maxWeightSlider.value()
  generateParticles()    
}
function alphaChanged () {
  ALPHA = alphaSlider.value()
  generateParticles()    
}

const generateParticles = () => {
  particles = []

  for (let i = 0; i < PARTICLES; i++) {
    particles[i] = new Particle({
      color: pickColor(),
      weight: random(MAX_WEIGHT),
      max_speed: MAX_SPEED
    })
  }
}


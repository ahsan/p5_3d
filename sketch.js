var eiffel;
var xPos = 0;
var yPos = 0;
var zPos = 600;
var img;

var sw;
var switches = [];

function preload() {
  img = loadImage('./front.png');
  typeA = loadImage('./typeA.png');
  typeB = loadImage('./typeB.png');
}


function setup() {
  var canvas = createCanvas(1000, 800, WEBGL);
  canvas.parent('sketch-holder');

  // sw = new

  for (var i=0; i<=7; i++){
    switches.push(
      new Switch(i*100 - 400, 0, 0, 60, 300, 150, typeB)
    );
  }
}

function draw() {
  // camera(0, 0, 500, 0, 0, 0, 0, 1, 0);
  // camera(map(mouseX, 0, width, 300,-300), map(mouseY, 0, width, 250, -250), zPos, 0, 0, 0, 0, 1, 0);
  // pointLight(255, 255, 255, 0, 0, 100)
  ambientLight(255);

  background(120);

  switches.forEach(sw => {
    sw.draw();
  });

  // sw.draw()

  // pointLight(255, 255, 255, 0, 0, 100)
}

function getSwitch(x, y){
  console.log('inside get switch')
  switches.forEach(sw => {
    if(sw.pointInsideFace(x, y)) {

      console.log('found switch')
      console.log(sw)
      return sw.x;
    }

  });
}

function mouseDragged(event) {
  // xPos = map(event.clientX, 0, width, -300, 300);
  // yPos = map(event.clientY, 0, height, -300, 300);
  // sw.move(mouseX - (width/2), mouseY - (height/2));
}


function keyPressed(event) {
  sw.moveZ(-100)
}

function mousePressed() {
  // sw.moveZ(0)
  // console.log(sw.pointInsideFace(mouseX-(width/2), mouseY-(height/2)))
  console.log(getSwitch(mouseX, mouseY))
}


/**
 * Switch Class
 * @param {float} x
 * @param {float} y
 * @param {float} z
 * @param {float} width
 * @param {float} height
 * @param {float} depth
 * @param {image} txtr
 */
function Switch(x, y, z, width, height, depth, txtr) {

  // Position
  this.xPos = x;
  this.yPos = y;
  this.zPos = z;

  // Intended position
  this.intendedZ = this.zPos;

  // Size
  this.width = width;
  this.height = height;
  this.depth = depth;

  this.txtr = txtr;


  // Draw method
  this.draw = function(){

    this.updatePosition();

    push();
    translate(this.xPos, this.yPos, this.zPos - (this.depth/2));

    // box
    noStroke();
    fill(50);
    box(this.width, this.height, this.depth);


    // front panel
    translate(0, 0, this.depth/2);
    fill(0);
    texture(this.txtr);
    plane(width, height);
    pop();
  }

  // Move box around
  this.moveZ = function(zPos) {
    this.intendedZ = zPos;
  }
  this.move = function(xPos, yPos) {
    this.xPos = xPos;
    this.yPos = yPos;
  }

  // Update position function
  this.updatePosition = function() {
    // TODO: Add an anchor condition
    this.zPos = lerp(this.zPos, this.intendedZ, 0.08);
  }

  // log position
  this.logPosition = function() {
    console.log(this.xPos, this.yPos, this.zPos)
  }

  // pointInside
  this.pointInsideFace = function(pointX, pointY) {
    return (pointX >= this.xPos-this.width/2 && pointX <= this.xPos + this.width/2 && pointY >= this.yPos-this.height/2 && pointY <= this.yPos + this.height/2)
  }
}



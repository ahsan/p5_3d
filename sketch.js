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

  for (var i=0; i<=3; i++){

    switches.push(
      new Switch(i*100, 0, 0, 60, 300, 150, typeB)
    );
  }
  for (var i=-1; i>= -3; i--){
    switches.push(
      new Switch(i*100, 0, 0, 60, 300, 150, typeA)
    );
  }


  // create default texture
  def_texture = createGraphics(300, 300);
  def_texture.background(0);

}

function draw() {
  // camera(0, 0, 500, 0, 0, 0, 0, 1, 0);
  // camera(map(mouseX, 0, width, 300,-300), map(mouseY, 0, width, 250, -250), zPos, 0, 0, 0, 0, 1, 0);
  // pointLight(255, 255, 255, 0, 0, 100)
  ambientLight(255);

  background(120);

  //draw bounding box
  drawBox();

  // draw switches
  switches.forEach(sw => {
    sw.draw();
  });


  pointLight(255, 255, 255, 0, 0, 100)
}

function getSwitch(x, y){
  return switches.find(function(sw){
    return sw.pointInsideFace(x,y);
  });
}


function mouseClicked() {

  // switches.forEach(sw => {
  //   sw.moveInside();
  // });
  let sw = getSwitch(mouseX-width/2, mouseY-height/2)
  sw.toggleZ();
}


function drawBox() {
  push();
  texture(def_texture);
  rotateX(PI/2);
  translate(0,0, 230);
  plane(700,300);
  pop();
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

  // state
  this.outside = false;
  outsideZ = z+70;
  insideZ = z;

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
  this.toggleZ = function() {
    if(this.outside) {
      this.moveZ(insideZ);
      this.outside = false;
    }
    else {
      this.moveZ(outsideZ);
      this.outside = true;
    }
  }
  this.moveInside = function() {
    this.moveZ(insideZ);
  }
  this.moveOutside = function() {
    this.moveZ(outsideZ);
  }
  this.move = function(xPos, yPos) {
    this.xPos = xPos;
    this.yPos = yPos;
  }

  // Update position function
  this.updatePosition = function() {
    // TODO: Add an anchor condition
    this.zPos = lerp(this.zPos, this.intendedZ, 0.095);
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




/**
 * Box class
 */

 function Box(x, y, z, width, height, depth) {
  this.x = x;
  this.y = y;
  this.z = z;
  this.width = width;
  this.height = height;
  this.depth = depth;
 }
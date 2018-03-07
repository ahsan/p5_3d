var eiffel;
var xPos = 0;
var yPos = 0;
var zPos = 600;
var img;

var sw;
var switches = [];
var boxes = [];

function preload() {
  img = loadImage('./front.png');
  typeA = loadImage('./typeA.png');
  typeB = loadImage('./typeB.png');
}


function setup() {
  var canvas = createCanvas(1000, 800, WEBGL);
  canvas.parent('sketch-holder');

  // Create Switches
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

  // Create Box
  Array.prototype.push.apply(boxes,[
    //sides
    new MyBox(-430, 0, 0, 5, 400, 400, 30),
    new MyBox(430, 0, 0, 5, 400, 400, 30),

    //bottom and top
    new MyBox(0, -200, 0, 860, 5, 400, 0),
    new MyBox(0, 200, 0, 860, 5, 400, 0),

    //back
    new MyBox(0, 0, -400, 860, 400, 5, 15)

  ]);

}

function draw() {
  // camera(0, 0, 500, 0, 0, 0, 0, 1, 0);
  // camera(map(mouseX, 0, width, 300,-300), map(mouseY, 0, width, 250, -250), zPos, 0, 0, 0, 0, 1, 0);
  // pointLight(255, 255, 255, 0, 0, 100)
  ambientLight(255);

  background(255);

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
  if(sw)
    sw.toggleZ();
}


function drawBox() {
  // console.log(boxes.length)
  boxes.forEach(box => {
    box.draw();
  });
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
 function MyBox(x, y, z, width, height, depth, clr) {
  this.x = x;
  this.y = y;
  this.z = z;
  this.width = width;
  this.height = height;
  this.depth = depth;

  this.txtr = createGraphics(300, 300);
  this.txtr.background(clr);

  this.draw = function() {
    // console.log('inside box draw')
    push();
    texture(this.txtr);
    translate(x, y, z-(this.depth/2));
    box(width, height, depth);
    pop();
  }
 }
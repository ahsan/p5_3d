var eiffel;
var xPos = 0;
var yPos = 0;
var zPos = 600;
var img;

function preload() {
  img = loadImage('./front.png');
}


function setup() {
  createCanvas(1000, 800, WEBGL);
}

function draw() {
  camera(0, 0, 500, 0, 0, 0, 0, 1, 0);
  // camera(map(mouseX, 0, width, 300,-300), map(mouseY, 0, width, 250, -250), zPos, 0, 0, 0, 0, 1, 0);
  // pointLight(255, 255, 255, 0, 0, 100)
  ambientLight(255);

  background(120);


  push();
  translate(0, 0, -150);
  noStroke();
  // strokeWeight(1)
  // stroke(0)
  fill(255)
  plane(300, 300);
  pop();

  push();
  translate(0, 150, 0)
  rotateX(PI/2);
  noStroke();
  // strokeWeight(1)
  // stroke(0)
  fill(255)
  plane(300, 300)
  pop();

  var boxWidth = 175;
  var boxHeight = 15;

  push();
  fill(0);
  stroke(0)
  translate(xPos, yPos, 0);
  box(boxWidth, boxHeight, 100)
  pop();

  push();
  texture(img);
  translate(xPos, yPos, 51);
  plane(boxWidth, boxHeight);
  pop();

  pointLight(255, 255, 255, 0, 0, 100)
}


function mouseDragged(event) {
  // var z = event.clientY
  // zPos = map(z, 0, height, 1000, 100);
  // xPos = event.clientX;
  // yPos = event.clientY;

  xPos = map(event.clientX, 0, width, -300, 300);
  yPos = map(event.clientY, 0, height, -300, 300);


}



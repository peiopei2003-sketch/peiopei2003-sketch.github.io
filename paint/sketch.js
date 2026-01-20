let px=0;
let py=0;
let colorInput;

function setup() {
  createCanvas(
    100, 100);
  
  loadPixels();
  let pix =getItem('pixels');
  if (pix) {
    for(let p in pix){
      pixels[p]=pix[p];
    }

  }
  updatePixels();

  strokeWeight(10);

  colorInput=select('#color');
}

function draw() {
 // background(120,0,0);
  if (mouseIsPressed) {
    line(px,py,mouseX,mouseY);
    px=mouseX;
    py=mouseY;
  }

}

function mousePressed(){
  stroke(colorInput.value());
  px=mouseX;
  py=mouseY;
  point(mouseX,mouseY);
}

function mouseReleased(){
  console.log('マウス放されました')
  loadPixels();
  console.log(pixels);
  storeItem('pixels',pixels);
}

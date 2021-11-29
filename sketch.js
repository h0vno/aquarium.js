function setup() {
  createCanvas(1000, 730);
  background(89, 216, 255);
  var fishesLen, f, f2, i;
  
  for(i = 0; i < 20; i++){
    f2 = new Fish(random(10, width), random(0, height - 210));
    fishes.push(f2);
  }
  
  b = new Button(5, 535, 100, 100, "layer", 35, 1, 2); // menu -> x:0 y:530
  b2 = new Button(5, 640, 100, 100, "moveSpeed", 20, 1, 2); 
  b3 = new Button(110, 535, 100, 100, "addvalue: +1", 20, 1, 2); 
  b4 = new Button(110, 640, 100, 100, "addvalue: -1", 20, 1, 2);

}

var layer = 3, moveSpeed = 1, menuText, addvalue = 1;

var menu = function(){
  rect(0, 530, width, 200);
  
  textSize(15);
  text(frameCount, 19, 25);
  
  b.display();
  b2.display();
  b3.display();
  b4.display();
  
  menuText = ("layer: " + layer + "\nmoveSpeed: " + moveSpeed + "\n value: " + addvalue);
  
  fill(255);
  text(menuText, 275, 575);
}


var buttons = [];

var Button = function(posX, posY, widX, higY, head, textS, endlines, padding){
  this.posX = posX;
  this.posY = posY;
  this.width = widX;
  this.height = higY;
  this.text = head;
  this.endlines = endlines; // endline time used in text; text size multiplier 
  this.padding = padding;
  
  if(textS!=false) this.textS = textS; // text size
  else{
    textSize(this.textS);
    while(textWidth(this.text) > this.width){
      this.textS = this.textS - 1;
      textSize(this.textS);
    }
  }
  
  this.textS = this.textS * this.endlines - this.padding;
  
  
  this.display = function(){
    if (this.mouseIsOver()) fill(150); else fill(100);
    stroke(50);
    
    rect(this.posX, this.posY, this.width, this.height);
    fill(0);
    textSize(this.textS);
    
    textAlign(CENTER, CENTER);
    text(this.text, this.posX + this.width / 2, this.posY + this.height / 2);
  }
  
  
  this.mouseIsOver = function(){
    if(mouseX > this.posX  &&  mouseX < this.posX + this.width  &&  mouseY > this.posY  &&  mouseY < this.posY+ this.height)
      return true;
  }
  
  this.clicked = function(){
    
  }
  
}

var fishes = [];

var Fish = function(posX, posY, layer){
  this.posX = posX;
  this.posY = posY;
  this.layer = layer; // --> 1 - fast and big fishes; 2 - average speed and size; 3 - smallest and slowest
  
  this.size = random(1, 100);       // picks random size
  this.moveSpeed = this.size / 10;
  this.xSize = this.size / 100 * 119 + 10;
  this.ySize = this.size / 100 * 74 + 10;

  this.xSize = this.size / 100 * 119 + 10;
  this.ySize = this.size / 100 * 74 + 10;
    
  this.tailWidth = this.xSize/4; // tail
  this.tailHeight = this.ySize/2;
        
  this.r = random(10,255);  // picks random color
  this.g = random(10,255);
  this.b = random(10,255);

  this.eye = 33;
        
  this.move = function(){
    this.posX += this.moveSpeed;
  }
  
  
  this.display = function(){
    noStroke();
    fill(this.r, this.g, this.b);
    
    // body
    ellipse(this.posX, this.posY, this.xSize, this.ySize);
      
    // tail
    triangle(this.posX-this.xSize/2, this.posY,    
      this.posX - this.xSize / 2 - this.tailWidth, this.posY - this.tailHeight,
      this.posX - this.xSize / 2 - this.tailWidth, this.posY + this.tailHeight);
         
    // eye
    fill(this.eye);
    ellipse(this.posX + this.xSize / 4, this.posY, this.ySize / 5, this.ySize / 5);
  }
};

mouseClicked = function() {
  var f = new Fish(mouseX, mouseY);
  fishes.push(f);
  if(b.mouseIsOver())  layer+=addvalue;
  if(b2.mouseIsOver())  moveSpeed+=addvalue;
  if(b3.mouseIsOver())  addvalue++;
  if(b4.mouseIsOver())  addvalue--;
}

var draw = function() {
  background(89, 216, 255);
  
  fishesLen = fishes.length;
  for(i = 0; i < fishesLen; i++) { 
    fishes[i].display();
    fishes[i].move();
  }
  

  menu();
};
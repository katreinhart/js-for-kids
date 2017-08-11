
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

const width = canvas.width;
const height = canvas.height;

const widthInBricks = 10;
const heightInBricks = 20;

const margin = 10;
const brickSize = 25;

ctx.strokeRect(0, 0, width, height);
ctx.strokeRect(margin, margin, width-2*margin, height-2*margin);

const keyNames = {
  37: "left",
  38: "up",
  39: "right",
  40: "down",
  32: "space"
};

const blocks = ["sq", "ls", "rs", "ll", "rl", "t", "i"];
const orientations = [0, 1, 2, 3];

var Block = function(type) {
  this.type = type;
  this.xPos = 6;
  this.yPos = 0;
  this.orientation = 0;
}

const drawBrick = function(color, xPos, yPos) {
  ctx.strokeStyle = "Dark" + color;
  ctx.strokeRect(xPos * brickSize + margin, yPos * brickSize + margin, brickSize, brickSize);
  ctx.fillStyle = color;
  ctx.fillRect(xPos * brickSize + margin, yPos * brickSize + margin, brickSize, brickSize);
}

Block.prototype.draw = function() {
  switch(this.type) {
    case "sq":
      drawBrick("Orange", this.xPos, this.yPos);
      drawBrick("Orange", this.xPos + 1, this.yPos);
      drawBrick("Orange", this.xPos, this.yPos + 1);
      drawBrick("Orange", this.xPos + 1, this.yPos + 1);
      break;

    case "ls":
      if((this.orientation === 0) || (this.orientation === 2)){
        drawBrick("Blue", this.xPos, this.yPos);
        drawBrick("Blue", this.xPos+1, this.yPos);
        drawBrick("Blue", this.xPos+1, this.yPos+1);
        drawBrick("Blue", this.xPos+2, this.yPos+1);
      } else {
        drawBrick("Blue", this.xPos, this.yPos);
        drawBrick("Blue", this.xPos, this.yPos+1);
        drawBrick("Blue", this.xPos-1, this.yPos+1);
        drawBrick("Blue", this.xPos-1, this.yPos+2);
      }
      break;

    case "rs":
      if((this.orientation === 0) || (this.orientation === 2)){
        drawBrick("Green", this.xPos, this.yPos);
        drawBrick("Green", this.xPos+1, this.yPos);
        drawBrick("Green", this.xPos, this.yPos+1);
        drawBrick("Green", this.xPos-1, this.yPos+1);
      } else {
        drawBrick("Green", this.xPos, this.yPos);
        drawBrick("Green", this.xPos, this.yPos+1);
        drawBrick("Green", this.xPos+1, this.yPos+1);
        drawBrick("Green", this.xPos+1, this.yPos+2);
      }
      break;

    case "ll":
      if(this.orientation === 0) {
        drawBrick("Yellow", this.xPos, this.yPos);
        drawBrick("Yellow", this.xPos, this.yPos+1);
        drawBrick("Yellow", this.xPos, this.yPos+2);
        drawBrick("Yellow", this.xPos+1, this.yPos+2);
      } else if (this.orientation === 1) {
        drawBrick("Yellow", this.xPos-1, this.yPos);
        drawBrick("Yellow", this.xPos, this.yPos);
        drawBrick("Yellow", this.xPos+1, this.yPos);
        drawBrick("Yellow", this.xPos-1, this.yPos+1);
      } else if (this.orientation === 2) {
        drawBrick("Yellow", this.xPos, this.yPos);
        drawBrick("Yellow", this.xPos+1, this.yPos);
        drawBrick("Yellow", this.xPos+1, this.yPos+1);
        drawBrick("Yellow", this.xPos+1, this.yPos+2);
      } else {
        drawBrick("Yellow", this.xPos+1, this.yPos);
        drawBrick("Yellow", this.xPos+1, this.yPos+1);
        drawBrick("Yellow", this.xPos, this.yPos+1);
        drawBrick("Yellow", this.xPos-1, this.yPos+1);
      }
      break;

    case "rl":
      if(this.orientation === 0) {
        drawBrick("Purple", this.xPos, this.yPos);
        drawBrick("Purple", this.xPos, this.yPos+1);
        drawBrick("Purple", this.xPos, this.yPos+2);
        drawBrick("Purple", this.xPos-1, this.yPos+2);
      } else if (this.orientation === 1) {
        drawBrick("Purple", this.xPos-1, this.yPos);
        drawBrick("Purple", this.xPos-1, this.yPos+1);
        drawBrick("Purple", this.xPos, this.yPos+1);
        drawBrick("Purple", this.xPos+1, this.yPos+1);
      } else if (this.orientation === 2) {
        drawBrick("Purple", this.xPos+1, this.yPos);
        drawBrick("Purple", this.xPos, this.yPos);
        drawBrick("Purple", this.xPos, this.yPos+1);
        drawBrick("Purple", this.xPos, this.yPos+2);
      } else {
        drawBrick("Purple", this.xPos-1, this.yPos);
        drawBrick("Purple", this.xPos, this.yPos);
        drawBrick("Purple", this.xPos+1, this.yPos);
        drawBrick("Purple", this.xPos+1, this.yPos+1);
      }
      break;

    case "t":
      if(this.orientation === 0) {
        drawBrick("Gray", this.xPos-1, this.yPos);
        drawBrick("Gray", this.xPos, this.yPos);
        drawBrick("Gray", this.xPos+1, this.yPos);
        drawBrick("Gray", this.xPos, this.yPos+1);
      } else if (this.orientation === 1) {
        drawBrick("Gray", this.xPos, this.yPos);
        drawBrick("Gray", this.xPos, this.yPos+1);
        drawBrick("Gray", this.xPos, this.yPos+2);
        drawBrick("Gray", this.xPos+1, this.yPos+1);
      } else if (this.orientation === 2) {
        drawBrick("Gray", this.xPos, this.yPos);
        drawBrick("Gray", this.xPos-1, this.yPos+1);
        drawBrick("Gray", this.xPos, this.yPos+1);
        drawBrick("Gray", this.xPos+1, this.yPos+1);
      } else if (this.orientation === 3) {
        drawBrick("Gray", this.xPos, this.yPos);
        drawBrick("Gray", this.xPos, this.yPos+1);
        drawBrick("Gray", this.xPos, this.yPos+2);
        drawBrick("Gray", this.xPos-1, this.yPos+1);
      }
      break;

    case "i":
      if((this.orientation === 0) || (this.orientation === 2)){
        drawBrick("Red", this.xPos, this.yPos);
        drawBrick("Red", this.xPos, this.yPos+1);
        drawBrick("Red", this.xPos, this.yPos+2);
        drawBrick("Red", this.xPos, this.yPos+3);
      } else {
        drawBrick("Red", this.xPos, this.yPos);
        drawBrick("Red", this.xPos+1, this.yPos);
        drawBrick("Red", this.xPos+2, this.yPos);
        drawBrick("Red", this.xPos+3, this.yPos);
      }
      break;
    default:
      break;
  }
}

Block.prototype.move = function(dir) {
  if(dir === "left"){
    this.xPos --;
  } else if (dir === "right") {
    this.xPos ++;
  }
}

Block.prototype.rotate = function() {
  this.orientation++;
  if(this.orientation > 3) this.orientation -= 4;
  console.log(this.orientation);
}

// Block.prototype.drop = function() {
//
// }




// let gameTimer = setInterval(() => {
  ctx.fillStyle = "White";
  ctx.fillRect(margin, margin, width-2*margin, height-2*margin);

  const block = new Block("t");
  block.draw();

  $("body").keydown((e) => {
    if(keyNames[e.keyCode] === "up") {
      block.rotate();
    }
    block.move(keyNames[e.keyCode]);
    ctx.fillStyle = "White";
    ctx.fillRect(margin, margin, width-2*margin, height-2*margin);
    block.draw();
  });
  // block.move();

  ctx.strokeStyle = "DarkGrey";

  ctx.strokeRect(0, 0, width, height);
  ctx.strokeRect(margin, margin, width-2*margin, height-2*margin);
// }, 30)

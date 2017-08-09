let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let width = canvas.width;
let height = canvas.height;

// components: bricks, ball, paddle
// bricks are an array of rectangles.
// can add more rows of bricks later.

var keyNames = {
  37: "left",
  39: "right",
  32: "space"
};

const brickWidth = 50;
const brickHeight = 15;
const brickSpace = 15;

var circle = function(x, y, radius, fill) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI*2, false);
  if(fill) ctx.fill();
  else ctx.stroke();
}

var rectangle = function(x, y, length, fill) {
  ctx.rect(x, y, length, 8);
  ctx.fill();
}

var Brick = function(x, y) {
  this.x = x;
  this.y = y;
  hidden = false;
}

Brick.prototype.draw = function() {
  if(!this.hidden){
    ctx.rect(this.x, this.y, brickWidth, brickHeight);
    ctx.fill();
  }
}

Brick.prototype.collide = function(ball) {
  if(this.hidden === true)
    return;
  if((ball.y <= this.y + brickHeight) && ((ball.x >= this.x) && (ball.x <= this.x + brickWidth))) {
    ball.ySpeed = -ball.ySpeed;
    this.delete();
  }
}

Brick.prototype.delete = function() {
  console.log("hit brick");
  this.hidden = true;
}

var Ball = function() {
  this.x = width/2;
  this.y = height/2;
  this.xSpeed = 5;
  this.ySpeed = -10;
}

Ball.prototype.draw = function() {
  circle(this.x, this.y, 10, true);
}

Ball.prototype.move = function() {
  this.x += this.xSpeed;
  this.y += this.ySpeed;

  for(i=0; i<12; i++) { // check collisions with bricks
    if(bricks[i].collide(ball)){
      bricks[i].delete();

    }
  }

  if((this.x < 6) || (this.x > (width - 12))){ // hit left or right walls
    this.xSpeed = -this.xSpeed;
  }
  else if (this.y < 6) { // hit top of screen
    this.ySpeed = -this.ySpeed;
  } else if((this.y > (height - 30)) && ((this.x >= paddle.x) && (this.x <= (paddle.x + paddle.paddleWidth)))) {
    this.ySpeed = -this.ySpeed;
  }
}

var Paddle = function() {
  this.paddleWidth = 100;
  this.x = width/2;
  this.speed = 20;
}

Paddle.prototype.draw = function() {
  rectangle(this.x, height-20, this.paddleWidth, true);
}

Paddle.prototype.move = function(dir) {
  if(dir === 'left'){
    this.x -= this.speed;
  }
  else if (dir === 'right'){
    this.x += this.speed;
  }
}

var gameOver = function() {
  ball.xSpeed = 0;
  ball.ySpeed = 0;
  console.log("Game over");
  clearTimeout(gameInterval);
}

let ball = new Ball();
let paddle = new Paddle();

let bricks = [];

for(i=0; i<12; i++) {
  let newBrick = new Brick(brickSpace + i*(brickWidth + brickSpace), brickWidth);
  bricks[i] = newBrick;
}


$("body").keydown((e) => {
  var dir = keyNames[e.keyCode];
  paddle.move(dir);

  if(dir === 'space') {
    console.log(bricks);
  }
});

var gameInterval = setInterval(() => {
  ctx.clearRect(0, 0, width, height);

  ball.draw();
  paddle.draw();
  for(i=0; i<12; i++) {
    bricks[i].draw();
  }

  ball.move();

  if(ball.y > height){
    gameOver();
  }

  ctx.strokeRect(0, 0, width, height);
}, 30);

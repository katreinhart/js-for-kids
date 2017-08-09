let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let width = canvas.width;
let height = canvas.height;

// components: bricks, ball, paddle
// bricks are an array of arrays.

var keyNames = {
  37: "left",
  39: "right",
  32: "space"
};

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
}

Brick.prototype.draw = function() {
  ctx.rect(this.x, this.y, 25, 12);
  ctx.fill();
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
  if((this.x < 6) || (this.x > (width - 12))){ // hit left or right walls
    this.xSpeed = -this.xSpeed;
  }
  else if (this.y < 6) { // hit top of screen
    this.ySpeed = -this.ySpeed;
  } else if((this.y > (height - 30)) && ((this.x >= paddle.x) && (this.x <= (paddle.x + paddle.paddleWidth)))) {
    console.log("Hit!");
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

for(i=0; i<10; i++) {
  let newBrick = new Brick(i*30, 25);
  bricks[i] = newBrick;
}


$("body").keydown((e) => {
  var dir = keyNames[e.keyCode];
  paddle.move(dir);
});

var gameInterval = setInterval(() => {
  ctx.clearRect(0, 0, width, height);

  ball.draw();
  paddle.draw();
  for(i=0; i<10; i++) {
    bricks[i].draw();
  }

  ball.move();

  if(ball.y > height){
    gameOver();
  }

  ctx.strokeRect(0, 0, width, height);
}, 30);

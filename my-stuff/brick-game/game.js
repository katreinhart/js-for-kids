

let canvas = document.getElementById("canvas1");
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
const winningScore = 24;

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
  this.hidden = true;
  score++;
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
    if(bricks2[i].collide(ball)){
      bricks2[i].delete();
      score++;
    }
    if(bricks1[i].collide(ball)){
      bricks1[i].delete();
      score ++;
    }
  }

  if((this.x < 6) || (this.x > (width - 12))){
    // hit left or right walls
    this.xSpeed = -this.xSpeed;
  }
  else if (this.y < 6) {
    // hit top of screen
    this.ySpeed = -this.ySpeed;
  } else if((this.y > (height - 30)) && ((this.x >= paddle.x) && (this.x <= (paddle.x + 5)))) {
    // Hit left edge of paddle;
    this.ySpeed = -this.ySpeed;
    this.xSpeed -= Math.floor(Math.random()*2+2);
  } else if((this.y > (height - 30)) && ((this.x >= (paddle.x + paddle.paddleWidth - 5)) && (this.x <= (paddle.x + paddle.paddleWidth)))) {
    // Hit right edge of paddle;
    this.ySpeed = -this.ySpeed;
    this.xSpeed += Math.floor(Math.random()*2+2);
  } else if((this.y > (height - 30)) && ((this.x >= paddle.x) && (this.x <= (paddle.x + paddle.paddleWidth)))) {
    // Hit in the middle of paddle;
    this.ySpeed = -this.ySpeed;
  }
}

var Paddle = function() {
  this.paddleWidth = 100;
  this.x = width/2;
  this.speed = 30;
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

  console.log("Game over");
  clearTimeout(gameInterval);

  ctx.font = "60px Courier";
  ctx.fillStyle = "Black";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("Game Over", width / 2, height / 2);
}

var drawScore = function() {
  ctx.font = "20px Courier";
  ctx.fillStyle = "Black";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("Score: " + score, 15, 15);

  ctx.textAlign = "right";
  ctx.fillText("Lives: ", width-100, 15);
  for(i=0; i < numLives; i++){
    circle((width-(i+1)*35), 26, 8, true);
  }
}

var youWin = function() {
  clearTimeout(gameInterval);

  ctx.font = "60px Courier";
  ctx.fillStyle = "Black";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("You Win!", width / 2, height / 2);
}

// Instantiate the Game!

let ball = new Ball();
let paddle = new Paddle();
let numLives = 3;

let score = 0;
let bricks1 = [];
let bricks2 = [];

for(i=0; i<12; i++) {
  bricks1[i] = new Brick(brickSpace + i*(brickWidth + brickSpace), brickWidth);
  bricks2[i] = new Brick(brickSpace + i*(brickWidth + brickSpace), brickWidth + brickSpace + 25);
}

$("body").keydown((e) => {
  var dir = keyNames[e.keyCode];
  paddle.move(dir);
});



var gameInterval = setInterval(() => {
  ctx.clearRect(0, 0, width, height);

  drawScore();

  if(score === winningScore) {
    youWin();
  }

  ball.draw();
  paddle.draw();

  for(i=0; i<12; i++) {
    bricks1[i].draw();
    bricks2[i].draw();
  }

  ball.move();

  if(ball.y > height){
    numLives--;
    ball = new Ball();

  }

  if(numLives < 0){
    gameOver();
  }


}, 30);

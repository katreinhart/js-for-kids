
var canvas = document.getElementById("canvas1");
var ctx = canvas.getContext("2d");

var width = canvas.width;
var height = canvas.height;
var numBombs = 10;
var numRows = 10;
var numCols = 10;
var blockSize = 30;
var gutter = 10;
var score = 0;

var circle = function(x, y, radius, fill) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI*2, false);
  if(fill) ctx.fill();
  else ctx.stroke();
}

var Square = function(x, y) {
  this.bomb = false;
  this.clear = false;
  this.x = x;
  this.y = y;
}

Square.prototype.click = function() {
  if(this.bomb) {
    circle(this.x* blockSize + gutter + blockSize/2, this.y* blockSize + gutter + blockSize/2, 10, true);
    console.log("kaboom!");
  } else {
    this.countNeighbors();
    if(this.neighbs === 0) {
      grid.clear(this.x, this.y);
    }
    this.clear = true;
    this.draw();
  }
}

Square.prototype.draw = function() {
  if(this.clear) {
    this.reveal();
  }
  ctx.strokeRect((this.x * blockSize + gutter), this.y * blockSize + gutter, blockSize, blockSize);
}

Square.prototype.reveal = function() {
  if(this.neighbs === 0){
    ctx.fillStyle = "LightGray";
    ctx.fillRect((this.x * blockSize + gutter), this.y * blockSize + gutter, blockSize, blockSize);
    ctx.strokeRect((this.x * blockSize + gutter), this.y * blockSize + gutter, blockSize, blockSize);

    
  }
  if(this.neighbs !== 0){
    ctx.font = "24px Courier";
    ctx.fillStyle = "Black";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText(this.neighbs, this.x* blockSize + gutter + blockSize/4, this.y* blockSize + gutter);
  }
}

Square.prototype.countNeighbors = function() {
  // need to check: (this.x-1, this.y-1), (this.x, this.y-1), (this.x+1, this.y-1) ... (this.x+1, this.y+1)
  this.neighbs = 0;

  // this is messy, but i can't think of a more elegant solution this early in the AM
  if(this.y > 0){
    if(this.x > 0) {
      if(grid.array[this.x-1][this.y-1].bomb) this.neighbs++;
    }
    if(grid.array[this.x  ][this.y-1].bomb) this.neighbs++;
    if(this.x < 9) {
      if(grid.array[this.x+1][this.y-1].bomb) this.neighbs++;
    }
  }
  if(this.x > 0) {
    if(grid.array[this.x-1][this.y].bomb) this.neighbs++;
  }
  if(this.x < 9) {
    if(grid.array[this.x+1][this.y].bomb) this.neighbs++;
  }

  if(this.y < 9) {
    if(this.x > 0) {
      if(grid.array[this.x-1][this.y+1].bomb) this.neighbs++;
    }
    if(grid.array[this.x  ][this.y+1].bomb) this.neighbs++;
    if(this.x < 9) {
      if(grid.array[this.x+1][this.y+1].bomb) this.neighbs++;
    }
  }

  return this.neighbs;
}

var Grid = function() {
// instantiate the grid
  this.array = new Array(10);
  for(i=0; i<10; i++){
    this.array[i] = new Array(10);
    for(j=0; j<10; j++){
      this.array[i][j] = new Square(i, j);
      this.array[i][j].draw();
    }
  }
// set the bombs
  this.bombCount = 0;
  while(this.bombCount < 10) {
    var x = Math.floor(Math.random() * 10);
    var y = Math.floor(Math.random() * 10);
    if(!this.array[x][y].bomb){
      this.array[x][y].bomb = true;
      this.bombCount++;
      // this.array[x][y].draw();
    }
  }

}

Grid.prototype.clear = function(x, y) {
  // find the contiguous 0 squares
  // clear them and their immediate neighbors
  this.array[x][y].clear = true;
  this.array[x][y].draw();

  // this is messy, but i can't think of a more elegant solution this early in the AM
  if(y > 0){
    if(x > 0) {
      if((this.array[x-1][y-1].countNeighbors() === 0) && !(this.array[x-1][y-1].clear)) {
        this.clear(x-1, y-1);
      } else {
        this.array[x-1][y-1].reveal();
      }
    }
    if((this.array[x ][y-1].countNeighbors() === 0) && !(this.array[x][y-1].clear)) {
      this.clear(x, y-1);
    } else {
      this.array[x][y-1].reveal();
    }
    if(x < 9) {
      if((this.array[x+1][y-1].countNeighbors() === 0) && !(this.array[x+1][y-1].clear)) {
        this.clear(x+1, y-1);
      } else {
        this.array[x+1][y-1].reveal();
      }
    }
  }
  if(x > 0) {
    if((this.array[x-1][y].countNeighbors() === 0) && !(this.array[x-1][y].clear)) {
      this.clear(x-1, y);
    } else {
      this.array[x-1][y].reveal();
    }
  }
  if(x < 9) {
    if((this.array[x+1][y].countNeighbors() === 0) && !(this.array[x+1][y].clear)) {
      this.clear(x+1, y);
    } else {
      this.array[x+1][y].reveal();
    }
  }

  if(y < 9) {
    if(x > 0) {
      if((this.array[x-1][y+1].countNeighbors() === 0) && !(this.array[x-1][y+1].clear)) {
        this.clear(x-1, y+1);
      } else {
        this.array[x-1][y+1].reveal();
      }
    }
    if((this.array[x  ][y+1].countNeighbors() === 0) && !(this.array[x][y+1].clear)) {
      this.clear(x, y+1);
    } else {
      this.array[x][y+1].reveal();
    }
    if(x < 9) {
      if((this.array[x+1][y+1].countNeighbors() === 0) && !(this.array[x+1][y+1].clear)) {
        this.clear(x+1, y+1);
      } else {
        this.array[x+1][y+1].reveal();
      }
    }
  }
}

var displayScore = function() {
  ctx.font = "20px Courier";
  ctx.fillStyle = "Black";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("Score: " + score, 15, height-30);
}

ctx.strokeRect(0, 0, width, height);
var grid = new Grid();

displayScore();

$("body").click(function(e) {
  var x = Math.floor((e.pageX - gutter) / blockSize);
  var y = Math.floor((e.pageY - gutter) / blockSize);
  if((x > 9) || (y > 9)) {
    return;
  }

  grid.array[x][y].click();
  displayScore();

})

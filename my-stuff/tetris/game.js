
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

const width = canvas.width;
const height = canvas.height;

const widthInBricks = 10;
const heightInBricks = 20;

const margin = 10;
const brickSize = 25;


const keyNames = {
  37: "left",
  38: "up",
  39: "right",
  40: "down",
  32: "space"
};

const blocks = ["sq", "ls", "rs", "ll", "rl", "t", "i"];
// const colors = ["Orange", "Blue", "Green", "Yellow", "Purple", "Gray", "Red"];
const orientations = [0, 1, 2, 3];

const Block = function(type) {
  this.type = type;
  this.xPos = 6;
  this.yPos = 0;
  this.orientation = 0;
  this.active = true;

  this.components = new Array(4);
 //  set initial colors
  switch(type) {
    case "sq":
      this.color = "Orange";
      break;
    case "ls":
      this.color = "Blue";
      break;
    case "rs":
      this.color = "Green";
      break;
    case "ll":
      this.color = "Yellow";
      break;
    case "rl":
      this.color = "Purple";
      break;
    case "t":
      this.color = "Gray";
      break;
    case "i":
      this.color = "Red";
      break;
    default:
      break;
  }
  this.update();

}

Block.prototype.update = function() {
  // this function will update the coordinates of the bricks in the block
  // based on changes in the x, y and rotation of the block.

  switch(this.type) {
    case "sq":
      this.components[0] = [this.xPos, this.yPos];
      this.components[1] = [this.xPos + 1, this.yPos];
      this.components[2] = [this.xPos, this.yPos + 1];
      this.components[3] = [this.xPos + 1, this.yPos + 1];

      break;

    case "ls":
      if((this.orientation === 0) || (this.orientation === 2)){
        this.components[0] = [this.xPos, this.yPos];
        this.components[1] = [this.xPos+1, this.yPos];
        this.components[2] = [this.xPos+1, this.yPos+1];
        this.components[3] = [this.xPos+2, this.yPos+1];
      } else {
        this.components[0] = [this.xPos, this.yPos];
        this.components[1] = [this.xPos, this.yPos+1];
        this.components[2] = [this.xPos-1, this.yPos+1];
        this.components[3] = [this.xPos-1, this.yPos+2];
      }
      break;

    case "rs":
      if((this.orientation === 0) || (this.orientation === 2)){
        this.components[0] = [this.xPos, this.yPos];
        this.components[1] = [this.xPos+1, this.yPos];
        this.components[2] = [this.xPos, this.yPos+1];
        this.components[3] = [this.xPos-1, this.yPos+1];
      } else {
        this.components[0] = [this.xPos, this.yPos];
        this.components[1] = [this.xPos, this.yPos+1];
        this.components[2] = [this.xPos+1, this.yPos+1];
        this.components[3] = [this.xPos+1, this.yPos+2];
      }
      break;

    case "ll":
      if(this.orientation === 0) {
        this.components[0] = [this.xPos, this.yPos];
        this.components[1] = [this.xPos, this.yPos+1];
        this.components[2] = [this.xPos, this.yPos+2];
        this.components[3] = [this.xPos+1, this.yPos+2];
      } else if (this.orientation === 1) {
        this.components[0] = [this.xPos-1, this.yPos];
        this.components[1] = [this.xPos, this.yPos];
        this.components[2] = [this.xPos+1, this.yPos];
        this.components[3] = [this.xPos-1, this.yPos+1];
      } else if (this.orientation === 2) {
        this.components[0] = [this.xPos, this.yPos];
        this.components[1] = [this.xPos+1, this.yPos];
        this.components[2] = [this.xPos+1, this.yPos+1];
        this.components[3] = [this.xPos+1, this.yPos+2];
      } else {
        this.components[0] = [this.xPos+1, this.yPos];
        this.components[1] = [this.xPos+1, this.yPos+1];
        this.components[2] = [this.xPos, this.yPos+1];
        this.components[3] = [this.xPos-1, this.yPos+1];
      }
      break;

    case "rl":
      if(this.orientation === 0) {
        this.components[0] = [this.xPos, this.yPos];
        this.components[1] = [this.xPos, this.yPos+1];
        this.components[2] = [this.xPos, this.yPos+2];
        this.components[3] = [this.xPos-1, this.yPos+2];
      } else if (this.orientation === 1) {
        this.components[0] = [this.xPos-1, this.yPos];
        this.components[1] = [this.xPos-1, this.yPos+1];
        this.components[2] = [this.xPos, this.yPos+1];
        this.components[3] = [this.xPos+1, this.yPos+1];
      } else if (this.orientation === 2) {
        this.components[0] = [this.xPos+1, this.yPos];
        this.components[1] = [this.xPos, this.yPos];
        this.components[2] = [this.xPos, this.yPos+1];
        this.components[3] = [this.xPos, this.yPos+2];
      } else {
        this.components[0] = [this.xPos-1, this.yPos];
        this.components[1] = [this.xPos, this.yPos];
        this.components[2] = [this.xPos+1, this.yPos];
        this.components[3] = [this.xPos+1, this.yPos+1];
      }
      break;

    case "t":
      if(this.orientation === 0) {
        this.components[0] = [this.xPos-1, this.yPos];
        this.components[1] = [this.xPos, this.yPos];
        this.components[2] = [this.xPos+1, this.yPos];
        this.components[3] = [this.xPos, this.yPos+1];
      } else if (this.orientation === 1) {
        this.components[0] = [this.xPos, this.yPos];
        this.components[1] = [this.xPos, this.yPos+1];
        this.components[2] = [this.xPos, this.yPos+2];
        this.components[3] = [this.xPos+1, this.yPos+1];
      } else if (this.orientation === 2) {
        this.components[0] = [this.xPos, this.yPos];
        this.components[1] = [this.xPos-1, this.yPos+1];
        this.components[2] = [this.xPos, this.yPos+1];
        this.components[3] = [this.xPos+1, this.yPos+1];
      } else if (this.orientation === 3) {
        this.components[0] = [this.xPos, this.yPos];
        this.components[1] = [this.xPos, this.yPos+1];
        this.components[2] = [this.xPos, this.yPos+2];
        this.components[3] = [this.xPos-1, this.yPos+1];
      }
      break;

    case "i":
      if((this.orientation === 0) || (this.orientation === 2)){
        this.components[0] = [this.xPos, this.yPos];
        this.components[1] = [this.xPos, this.yPos+1];
        this.components[2] = [this.xPos, this.yPos+2];
        this.components[3] = [this.xPos, this.yPos+3];
      } else {
        this.components[0] = [this.xPos, this.yPos];
        this.components[1] = [this.xPos+1, this.yPos];
        this.components[2] = [this.xPos+2, this.yPos];
        this.components[3] = [this.xPos+3, this.yPos];
      }
      break;
    default:
      break;
  }
}

const drawBrick = function(color, xPos, yPos) {
  ctx.strokeStyle = "Dark" + color;
  ctx.strokeRect(xPos * brickSize + margin, yPos * brickSize + margin, brickSize, brickSize);
  ctx.fillStyle = color;
  ctx.fillRect(xPos * brickSize + margin, yPos * brickSize + margin, brickSize, brickSize);
}

Block.prototype.display = function() {
  for(let i=0; i<4; i++) {
    drawBrick(this.color, this.components[i][0], this.components[i][1]);
  }
}

Block.prototype.move = function(dir) {
  if(dir === "left"){
    // check each component and make sure it is not at edge of screen
    for(let i=0; i<4; i++){
      if(this.components[i][0] === 0) {
        return;
      }
    }
    this.xPos --;
    this.update();
  } else if (dir === "right") {
    for(let i=0; i<4; i++) {
      if(this.components[i][0] > widthInBricks) {
        return;
      }
    }
    this.xPos ++;
    this.update();
  } else if(dir === "up") {
    this.rotate();
    this.update();
  }
}

Block.prototype.rotate = function() {
  this.orientation++;
  if(this.orientation > 3) this.orientation -= 4;
}

Block.prototype.moveDown = function() {
  
  if(this.yPos < (heightInBricks)) {
    this.yPos++;
    this.update();
  }
}

const GameBoard = function() {
  this.board = new Array(heightInBricks);
  for(let i=0; i<heightInBricks; i++) {
    this.board[i] = new Array(widthInBricks);
    for(let j=0; j<widthInBricks; j++) {
      this.board[i][j] = 0;
    }
  }
}

// GameBoard.prototype.add(block) {
//
// }

// Gameboard.prototype.deleteRow(row) {
//
// }

GameBoard.prototype.draw = function() {
  for(let i=0; i<heightInBricks; i++) {
    for (let j=0; j<widthInBricks; j++) {
      if(this.board[i][j] !== 0) {
        console.log("asdf");
      }
    }
  }
}

const drawScreen = function() {
  ctx.fillStyle = "White";
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = "DarkGrey";
  ctx.strokeRect(0, 0, width, height);
  ctx.strokeRect(margin, margin, width-2*margin, heightInBricks * brickSize);
}


const gameBoard = new GameBoard();
gameBoard.draw();

// let gameTimer = setInterval(() => {

// set the game screen
  drawScreen();

// select a random block
  let rand = Math.floor(Math.random() * 7);
  let activeBlock = new Block(blocks[rand]);
  activeBlock.display();

  let blockTimer = setInterval(() => {
    activeBlock.moveDown();
    drawScreen();
    activeBlock.update();
    activeBlock.display();
  }, 200);

// listen for key press to rotate or move block
  $("body").keydown((e) => {
    activeBlock.move(keyNames[e.keyCode]);
// refresh the game screen before re-drawing block
    drawScreen();
    activeBlock.display();
  });



// }, 200)

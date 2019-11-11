var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var mainTheme = '#ff6c00';
var audio = new Audio('break.wav');

var x = canvas.width/2;
var y = canvas.height - 30;
var dx = 5;
var dy = -5;

var ballRadius = 10;
var paddleHeight = 10;
var paddleWidth = 80;
var paddleX = (canvas.width - paddleWidth)/2;

var leftPressed = false;
var rightPressed = false;
var paused = false;

var brickRowCount = 3;
var brickColumnCount = 8;
var brickWidth = 80;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 45;

var bricks = [];
for(var c = 0; c<brickColumnCount; c++){
  bricks[c] = [];
  for(var r = 0; r<brickRowCount; r++){
    bricks[c][r] = { x: 0, y: 0, status:1 };
  }
}

var score = 0;
var lives = 3;
var multiplier = 0;
var bricksLeft = brickRowCount * brickColumnCount;

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e){
  var relativeX = e.clientX - canvas.offsetLeft;
  if(relativeX > 0 && relativeX < canvas.width  && !paused){
    paddleX = relativeX - paddleWidth/2;
  }
}

function keyDownHandler(e){
  if(e.keyCode == 37){
    leftPressed = true;
  }else if(e.keyCode == 39){
    rightPressed = true;
  }else if(e.keyCode == 80){
	paused = !paused;
  }
}
function keyUpHandler(e){
  if(e.keyCode == 37){
    leftPressed = false;
  }else if(e.keyCode == 39){
    rightPressed = false;
  }
}

function collisionDetection() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1){
              if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                  dy = -dy;
                  b.status = 0;
				  multiplier++;
                  score+=100*multiplier;
				  bricksLeft--;
				  if(audio.ended){
					audio.play();
				  }else{
					audio.load(); 
					audio.play();
				  }				  
                  if(bricksLeft === 0){
                    alert('You win! \nYour score was ' + score);
                    document.location.reload();
                  }
              }
            }
        }
    }
}

function drawScore(){
  context.font = '25px Impact';
  context.fillStyle = mainTheme;
  context.fillText("Score: " + score, 8, 25);
}

function drawLives(){
  context.font = '25px Impact';
  context.fillStyle = mainTheme;
  context.fillText("Lives: " + lives, canvas.width-85, 25);
}

function drawMultiplier(){
	context.font = '45px Impact';
	context.fillStyle = mainTheme;
	if(multiplier>1){
		context.fillText("x" + multiplier, (canvas.width/2)-45, canvas.height/2);
	}
}

function drawBall(){
  context.beginPath();
  context.arc(x, y, ballRadius, 0, Math.PI*2);
  context.fillStyle = mainTheme;
  context.fill();
  context.closePath();
}

function drawPaddle(){
  context.beginPath();
  context.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
  context.fillStyle = mainTheme;
  context.fill();
  context.closePath();
}

function drawBricks(){
  for(var c = 0;c < brickColumnCount; c++){
    for(var r = 0;r < brickRowCount; r++){
      if(bricks[c][r].status == 1){
        var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
        var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        context.beginPath();
        context.rect(brickX, brickY, brickWidth, brickHeight);
        context.fillStyle = mainTheme;
        context.fill();
        context.closePath();
      }
    }
  }
}

function draw(){
  context.clearRect(0,0,canvas.width,canvas.height);
  drawBricks();
  drawBall();
  drawScore();
  drawLives();
  drawPaddle();
  collisionDetection();
  drawMultiplier();
  if(x + dx > canvas.width - ballRadius || x + dx < ballRadius){
    dx = -dx;
  }
  if(y + dy < ballRadius){
    dy = -dy;
  }else if(y + dy > canvas.height - ballRadius){
    if(x > paddleX && x < paddleX + paddleWidth){
      dy = -dy;
      dx = -1*0.15*(paddleX + paddleWidth/2 - x);
	  multiplier = 0;
	  audio.play();
    }else{
      lives--;
	  multiplier = 0;
      if(!lives){
        alert("GAME OVER");
        document.location.reload();
      }else{
        x = canvas.width/2;
        y = canvas.height-30;
		dx = 5;
		dy = -5;	
        paddleX = (canvas.width-paddleWidth)/2;
      }
    }
  }

  if(!paused){
	if(leftPressed && paddleX > 0){
      paddleX -=7;
    }else if (rightPressed && paddleX < canvas.width - paddleWidth) {
      paddleX +=7;
    }

    x += dx;
    y += dy;  
  }

  requestAnimationFrame(draw);
}

draw();

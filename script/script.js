let field = document.querySelector('#field');
let racket = document.querySelector('#racket');
let ball = document.querySelector('#ball');
let bricksArr = [];
let speedX = 0;
let speedY = 0;
let fieldW = field.getBoundingClientRect().width;
let fieldH = field.getBoundingClientRect().height;
let ballX = fieldW / 2;
let ballY = fieldH / 2;
let racketX = fieldW / 2 - 30;
const LEFT = 37;
const RIGHT = 39;
const SPACE = 32;
let lifes = 3;
let start, massage;



function Brick($class) {
    this.alive = true;
    this.HEIGHT = 20;
    this.element = document.createElement('div');
    this.$class = $class;

    this.fallDown = function () {
        /* */
    }

    this.appendSelf = function (iterationX, iterationY, widthBrick, container) {
        let brick = this.element;
        brick.className = this.$class;
        brick.style.height = this.HEIGHT + 'px';
        brick.style.width = (container.getBoundingClientRect().width / widthBrick - 1) + 'px';
        brick.style.left = (parseInt(brick.style.width) * iterationX + iterationX) + 'px';
        brick.style.top = (parseInt(brick.style.height) * iterationY + iterationY) + 'px';
        container.appendChild(brick);
    }
}

function createBricks(row, bricks) {
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < bricks; j++) {
            let brick = new Brick('brick');
            brick.appendSelf(j, i, bricks, field)
        }
    }
}

function createGameArea() {
    createBricks(4, 10);
    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';
    racket.style.left = racketX + 'px';

    massage = document.createElement('div');
    massage.className = "massage";
    massage.innerText = "=Press SPACE to start="
    field.appendChild(massage);
    massage.style.display = "block"
}

function startGame() {
    if (document.querySelector('.massage')) {
        ballX = fieldW / 2;
        ballY = fieldH / 2
        speedX = -2;
        speedY = 2;
        document.querySelector('.massage').style.display = "none";
    }
    if (lifes == 0) {
        massage.innerText = "===GAME OVER===";
        massage.style.display = "block";
        speedX = 0;
        speedY = 0;

    }
    bricksArr = document.querySelectorAll('.brick');

    start = setInterval(moveBall, 10);
}

function moveBall() {
    ball.style.left = (ballX += speedX) + 'px';
    ball.style.top = (ballY += speedY) + 'px';

    if (ballX <= 0 || ballX >= fieldW - 20) speedX = -speedX;
    if (ballY <= 0) {
        speedY = -speedY
    } else if (ballY >= fieldH) {
        speedX = 0;
        speedY = 0;
        lifes -= 1
        massage.innerText = "You lost life. You have: " + lifes;
        massage.style.display = "block"
        clearInterval(start)
    }
    checkCollision();

}

function checkCollision() {
    if (ballY + 35 >= racket.getBoundingClientRect().top && ballX >= racketX - 10 && ballX <= racketX + 70) speedY = -speedY;

    for(let i = 0; i < bricksArr.length; i++){
        let brickY = parseFloat(window.getComputedStyle(bricksArr[i]).top);
        let brickX = parseFloat(window.getComputedStyle(bricksArr[i]).left);
        let brickW = parseFloat(window.getComputedStyle(bricksArr[i]).width);
        let brickH = parseFloat(window.getComputedStyle(bricksArr[i]).height);
        if(ballY < brickY + brickH){
            if(ballX > brickX -5 && ballX < brickX + brickW + 5){
                bricksArr[i].remove();
                speedY = -speedY;
            }
        }
        if(bricksArr.length == 0){
            massage.innerText = "==YOU ARE WIN=="
            massage.style.display = "block"
        }
    }
}

document.addEventListener('keydown', function (e) {
    switch (e.keyCode) {
        case LEFT:
            racket.style.left = (racketX -= 20) + 'px';
            break;
        case RIGHT:
            racket.style.left = (racketX += 20) + 'px';
            break;
        case SPACE:
            if(speedX == 0) startGame();
    }
    if (racketX <= 0) racket.style.left = 1 + 'px';
    if (racketX >= fieldW - 60) racket.style.left = 637 + 'px';
})

createGameArea();
var canvas = document.getElementById('playground');
var ctx = canvas.getContext('2d');

// draw a rect
function drawRect(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

// draw a playground 800*800
playgroundSize = [800, 800];

function drawPlayground(color) {
    drawRect(0, 0, playgroundSize[0], playgroundSize[1], color);
}

blockSize = 20;
blockMargin = 1;

// get info about quantity of block on playground
function blockNumberX() {
    return Math.trunc(canvasWidth / (blockSize + blockMargin));
}

function blockNumberY() {
    return Math.trunc(canvasHeight / (blockSize + blockMargin));
}

// return a coordinate to draw a rect of snake on X and Y axes
function getX(coordinateX) {
    canvasWidth = playgroundSize[0];
    if (coordinateX >= blockNumberX()) {
        coordinateX = 0;
    }
    if (coordinateX < 0) {
        coordinateX = blockNumberX();
    }
    marginX = (canvasWidth % (blockSize + blockMargin)) / 2;
    return (marginX + coordinateX * (blockSize + blockMargin));
}

function getY(coordinateY) {
    canvasHeight = playgroundSize[1];
    if (coordinateY >= blockNumberY()) {
        coordinateY = 0;
    }
    if (coordinateY < 0) {
        coordinateY = blockNumberY;
    }
    marginY = (canvasHeight % (blockSize + blockMargin)) / 2;
    return (marginY + coordinateY * (blockSize + blockMargin));
}

snake = [
    [3, 4],
    [4, 4],
    [5, 4]
]; // snake's initial size

// draw a snake
function drawSnake(snake, color) {
    for (let i = 0; i < snake.length; i++) {
        drawRect(getX(snake[i][0]), getY(snake[i][1]), blockSize, blockSize, color);
    }
}

apple = [15, 10]; // first apple's coordinates

// draw apple
function drawApple(apple, color) {
    drawRect(getX(apple[0]), getY(apple[1]), blockSize, blockSize, color);
}
// initial directions of moving snake
goUp = false;
goDown = false;
goLeft = false;
goRight = false;
// add event handler
window.addEventListener('keydown', function(event) {
        switch (event.code) {
            case 'ArrowUp':
                goUp = true;
                goDown = false;
                goLeft = false;
                goRight = false;
                break;
            case 'ArrowDown':
                goUp = false;
                goDown = true;
                goLeft = false;
                goRight = false;
                break;
            case 'ArrowLeft':
                goUp = false;
                goDown = false;
                goLeft = true;
                goRight = false;
                break;
            case 'ArrowRight':
                goUp = false;
                goDown = false;
                goLeft = false;
                goRight = true;
                break;
        }
    })
    // move snake
function movingSnake(snake) {
    if (goUp == true) {
        newY = snake[0][1] - 1;
        if (newY < 0) {
            newY = blockNumberY();
        }
        if (newY > blockNumberY()) {
            newY = 0;
        }
        snake.unshift([snake[0][0], newY]);
        snake.pop();
    }
    if (goDown == true) {
        newY = snake[0][1] + 1;
        if (newY < 0) {
            newY = blockNumberY();
        }
        if (newY > blockNumberY()) {
            newY = 0;
        }
        snake.unshift([snake[0][0], newY]);
        snake.pop();
    }
    if (goLeft == true) {
        newX = snake[0][0] - 1;
        if (newX < 0) {
            newX = blockNumberX();
        }
        if (newX > blockNumberX()) {
            newX = 0;
        }
        snake.unshift([newX, snake[0][1]]);
        snake.pop();
    }
    if (goRight == true) {
        newX = snake[0][0] + 1;
        if (newX < 0) {
            newX = blockNumberX();
        }
        if (newX > blockNumberX()) {
            newX = 0;
        }
        snake.unshift([newX, snake[0][1]]);
        snake.pop();
    }
}
// check for eaten apple. return true/false
function isEaten(item) {
    if (snake[0][0] == item[0] && snake[0][1] == item[1]) {
        return true;
    }
}
// increase snake's length
function increaseSnake() {
    if (isEaten(apple)) {
        snake.push([apple[0], apple[1]]);
    }
}
// get new coordinates for new apple after eaten one
function nextApple() {
    if (isEaten(apple)) {
        apple[0] = Math.floor(Math.random() * blockNumberX());
        apple[1] = Math.floor(Math.random() * blockNumberY());
    }
}
//test

setInterval(function() {
    drawPlayground('black');
    drawSnake(snake, 'cyan');
    drawApple(apple, 'lightgreen');
    increaseSnake();
    nextApple();
    movingSnake(snake);
}, 150);
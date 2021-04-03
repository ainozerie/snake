var canvas = document.getElementById('playground');
var ctx = canvas.getContext('2d');

// draw a rect
function drawRect(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

// draw a playground 800*800
function drawPlayground(color) {
    drawRect(0, 0, 800, 800, color);
}

blockSize = 50;
blockMargin = 1;

// separate playground on fields and return a coordinate to draw a rect of snake on X axe
function getX(coordinateX) {
    canvasWidth = 800;
    blockNumberX = Math.trunc(canvasWidth / (blockSize + blockMargin));
    if (coordinateX >= blockNumberX) {
        coordinateX = 0;
    }
    marginX = (canvasWidth % (blockSize + blockMargin)) / 2;
    return (marginX + coordinateX * (blockSize + blockMargin));
}
// separate playground on fields and return a coordinate to draw a rect of snake on X axe
function getY(coordinateY) {
    canvasHeight = 800;
    blockNumberY = Math.trunc(canvasHeight / (blockSize + blockMargin));
    if (coordinateY >= blockNumberY) {
        coordinateY = 0;
    }
    marginY = (canvasHeight % (blockSize + blockMargin)) / 2;
    return (marginY + coordinateY * (blockSize + blockMargin));
}

drawPlayground('black');
drawRect(getX(3), getY(2), blockSize, blockSize, 'cyan');
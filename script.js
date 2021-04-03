var canvas = document.getElementById('playground');
var ctx = canvas.getContext('2d');

function drawRect(x, y, width, height, color) { // draw a rect
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function drawPlayground(color) { // draw a playground 800*800
    drawRect(0, 0, 800, 800, color);
}
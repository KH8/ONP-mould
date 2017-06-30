var nw = require('nw.gui');
var win = nw.Window.get();

var mathjs = require('mathjs');

var random = require('./random.js');
var Pixel = require('./pixel.js');

var factor = 1;

var canvas = document.getElementById('mainCanvas');
canvas.width = win.width;
canvas.height = win.height;

var canvasLeft = canvas.offsetLeft;
var canvasTop = canvas.offsetTop;

var ctx = canvas.getContext("2d");

var pixels = function() {
    var matrix = [];
    for (var x = 0; x < win.width / factor - 1; x++) {
        matrix[x] = [];
        for (var y = 0; y < win.height / factor - 1; y++) {
            matrix[x][y] = new Pixel();
        }
    }
    return matrix;
}();

canvas.addEventListener('click', function(event) {
    var x = event.pageX - canvasLeft;
    var y = event.pageY - canvasTop;

    pixels[Math.ceil(x / factor)][Math.ceil(y / factor)].setInfected();

    console.log(x + "," + y);

}, false);

setInterval(function() {
    propagate();
}, 10);

function propagate() {
    var infected = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var x = 1; x < win.width / factor - 2; x++) {
        for (var y = 1; y < win.height / factor - 2; y++) {
            var p = pixels[x][y];
            if (p.isInfected()) {
                p.rgb.increment();

                ctx.fillStyle = p.rgb.toHex();
                ctx.fillRect(x * factor, y * factor, factor, factor);

                var xCoord = Math.max(Math.min(x + getRandomFactor(), win.width - 1), 0);
                var yCoord = Math.max(Math.min(y + getRandomFactor(), win.height - 1), 0);

                if (!pixels[xCoord][yCoord].isInfected()) {
                    infected.push(pixels[xCoord][yCoord]);
                }
            }
        }
    }
    infected.forEach(function(p) {
        p.setInfected();
    });
}

function getRandomFactor() {
    var a = Math.ceil(random() * 3);
    var b = Math.ceil(random() * 3);
    return mathjs.compare(a, b);
}
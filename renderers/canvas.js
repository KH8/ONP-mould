const electron = require('electron');
var screenElectron = electron.screen;
var mainScreen = screenElectron.getPrimaryDisplay();

var canvas = document.getElementById('canvas');
canvas.width = mainScreen.size.width;
canvas.height = mainScreen.size.height;

var canvasLeft = canvas.offsetLeft;
var canvasTop = canvas.offsetTop;

var ctx = canvas.getContext("2d");
var image = ctx.getImageData(0, 0, canvas.width, canvas.height);

const Strategy = require('./strategies/mould');
const Service = require('./services/runner');

var service = new Service(new Strategy());

initInterval();
initOnClickEvent();

function initInterval() {
    setInterval(function() {
        service.recalculate(image);
        ctx.putImageData(image, 0, 0);
    }, 100);
}

function initOnClickEvent() {
    canvas.addEventListener('click', function(event) {
        var x = event.pageX - canvasLeft;
        var y = event.pageY - canvasTop;
        service.setAsInfected(image.data, resolveDataIndex(x, y));
    }, false);
}

var blockSize = 4;

function resolveDataIndex(x, y) {
    return y * image.width * blockSize + x * blockSize;
}
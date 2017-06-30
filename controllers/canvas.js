var nw = require('nw.gui');
var win = nw.Window.get();

var canvas = document.getElementById('canvas');
canvas.width = win.width;
canvas.height = win.height;

var ctx = canvas.getContext("2d");
var image = ctx.getImageData(0, 0, canvas.width, canvas.height);

var service = require('./services/mould');

setInterval(function() {
    service.recalculate(image);
    ctx.putImageData(image, 0, 0);
}, 10);
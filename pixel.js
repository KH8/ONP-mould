var RgbColor = require('./rgbColor.js');

function Pixel() {
    this.rgb = new RgbColor();
    this.infected = false;
}

Pixel.prototype.isInfected = function() {
    return this.infected;
};

Pixel.prototype.setInfected = function() {
    this.infected = true;
};

module.exports = Pixel;
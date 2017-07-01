var Rgb = require('./../services/rgb');

function LichenStrategy() {}

LichenStrategy.prototype.resolveNextColour = function(p) {
    if (p.r < 255) {
        p.r = p.g = p.b += 1;
    }
    return p;
};

LichenStrategy.prototype.isInfected = function(p) {
    return p.r !== 0 && p.r < 255;
};

LichenStrategy.prototype.getInfected = function() {
    var p = new Rgb();
    p.r = p.g = p.b = 50;
    return p;
};

module.exports = LichenStrategy;
var Rgb = require('./../services/rgb');

function BurnStrategy() {}

BurnStrategy.prototype.resolveNextColour = function(p) {
    if (p.r > 1) {
        p.r--;
        if (p.r === 248) p.r = 60;
    } else {
        p.r = 1;
    }
    return p;
};

BurnStrategy.prototype.isInfected = function(p) {
    return p.r !== 0;
};

BurnStrategy.prototype.getInfected = function() {
    var p = new Rgb();
    p.r = 255;
    p.g = p.b = 0;
    return p;
};

module.exports = BurnStrategy;
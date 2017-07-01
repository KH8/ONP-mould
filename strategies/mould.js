var Rgb = require('./../services/rgb');

function MouldStrategy() {}

MouldStrategy.prototype.resolveNextColour = function(p) {
    if (p.r > 1) {
        p.r = p.g = p.b -= 1;
    }
    return p;
};

MouldStrategy.prototype.isInfected = function(p) {
    return p.r !== 0;
};

MouldStrategy.prototype.getInfected = function() {
    var p = new Rgb();
    p.r = p.g = p.b = 255;
    return p;
};

module.exports = MouldStrategy;
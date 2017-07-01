var maxColorValue = 255;

function resolveNextColour(p) {
    if (p.r > 1) {
        p.r -= 1;
        p.g -= 1;
        p.b -= 1;
    }
    return p;
}

module.exports = {
    resolveNextColour: resolveNextColour
};
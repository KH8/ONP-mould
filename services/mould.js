var blockSize = 4;

function recalculate(image) {
    var data = image.data;
    var infected = [];
    for (var i = 0; i < data.length - 1; i += blockSize) {
        var r = data[i];
        if (r > 0) {
            data[i] = resolveNextColour(r);
            data[i + 3] = 255;
            infected.push(i + getRandomFactor() * image.width * blockSize + getRandomFactor() * blockSize);
            infected.push(i + getRandomFactor() * blockSize);
        }
    }
    infected.forEach(function(i) {
        var r = data[i];
        if (r === 0) {
            data[i] = 1;
        }
    });
}

function resolveNextColour(p) {
    p++;
    if (p > 255) p = 1;
    return p;
}

function getRandomFactor() {
    return Math.floor(Math.random() * 3) - 1;
}

module.exports = {
    recalculate: recalculate
};
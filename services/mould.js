var rgb = require('./rgb');

var blockSize = 4;

function recalculate(image) {
    var data = image.data;
    var infected = [];
    for (var i = 0; i < data.length - 1; i += blockSize) {
        if (isInfected(data, i)) {
            var color = getNextColour(data, i);
            data[i] = color.r;
            data[i + 1] = color.g;
            data[i + 2] = color.b;
            data[i + 3] = 255;
            infected.push(getRandomNeighbourIndex(image.width, i));
        }
    }
    infected.forEach(function(i) {
        if (!isInfected(data, i)) {
            setAsInfected(data, i);
        }
    });
}

function getNextColour(data, i) {
    return rgb.resolveNextColour({
        r: data[i],
        g: data[i + 1],
        b: data[i + 2]
    });
}

function getRandomNeighbourIndex(imageWidth, i) {
    return getRandomFactor() > 0 ?
        i + getRandomFactor() * imageWidth * blockSize + getRandomFactor() * blockSize :
        i + getRandomFactor() * blockSize;
}

function getRandomFactor() {
    return Math.floor(Math.random() * 3) - 1;
}

function isInfected(data, i) {
    return data[i] !== 0;
}

function setAsInfected(data, i) {
    data[i] = 255;
    data[i + 1] = 255;
    data[i + 2] = 255;
    data[i + 3] = 255;
}

module.exports = {
    recalculate: recalculate,
    setAsInfected: setAsInfected
};
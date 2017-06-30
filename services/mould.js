var blockSize = 4;

function recalculate(image) {
    var data = image.data;
    for (var i = 0; i < data.length - 1; i += blockSize) {
        data[i] += 1;
    }
    image.data = data;
}

function resolveNextColour(p) {
    p.r += 1;
}

module.exports.recalculate = recalculate;
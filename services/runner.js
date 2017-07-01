var Rgb = require('./rgb');

function RunnerService(strategy) {
    var blockSize = 4;

    this.strategy = strategy;
    this.infected = [];

    this.recalculate = function(image) {
        var data = image.data;

        clearInfected();

        for (var i = 0; i < data.length - 1; i += blockSize) {
            if (isInfected(data, i)) {
                var color = getNextColour(data, i);
                applyColor(color, data, i);
                infectRandomNeighbour(image, i);
            }
        }

        initInfected(data);
    };

    this.setAsInfected = function(data, i) {
        var color = this.strategy.getInfected();
        applyColor(color, data, i);
    };

    var self = this;

    function isInfected(data, i) {
        return self.strategy.isInfected(new Rgb(data, i));
    }

    function getNextColour(data, i) {
        return self.strategy.resolveNextColour(new Rgb(data, i));
    }

    function infectRandomNeighbour(image, i) {
        self.infected.push(getRandomNeighbourIndex(image, i));
    }

    function getRandomNeighbourIndex(image, i) {
        return getRandomFactor() > 0 ?
            i + getRandomFactor() * image.width * blockSize + getRandomFactor() * blockSize :
            i + getRandomFactor() * blockSize;
    }

    function getRandomFactor() {
        return Math.floor(Math.random() * 3) - 1;
    }

    function initInfected(data) {
        self.infected.forEach(function(i) {
            if (!isInfected(data, i)) {
                self.setAsInfected(data, i);
            }
        });
    }

    function clearInfected() {
        self.infected = [];
    }

    function applyColor(color, data, i) {
        data[i] = color.r;
        data[i + 1] = color.g;
        data[i + 2] = color.b;
        data[i + 3] = 255;
    }
}

RunnerService.prototype.recalculate = function(image) {
    this.recalculate(image);
};

RunnerService.prototype.setAsInfected = function(data, i) {
    this.setAsInfected(data, i);
};

module.exports = RunnerService;
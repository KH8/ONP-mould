function RgbColor() {
    this.r = 255;
    this.g = 0;
    this.b = 0;
    this.phase = 0;
    this.i = 5;
}

RgbColor.prototype.increment = function() {
    if (this.phase === 0) {
        this.g += this.i;
        this.r = 255 - this.g;
        if (this.g >= 255) this.phase = 1;
    } else if (this.phase === 1) {
        this.b += this.i;
        this.g = 255 - this.b;
        if (this.b >= 255) this.phase = 2;
    } else if (this.phase === 2) {
        this.r += this.i;
        this.b = 255 - this.r;
        if (this.r >= 255) this.phase = 0;
    }
};

RgbColor.prototype.toHex = function() {
    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }
    return "#" + componentToHex(this.r) + componentToHex(this.g) + componentToHex(this.b);
};

module.exports = RgbColor;
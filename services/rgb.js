function Rgb(data, i) {
    this.r = data ? data[i] : 0;
    this.g = data ? data[i + 1] : 0;
    this.b = data ? data[i + 2] : 0;
}

module.exports = Rgb;
export class Color {
    constructor (r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
    addRGB (r,g,b) {
        this.r += r;
        this.g += g;
        this.b += b;
    }
    addColor (color) {
        this.r += color.r;
        this.g += color.g;
        this.b += color.b;
    }
    get getRGB () {
        return `rgb(${Math.floor(this.r)},${Math.floor(this.g)},${Math.floor(this.b)})`;
    }
}
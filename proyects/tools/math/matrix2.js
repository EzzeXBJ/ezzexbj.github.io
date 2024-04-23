export default class Matrix2 {
    static scalation (scale) {
        return new Matrix2(scale,0,0,scale)
    }
    static rotation (angle) {
        return new Matrix2(
            Math.cos(angle),
            -Math.sin(angle),
            Math.sin(angle),
            Math.cos(angle));
    }
    constructor (ax,ay,bx,by) {
        this.elements = [
            ax,ay,
            bx,by
        ];
    }
    get ax () { return this.elements[0] }
    get ay () { return this.elements[1] }
    get bx () { return this.elements[2] }
    get by () { return this.elements[3] }

    *[ Symbol.iterator ] () {
        yield this.ax;
        yield this.ay;
        yield this.bx;
        yield this.by;
    }
}
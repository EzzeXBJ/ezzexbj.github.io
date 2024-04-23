export default class Matrix3 {
    static scalation (scale) {
        return new Matrix3(
            scale,0,0,
            0, scale, 0,
            0, 0, 1
        );
    }
    static translation (x,y) {
        return new Matrix3(
            1,0,x,
            0,1,y,
            0,0,1
        );
    }
    static rotationX (angle) {
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        return new Matrix3(
            1, 0, 0,
            0, c, -s,
            0, s, c
        );
    }
    static rotationY (angle) {
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        return new Matrix3(
            c, 0, s,
            0, 1, 0,
            -s, 0, c
        );
    }
    static rotationZ (angle) {
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        return new Matrix3(
            c, -s, 0,
            s, c, 0,
            0, 0, 1
        );
    }
    constructor (ax,ay,az,bx,by,bz,cx,cy,cz) {
        this.elements = [
            ax,ay,az,
            bx,by,bz,
            cx,cy,cz
        ];
    }
    get ax () { return this.elements[0] }
    get ay () { return this.elements[1] }
    get az () { return this.elements[2] }
    get bx () { return this.elements[3] }
    get by () { return this.elements[4] }
    get bz () { return this.elements[5] }
    get cx () { return this.elements[6] }
    get cy () { return this.elements[7] }
    get cz () { return this.elements[8] }

    *[ Symbol.iterator ] () {
        yield this.ax;
        yield this.ay;
        yield this.az;
        yield this.bx;
        yield this.by;
        yield this.bz;
        yield this.cx;
        yield this.cy;
        yield this.cz;
    }
}
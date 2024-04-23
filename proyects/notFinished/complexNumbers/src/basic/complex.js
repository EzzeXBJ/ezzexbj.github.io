export default class Complex {
    static get j () { return new Complex(0,1); }
    static polarTo (mod, arg) {
        const re = mod * Math.cos(arg);
        const im = mod * Math.sin(arg);
        return new Complex(re,im);
    }
    static toPolar (c) {
        return {
            mod: c.getMod,
            arg: c.getArg
        }
    }
    constructor (re, im) {
        this.re = re;
        this.im = im;
    }
    get getMod () {
        return Math.sqrt(this.re*this.re + this.im*this.im);
    }
    get getArg () {
        return Math.atan2(this.im,this.re);
    }
    conjugate () {
        return new Complex(this.re, -this.im);
    }
    reciprocal () {
        return Complex.polarTo(1/this.getMod,-this.getArg);
    }
    reverse () {
        return new Complex(this.im, this.re);
    }
    negative () {
        return new Complex(-this.re,-this.im);
    }

    addR (n) {
        return new Complex(this.re + n, this.im);
    }
    addI (n) {
        return new Complex(this.re, this.im + n);
    }
    addC (c) {
        return new Complex(this.re+c.re,this.im+c.im);
    }
    subR (n) {
        return this.addR(-n);
    }
    subI (n) {
        return this.addI(-n);
    }
    subC (c) {
        return this.addC(c.negative);
    }
    mulR (n) {
        return new Complex(this.re*n,this.im*n);
    }
    mulR2 (n) {
        return Complex.polarTo(this.getMod * n, this.getArg);
    }
    mulI (n) {
        return new Complex(-this.im*n,this.re*n);
    }
    mulC (c) {
        const re = this.re*c.re -(this.im*c.re);
        const im = this.re*c.im + this.im*c.re;
        return new Complex(re,im);
    }
    divR (n) {
        return this.mulR(1/n);
    }
    divI (n) {
        return this.mulI(-1/n);
    }
    divC (c) {

    }
}
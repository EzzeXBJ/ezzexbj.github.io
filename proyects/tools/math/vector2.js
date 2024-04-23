import Matrix2 from "./matrix2.js";
import Matrix3 from "./matrix3.js";
import Utils from "./utils.js";

export default class Vector2 {
    static get zero () {
        return new Vector2()
    }
    static get one () {
        return (new Vector2()).fillOf(1);
    }
    static get up () {
        return new Vector2(0,1);
    }
    static get down () {
        return new Vector2(0,-1);
    }
    static get right () {
        return new Vector2(1,0);
    }
    static get left () {
        return new Vector2(-1,0);
    }
    constructor (x=0,y=0) {
        this.set(x,y);
    }
    get components () { return {
        x: this._x,
        y: this._y
    } }
    getComponent (index) {
        switch (index) {
            case 0: return this._x;
            case 1: return this._y;
        }
    }
    get x () { return this._x }
    get width () { return this.x }
    get y () { return this._y }
    get height () { return this.y }

    set (x=this._x,y=this._y) {
        this._x = x;
        this._y = y;
        return this;
    }
    setComponent (index, value) {
        switch (index) {
            case 0: this._x = value; break;
            case 1: this._y = value; break;
            default: throw new Error("Index is out of range:" + index);
        }
        return this;
    } 
    set x (x) {
        this._x = x;
        return this;
    }
    set width (w) {
        this._x = w;
        return this;
    } 
    set y (y) {
        this._y = y;
        return this;
    }
    set height (h) {
        this._y = h;
        return this;
    }

    addX (x) {
        this._x += x;
        return this;
    }
    addY (y) {
        this._y += y;
        return this;
    }
    addScalar (s) {
        this._x += s;
        this._y += s;
        return this;
    }
    add (v) {
        this._x += v._x;
        this._y += v._y;
        return this;
    }
    addVectors (v1,v2) {
        this._x = v1._x + v2._x;
        this._y = v1._y + v2._y;
        return this;
    }
    addScaledVector (v, s) {
        this._x += v._x * s;
        this._y += v._y * s;
        return this;
    }

    subX (x) {
        this._x -= x;
        return this;
    }
    subY (y) {
        this._y -= y;
        return this;
    }
    subScalar (s) {
        this._x -= s;
        this._y -= s;
        return this;
    }
    sub (v) {
        this._x -= v._x;
        this._y -= v._y;
        return this;
    }
    subVectors (v1,v2) {
        this._x = v1._x - v2._x;
        this._y = v1._y - v2._y;
        return this;
    }
    subScaledVector (v, s) {
        this._x -= v._x * s;
        this._y -= v._y * s;
        return this;
    }

    mulX (x) {
        this._x *= x;
        return this;
    }
    mulY (y) {
        this._y *= y;
        return this;
    }
    mulScalar (s) {
        this._x *= s;
        this._y *= s;
        return this;
    }
    mul (v) {
        this._x *= v._x;
        this._y *= v._y;
        return this;
    }
    mulVectors (v1,v2) {
        this._x = v1._x * v2._x;
        this._y = v1._y * v2._y;
        return this;
    }
    mulScaledVector (v, s) {
        this._x *= v._x * s;
        this._y *= v._y * s;
        return this;
    }

    divX (x) {
        this._x /= x;
        return this;
    }
    divY (y) {
        this._y /= y;
        return this;
    }
    divScalar (s) {
        this._x /= s;
        this._y /= s;
        return this;
    }
    div (v) {
        this._x /= v._x;
        this._y /= v._y;
        return this;
    }
    divVectors (v1,v2) {
        this._x = v1._x / v2._x;
        this._y = v1._y / v2._y;
        return this;
    }
    divScaledVector (v, s) {
        this._x /= v._x * s;
        this._y /= v._y * s;
        return this;
    }
    applyLinearTransformation (m) {
        const x = this._x;
        const y = this._y;
        const e = m.elements;

        this._x = e[0]*x + e[1]*y;
        this._y = e[2]*x + e[3]*y;
        return this;
    }
    applyNoLinearTransformation (m) {
        const x = this._x, y = this._y;
        const e = m.elements;

        this._x = e[0]*x + e[1]*y + e[2];
        this._y = e[3]*x + e[4]*y + e[5];
        // this._x = e[0]*x + e[3]*y + e[6];
        // this._y = e[1]*x + e[4]*y + e[7];
        return this;
    }
    toScaleMatrix2 (scale) {
        this.applyLinearTransformation(Matrix2.scalation(scale));
        return this;
    }
    toRotateMatrix2 (angle) {
        this.applyLinearTransformation(Matrix2.rotation(angle));
        return this;
    }
    toScaleMatrix3 (scale) {
        this.applyNoLinearTransformation(Matrix3.scalation(scale));
        return this;
    }
    toTranslateMatrix3 (x,y) {
        this.applyNoLinearTransformation(Matrix3.translation(x,y));
        return this;
    }
    toRotateXMatrix3 (angle) {
        this.applyNoLinearTransformation(Matrix3.rotationX(angle));
        return this;
    }
    toRotateYMatrix3 (angle) {
        this.applyNoLinearTransformation(Matrix3.rotationY(angle));
        return this;
    }
    toRotateZMatrix3 (angle) {
        this.applyNoLinearTransformation(Matrix3.rotationZ(angle));
        return this;
    }

    negate () {
        return new Vector2(-this._x, -this._y);
    }
    dot (v) {
        return this._x*v._x + this._y*v._y;
    }
    cross (v) {
        return this._x*v._y - this._y*v._x;
    }
    get magnitudeSq () {
        return this._x*this._x + this._y*this._y;
    }
    get magnitude () {
        return Math.sqrt(this._x*this._x + this._y*this._y);
    }
    normalize (s=1) {
        this.divScalar(this.magnitude).mulScalar(s);
        return this;
    }
    get angle () {
        return Math.atan2(-this._y,-this._x)+Math.PI;
    }
    angleTo (v) {
        const denominator = Math.sqrt(this.magnitudeSq * v.magnitudeSq);
        if (denominator === 0) return Math.PI/2;
        const theta = this.dot(v)/denominator;
        return Math.acos(Utils.clamp(theta, -1,1));
    }
    distanceSq (v) {
        const dx = this._x - v._x;
        const dy = this._y - v._y;
        return dx*dx + dy*dy;
    }
    distance (v) {
        return Math.sqrt(this.distanceSq(v));
    }
    setMagnitude (magnitude) {
        this.normalize(magnitude);
        return this;
    }
    lerp (v, alpha) {
        return new Vector2(Utils.lerp(this._x,v._x,alpha), Utils.lerp(this._y,v._y,alpha));
    }
    lerpVectors (v1,v2,alpha) {
        this._x = v1._x + (v2._x - v1._x) * alpha;
        this._y = v1._y + (v2._y - v1._y) * alpha;
        return this;
    }
    rotateAround (center, angle) {
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        const x = this._x - center._x;
        const y = this._y - center._y;
        this._x = x*c - y*s + center._x;
        this._y = x*s + y*c + center._y;
        return this;
    }

    copy (v) {
        this.set(v._x,v._y);
        return this;
    }
    clone () {
        return new Vector2(this._x,this._y);
    }
    fill (n) {
        this._x = n;
        this._y = n;
        return this;
    }

    equals (v) {
        return ((v._x===this._x)&&(v._y===this._y));
    }
    fromArray (array, offset=0) {
        this._x = array[offset];
        this._y = array[offset+1];
        return this;
    }
    toArray (array=[],offset) {
        array[offset] = this._x;
        array[offset+1] = this._y;
        return array;
    }

    min (v) {
        this._x = Math.min(this._x,v._x);
        this._y = Math.min(this._y,v._y);
        return this;
    }
    max (v) {
        this._x = Math.max(this._x,v._x);
        this._y = Math.max(this._y,v._y);
        return this;
    }
    clamp (vmin,vmax) {
        this._x = Math.max(vmin._x,Math.min(this._x,vmax._x));
        this._y = Math.max(vmin._y,Math.min(this._y,vmax._y));
        return this;
    }
    clampScalar (min,max) {
        this._x = Math.max(min,Math.min(this._x,max));
        this._y = Math.max(min,Math.min(this._y,max));
        return this;
    }
    clampMagnitude (min,max) {
        this.divScalar(this.magnitude || 1).mulScalar(Math.max(min,Math.min(this.magnitude,max)));
        return this;
    }
    floor () {
        this._x = Math.floor(this._x);
        this._y = Math.floor(this._y);
        return this;
    }
    ceil () {
        this._x = Math.ceil(this._x);
        this._y = Math.ceil(this._y);
        return this;
    }
    round () {
        this._x = Math.round(this._x);
        this._y = Math.round(this._y);
        return this;
    }
    roundToZero () {
        this._x = Math.trunc(this._x);
        this._y = Math.trunc(this._y);
        return this;
    }
    randomizeFloat (min=0,max=1) {
        this._x = Utils.randomFloat(min,max);
        this._y = Utils.randomFloat(min,max);
        return this;
    }
    randomizeInt (min=0,max=1) {
        this._x = Utils.randomInt(min,max);
        this._y = Utils.randomInt(min,max);
        return this;
    }
    *[ Symbol.iterator ] () {
        yield this._x;
        yield this._y;
    }
}
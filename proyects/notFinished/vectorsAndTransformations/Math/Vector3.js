export default class Vector3 {
    static get zero () {
        return new Vector3()
    }
    static get one () {
        return (new Vector3()).fillOf(1);
    }
    constructor (x=0,y=0,z=0) {
        this.set(x,y,z);
    }
    get components () { return {
        x: this._x,
        y: this._y,
        z: this._z
    } }
    getComponent (index) {
        switch (index) {
            case 0: return this._x;
            case 1: return this._y;
            case 2: return this._z;
        }
    }
    get x () { return this._x }
    get width () { return this.x }
    get y () { return this._y }
    get height () { return this.y }
    get z () { return this._z }
    get depth () { return this.z }

    set (x=this._x,y=this._y,z=this._z) {
        this._x = x;
        this._y = y;
        this._z = z;
    }
    setComponent (index, value) {
        switch (index) {
            case 0: this._x = value; break;
            case 1: this._y = value; break;
            case 2: this._z = value; break;
            default: throw new Error("Index is out of range:" + index);
        }
    } 
    set x (x) { this._x = x }
    set width (w) { this._x = w } 
    set y (y) { this._y = y }
    set height (h) { this._y = h }
    set z (z) { this._z = z }
    set depth (d) { this._z = d }

    addX (x) { this._x += x; }
    addY (y) { this._y += y; }
    addZ (z) { this._z += z; }
    addScalar (s) {
        this._x += s;
        this._y += s;
        this._z += s;
    }
    add (v) {
        this._x += v._x;
        this._y += v._y;
        this._z += v._z;
    }
    addVectors (v1,v2) {
        this._x = v1._x + v2._x;
        this._y = v1._y + v2._y;
        this._z = v1._z + v2._z;
    }
    addScaledVector (v, s) {
        this._x += v._x * s;
        this._y += v._y * s;
        this._z += v._z * s;
    }

    subX (x) { this._x -= x; }
    subY (y) { this._y -= y; }
    subZ (z) { this._z -= z; }
    subScalar (s) {
        this._x -= s;
        this._y -= s;
        this._z -= s;
    }
    sub (v) {
        this._x -= v._x;
        this._y -= v._y;
        this._z -= v._z;
    }
    subVectors (v1,v2) {
        this._x = v1._x - v2._x;
        this._y = v1._y - v2._y;
        this._z = v1._z - v2._z;
    }
    subScaledVector (v, s) {
        this._x -= v._x * s;
        this._y -= v._y * s;
        this._z -= v._z * s;
    }

    mulX (x) { this._x *= x; }
    mulY (y) { this._y *= y; }
    mulZ (z) { this._z *= z; }
    mulScalar (s) {
        this._x *= s;
        this._y *= s;
        this._z *= s;
    }
    mul (v) {
        this._x *= v._x;
        this._y *= v._y;
        this._z *= v._z;
    }
    mulVectors (v1,v2) {
        this._x = v1._x * v2._x;
        this._y = v1._y * v2._y;
        this._z = v1._z * v2._z;
    }
    mulScaledVector (v, s) {
        this._x *= v._x * s;
        this._y *= v._y * s;
        this._z *= v._z * s;
    }

    divX (x) { this._x /= x; }
    divY (y) { this._y /= y; }
    divZ (z) { this._z /= z; }
    divScalar (s) {
        this._x /= s;
        this._y /= s;
        this._z /= s;
    }
    div (v) {
        this._x /= v._x;
        this._y /= v._y;
        this._z /= v._z;
    }
    divVectors (v1,v2) {
        this._x = v1._x / v2._x;
        this._y = v1._y / v2._y;
        this._z = v1._z / v2._z;
    }
    divScaledVector (v, s) {
        this._x /= v._x * s;
        this._y /= v._y * s;
        this._z /= v._z * s;
    }

    copy (v) {
        this.set(v._x,v._y,v._z);
    }
    clone () {
        return new Vector3(this._x,this._y,this._z);
    }
    fill (n) {
        this._x = n;
        this._y = n;
        this._z = n;
    }
}
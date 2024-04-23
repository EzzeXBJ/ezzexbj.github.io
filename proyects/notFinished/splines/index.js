const lerp = (a,b,t) => { return (1-t)*a + t*b };

class Point {
    static lerp (a, b, t) {
        const x = lerp(a.x,b.x,t);
        const y = lerp(a.y,b.y,t);
        return new Point(x,y);
    }
    constructor (x = 0,y = 0) {
        this.x = x;
        this.y = y;
    }
    add (point) {
        return new Point(this.x+point.x,this.y+point.y);
    }
    addScalar (scalar) {
        return new Point(this.x+scalar,this.y+scalar);
    }
    sub (point) {
        return new Point(this.x-point.x,this.y-point.y);
    }
    subScalar (scalar) {
        return new Point(this.x-scalar,this.y-scalar);
    }
    mul (point) {
        return new Point(this.x*point.x,this.y*point.y);
    }
    mulScalar (scalar) {
        return new Point(this.x*scalar,this.y*scalar);
    }
    div (point) {
        return new Point(this.x/point.x,this.y/point.y);
    }
    divScalar (scalar) {
        return new Point(this.x/scalar,this.y/scalar);
    }
    transform (matrix) {
        const x = this.x*matrix.getArrayPos(0) + this.y*matrix.getArrayPos(1);
        const y = this.x*matrix.getArrayPos(2) + this.y*matrix.getArrayPos(3);
        return new Point(x,y);
    }
    negate () {
        return new this.constructor(-this.x,-this.y);
    }

    set (point) {
        this.x = point.x;
        this.y = point.y;
    }
    setScalar (scalar) {
        this.x = scalar;
        this.y = scalar;
    }
    setComponent (index, value) {
        switch (index) {
            case 0:
                this.x = value;
                break;
            case 1:
                this.y = value;
                break;
            default: throw new Error("Indice fuera de rango: " + index);
        }
    }
    getComponent (index) {
        switch (index) {
            case 0: return this.x;
            case 1: return this.y;
            default: throw new Error("Indice fuera de rango: " + index);
        }
    }
    clone () {
        return new this.constructor(this.x,this.y);
    }
    copy (point) {
        this.set(point);
    }
    floor () {
        return new this.constructor(Math.floor(this.x),Math.floor(this.y));
    }
}
class Vector {
    static lerp (a,b,t) {
        const point = Point.lerp(a.get,b.get,t);
        const origin = Point.lerp(a.getOrigin,b.getOrigin,t);
        return new Vector(point,origin);
    }
    constructor (point = new Point(), origin = new Point()) {
        this.set = point;
        this.setOrigin = origin;
    }
    get get () { return this.point }
    get getOrigin () { return this.origin }
    get getX () { return this.point.x; }
    get getY () { return this.point.y; }
    get getOriginX () { return this.origin.x }
    get getOriginY () { return this.origin.y }
    get getSize () { return this.getOrigin.add(this.get); }
    get getWidth () { return this.getSize.x }
    get getHeight () { return this.getSize.y }

    set set (point) { this.point = point }
    set setOrigin (origin) { this.origin = origin }
    set setX (x) { this.point.x = x }
    set setY (y) { this.point.y = y }
    set setOriginX (x) { this.origin.x = x }
    set setOriginY (y) { this.origin.y = y }

    get getMod () { return Math.sqrt(this.getX**2 + this.getY**2) }
    get getArg () { return Math.atan2(this.getY,this.getX) }

    setScalar (scalar) { this.point.setScalar(scalar) }
    transform (matrix) {
        const x = this.getX*matrix.getArrayPos(0) + this.getY*matrix.getArrayPos(1);
        const y = this.getX*matrix.getArrayPos(2) + this.getY*matrix.getArrayPos(3);
        const point = new Point(x,y);
        return new Vector(point, this.getOrigin);
    }
    rotate (radian) {
        this.setX = this.getMod * Math.cos(this.getArg + radian);
        this.setY = this.getMod * Math.sin(this.getArg + radian);
    }
    normalize (n=1) {
        this.set = this.get.divScalar(this.getMod).mulScalar(n);
    }
}
class Matrix {
    static lerp (a,b,t) {
        const pointI = Point.lerp(a.getI,b.getI,t);
        const pointJ = Point.lerp(a.getJ,b.getJ,t);
        return new Matrix(pointI, pointJ);
    }
    constructor (pointI, pointJ, origin = new Point()) {
        this.i = pointI;
        this.j = pointJ;
        this.origin = origin;
    }
    get getI () { return this.i }
    get getJ () { return this.j }
    get getOrigin () { return this.origin }
    get getArray () { return [this.i.x, this.i.y, this.j.x, this.j.y] }
    getArrayPos (pos) { return this.getArray[pos] }
}
class Bezier4 {
    constructor (vectors) {
        this.vectors = vectors;
    }
}
class Bezier {

}

class Draw {
    constructor (canvas) {
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");
    }
    point (point, width = 4, color = "#000") {
        const halfWidth = width / 2;
        this.context.fillStyle = color;
        this.context.fillRect(point.x-halfWidth, point.y-halfWidth,width,width);
    }
    vector (vector, width = 1, color = "#000"){
        this.context.beginPath();
        this.context.lineWidth = width;
        this.context.strokeStyle = color;
        this.context.moveTo(vector.getOriginX, vector.getOriginY);
        this.context.lineTo(vector.getWidth, vector.getHeight);
        this.context.stroke();
        this.context.closePath();
    }
    matrix (matrix, width = 1, color = "#000") {
        const vectors = [
            new Vector(matrix.getI,matrix.getOrigin),
            new Vector(matrix.getJ,matrix.getOrigin),
            new Vector(matrix.getI, matrix.getJ),
            new Vector(matrix.getJ, matrix.getI)
        ];
        for (let i = 0; i < vectors.length; i++) {
            this.vector(vectors[i],width,color);
        }
    }
    clear () {
        this.context.clearRect(0,0,this.canvas.width,this.canvas.height)
    }
}
class Time {
    static second = 1000;
    static minute = 60 * Time.second;
    static hour = 60 * Time.minute;
    static day = 24 * Time.hour;

    constructor () {
        this.frames = 0;
        this.deltaTime = 0;
        this.frameRate = 1;
        this.time = 0;
        this.lastTime = 0;
    }
    start () {
        this.lastTime = Date.now();
    }
    update () {
        this.frames++;
        const curTime = Date.now();
        this.frameRate = 1/(curTime-this.lastTime);
        this.deltaTime = (curTime-this.lastTime)/1000;
        this.lastTime = curTime;
        this.time += this.deltaTime;
    }
}
const width = innerWidth;
const height = innerHeight;
const halfWidth = width/2;
const halfHeight = height/2;
const canvas = document.getElementById("canvas");
canvas.width = width;
canvas.height = height;
const draw = new Draw(canvas);
const clock = new Time();

const center = new Point(halfWidth,halfHeight);
const v1 = new Vector(new Point(100,0),center);
const v2 = new Vector(new Point(0,-100),center);

function loop () {
    //draw.clear()
    v2.rotate(0.01);
    v2.normalize(50);
    draw.point(center, 8);
    draw.vector(v1, 2, "#f00");
    draw.vector(v2, 2, "#00f");
    requestAnimationFrame(loop);
}
loop();
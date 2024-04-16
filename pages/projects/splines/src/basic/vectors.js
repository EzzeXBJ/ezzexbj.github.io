import MU from "./math.js";

export default class Vector {
    static get zero () { return new Vector(0,0) };
    static get one () { return new Vector(1,1) };
    static get up () { return new Vector(0,1) };
    static get right () { return new Vector(1,0) };
    static get down () { return new Vector(0,-1) };
    static get left () { return new Vector(-1,0) };

    constructor (x,y) {
        this.originX = 0;
        this.originY = 0;
        this.x = x;
        this.y = y;
    }

    get mod () { return MU.sqrt(this.modSQ) }
    get modSQ () { return (this.x*this.x) + (this.y*this.y) }
    get arg () { return MU.atan2(this.y,this.x) }

    set mod (newMod) {
        this.x = newMod * MU.cos(this.arg);
        this.y = newMod * MU.sin(this.arg);
    }
    set arg (newArg) {
        this.x = this.mod * MU.cos(newArg);
        this.y = this.mod * MU.sin(newArg);
    }
    set origin (newOrigin) {
        this.originX = newOrigin.x;
        this.originY = newOrigin.y;
    }

    copy () {
        return new Vector(this.x,this.y);
    }
    get normalize () {
        const vector = this.copy();
        vector.mod = 1;
        return vector;
    }
    sum (otherVector) {
        const x = this.x + otherVector.x;
        const y = this.y + otherVector.y;
        return new Vector(x,y);
    }
    sub (otherVector) {
        const x = this.x - otherVector.x;
        const y = this.y - otherVector.y;
        return new Vector(x,y);
    }
    vectorialDistance(otherVector) {
        if (this.mod > otherVector.mod) return this.sub(otherVector);
        else if (otherVector.mod > this.mod) return otherVector.sub(this);
        else return Vector.zero;
    }
    vectorialDistance2 (otherVector) {
        const vector = otherVector.copy();
        vector.origin = this;
        return vector;
    }
    lerp (otherVector, lapse) {
        const x = MU.lerp(this.x,otherVector.x,lapse);
        const y = MU.lerp(this.y,otherVector.y,lapse);
        return new Vector(x,y);
    }
}
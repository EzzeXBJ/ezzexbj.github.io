import Time from "./time.js";

export default class Bezier3 {
    constructor (vector1,vector2,vector3) {
        this.vectors = [vector1, vector2, vector3];
        this.lapse = 0;
        this.duration = 1*Time.second;
        this.x = 0;
        this.y = 0;
    }
    update (increment) {
        const P1 = this.vectors[0].lerp(this.vectors[1],this.lapse/this.duration);
        const P2 = this.vectors[1].lerp(this.vectors[2],this.lapse/this.duration);
        const Pf = P1.lerp(P2,this.lapse/this.duration);
        this.x = Pf.x;
        this.y = Pf.y;
        this.lapse += increment;
    }
}
import Time from "./time.js";

export default class Bezier3 {
    constructor (vector1,vector2,vector3) {
        this.vectors = [vector1, vector2, vector3];
        this.lapse = 0;
        this.duration = 1*Time.second;
    }
    update (delta) {
        const P1 = vector1.lerp(vector2,this.lapse/this.duration);
        const P2 = vector2.lerp(vector3,this.lapse/this.duration);
        const Pf = P1.lerp(P2,this.lapse/this.duration)
        this.lapse += delta;
    }
}
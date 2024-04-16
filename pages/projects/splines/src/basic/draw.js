import Vector from "./vectors.js";

export default class Draw {
    constructor (canvas) {
        this._canvas = canvas;
        this._context = canvas._context;
    }
    line(vectorA, zoom = 1) {
        this._context.beginPath();

        const x1 = this._canvas.center.x + zoom*(vectorA.originX);
        const y1 = this._canvas.center.y + zoom*(vectorA.originY);
        this._context.moveTo(x1,y1);

        const x2 = this._canvas.center.x + zoom*(vectorA.originX + vectorA.x);
        const y2 = this._canvas.center.y + -zoom*(vectorA.originY + vectorA.y);
        this._context.lineTo(x2,y2);
        this._context.stroke();
        this._context.closePath();
    }
    point (vectorA, zoom) {
        this._context.fillRect(this._canvas.center.x + zoom*(vectorA.originX+vectorA.x),this._canvas.center.y + zoom*(vectorA.originY+vectorA.y),1,1)
    }
}
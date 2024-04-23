import Color from "./colors.js";

export default class Draw {
    #canvas;
    #context;
    constructor (canvas) {
        this.#canvas = canvas;
        this.#context = this.#canvas.context;
    }
    get fillColor () {
        return this.#context.fillStyle;
    }
    get strokeColor () {
        return this.#context.strokeColor;
    }
    get lineWidth () {
        return this.#context.lineWidth;
    }
    
    set fillColor (color=Color.colors.black) {
        this.#context.fillStyle = color;
    }
    set strokeColor (color=Color.colors.black) {
        this.#context.strokeStyle = color;
    }
    set lineWidth (width=1) {
        this.#context.lineWidth = width;
    }

    beginPath () {
        this.#context.beginPath();
    }
    closePath () {
        this.#context.closePath();
    }
    fillPath () {
        this.#context.fill();
    }
    strokePath () {
        this.#context.stroke();
    }

    moveTo (x,y) {
        this.#context.moveTo(x,y);
    }
    lineTo (x,y) {
        this.#context.lineTo(x,y);
    }
    lineFromTo (x1,y1,x2,y2) {
        this.#context.moveTo(x,y);
        this.#context.lineTo(x,y);
    }

    rect (x,y,w,h,color=Color.colors.black,type="fill",lineWidth=1) {
        switch (type) {
            case "fill":
                this.#context.fillStyle = color;
                this.#context.fillRect(x,y,w,h);
                break;
            case "stroke":
                this.#context.lineWidth = lineWidth;
                this.#context.strokeStyle = color;
                this.#context.strokeRect(x,y,w,h);
                break;
        }
        this.#context.fillRect(x,y,w,h);
    }
    clear () {
        this.#context.clearRect(0,0,this.#canvas.width,this.#canvas.height);
    }
    fill (color=Color.colors.black) {
        this.#context.fillStyle = color;
        this.#context.fillRect(0,0,this.#canvas.width,this.#canvas.height);
    }
}